import joi from 'joi';

const updateDeckSchema = joi.object({
  deckName: joi.string().messages({
    'string.base': `"deckName" should be of type 'string'`,
    'string.empty': `"deckName" cannot be an empty field`,
  }),
  formatName: joi.string().messages({
    'string.base': `"formatName" should be of type 'string'`,
    'string.empty': `"formatName" cannot be an empty field`,
  }),
  cards: joi
    .array()
    .items(
      joi.object({
        cardName: joi.string().required().messages({
          'string.base': `"cardName" should be of type 'string'`,
          'string.empty': `"cardName" cannot be an empty field`,
        }),
        amount: joi.number().integer().min(1).required().messages({
          'number.base': `"amount" should be of type 'number'`,
          'number.empty': `"amount" cannot be an empty field`,
        }),
      })
    )
    .required()
    .unique((a, b) => a.cardName === b.cardName)
    .messages({
      'array.base': `"cards" must be an array`,
    }),
});

export default updateDeckSchema;
