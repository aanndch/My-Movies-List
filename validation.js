const Joi = require("@hapi/joi");

const registerValidation = data => {
  const registerSchema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    username: Joi.string()
      .min(6)
      .required(),
    password: Joi.string()
      .min(6)
      .pattern(/^[a-zA-Z0-9]{3,30}$/)
      .required()
  });

  return registerSchema.validate(data);
};

const loginValidation = data => {
  const loginSchema = Joi.object({
    email: Joi.string()
      .min(6)
      .required.email(),
    password: Joi.string()
      .min(6)
      .pattern(/^[a-zA-Z0-9]{3,30}$/)
      .required()
  });

  return loginSchema.validate(data);
};

module.exports = { registerValidation, loginValidation };
