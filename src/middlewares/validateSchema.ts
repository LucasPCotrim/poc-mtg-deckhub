import { clientError } from '../errors/clientError.js';

export default function validateSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) return res.status(422).send(clientError(422, String(error)));

    next();
  };
}
