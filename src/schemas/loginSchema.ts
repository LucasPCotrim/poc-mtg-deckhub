import joi from 'joi';

const loginSchema = joi.object({
  email: joi.string().email().required().messages({
    'string.base': `"email" should be of type 'string'`,
    'string.empty': `"email" cannot be an empty field`,
    'any.required': `"email" is a required field`,
  }),
  password: joi.string().required().messages({
    'string.base': `"password" should be of type 'string'`,
    'string.empty': `"password" cannot be an empty field`,
    'any.required': `"password" is a required field`,
  }),
});

export default loginSchema;
