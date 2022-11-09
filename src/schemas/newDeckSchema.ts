import joi from 'joi';

const newDeckSchema = joi.object({
  deckName: joi.string().required().messages({
    'string.base': `"deckName" should be of type 'string'`,
    'string.empty': `"deckName" cannot be an empty field`,
    'any.required': `"deckName" is a required field`,
  }),
  formatName: joi.string().required().messages({
    'string.base': `"formatName" should be of type 'string'`,
    'string.empty': `"formatName" cannot be an empty field`,
    'any.required': `"formatName" is a required field`,
  }),
});

export default newDeckSchema;
