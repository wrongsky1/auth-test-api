const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const NotFoundErr = require("../errors/NotFoundErr");
const ConflickErr = require("../errors/ConflictErr");

const { NODE_ENV, JWT_SECRET } = process.env;

const userFeedback = async (req, res) => {
    try {
        const filepath = path.join(
            `${__dirname}`,
            "..",
            "/utils",
            "feedback.json"
        );
        let rawdata = fs.readFileSync(filepath, "utf-8");
        let parsedData = JSON.parse(rawdata);
        parsedData.push(req.body);
        let updatedData = JSON.stringify(parsedData);
        fs.writeFile(filepath, updatedData, (err) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                console.log("done writing to file");
                res.send("writing is done");
            }
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
};

const createUser = (req, res, next) => {
    const { email, password, name } = req.body;
    bcrypt
        .hash(password, 10)
        .then((hash) =>
            User.create({
                email,
                password: hash,
                name,
            })
        )
        .catch((err) => {
            if (err.name === "MongoError" || err.code === 11000) {
                throw new ConflickErr({
                    message:
                        "Пользователь с таким email уже есть, введите другой email",
                });
            } else next(err);
        })
        .then((user) =>
            res.status(201).send({
                message: `Пользователь с email: ${user.email} зарегистрирован`,
            })
        )
        .catch(next);
};

const login = (req, res, next) => {
    const { email, password } = req.body;

    return User.findUserByCredentials(email, password)
        .then((user) => {
            const token = jwt.sign(
                { _id: user._id },
                NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
                { expiresIn: "7d" }
            );
            res.status(200).send({
                token,
                email: user.email,
                name: user.name,
            });
        })
        .catch(next);
};

module.exports = {
    userFeedback,
    createUser,
    login,
};
