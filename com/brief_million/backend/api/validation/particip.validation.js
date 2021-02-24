const Joi = require('@hapi/joi');

// VALIDATION REGISTER
const registerValidation = data =>{
    const schema = Joi.object({
        full_name: Joi.string()
            .min(4)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        age: Joi.number()
            .min(2),
        phone: Joi.string()
            .min(10)
            .required(),
        password: Joi.string()
            .min(3)
            .required()
    });
    return schema.validate(data)
}

const loginValidation = data =>{
    const schema = Joi.object({
        phone: Joi.string()
            .min(10)
            .required(),
        password: Joi.string()
            .min(3)
            .required()
    });
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;