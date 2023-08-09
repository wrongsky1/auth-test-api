/* eslint-disable quotes */
const { celebrate, Joi } = require("celebrate");

const validateSignin = celebrate({
    body: Joi.object().keys({
        email: Joi.string()
            .required()
            .email()
            .message('Введите корректный "email"')
            .messages({
                "any.required": 'Поле "email" обязательно для заполнения',
            }),
        password: Joi.string()
            .required()
            .min(10)
            .pattern(/^\S+$/)
            .message("Поле password должно быть без пробелов")
            .messages({
                "any.required": 'Поле "email" обязательно для заполнения',
                "string.min": "Минимальная длина пароля 10 символов",
            }),
    }),
});

const validateSignup = celebrate({
    body: Joi.object().keys({
        email: Joi.string()
            .required()
            .email()
            .message('Введите корректный "email"')
            .messages({
                "any.required": 'Поле "email" обязательно для заполнения',
            }),
        password: Joi.string()
            .required()
            .min(10)
            .pattern(/^\S+$/)
            .message('Поле "password" должно быть без пробелов')
            .messages({
                "any.required": 'Поле "password" обязательно для заполнения',
                "string.min": "Минимальная длина пароля 10 символов",
            }),
        name: Joi.string().required().min(2).max(30).messages({
            "any.required": 'Поле "name" обязательно для заполнения!',
            "string.min": 'Минимальная длина "name" 2 символa',
            "string.max": 'Максимальная длина "name" 30 символов',
        }),
    }),
});

module.exports = {
    validateSignin,
    validateSignup,
};
