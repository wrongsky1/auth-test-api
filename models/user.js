const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const AuthorizationErr = require("../errors/AuthorizationErr");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 30,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator(email) {
                return validator.isEmail(email);
            },
            message: "Вы ввели некорректный email",
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 10,
        select: false,
    },
});

userSchema.statics.findUserByCredentials = function search(email, password) {
    return this.findOne({ email })
        .select("+password")
        .then((user) => {
            if (!user) {
                throw new AuthorizationErr({
                    message: "Неправильный email или пароль",
                });
            }
            return bcrypt.compare(password, user.password).then((matched) => {
                if (!matched) {
                    throw new AuthorizationErr({
                        message: "Неправильный email или пароль",
                    });
                }
                return user;
            });
        });
};

module.exports = mongoose.model("user", userSchema);
