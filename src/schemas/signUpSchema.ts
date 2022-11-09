import joi from 'joi';

const signUpSchema = joi.object({
  name: joi.string().required().messages({
    'string.base': `"name" should be of type 'string'`,
    'string.empty': `"name" cannot be an empty field`,
    'any.required': `"name" is a required field`,
  }),
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
  confirmPassword: joi.string().required().valid(joi.ref('password')).messages({
    'string.base': `"confirmPassword" should be of type 'string'`,
    'string.empty': `"confirmPassword" cannot be an empty field`,
    'any.required': `"confirmPassword" is a required field`,
    'any.only': `"confirmPassword" must equal "password"`,
  }),
});

export default signUpSchema;
