import { RequestError } from '../protocols/errors.js';

const STATUS_TEXTS = {
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Metho d Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  412: 'Precondition Failed',
  422: 'Unprocessable Entity',
  429: 'Too many Requests',
};

export function clientError(
  statusCode: number,
  message: string,
  data: object = null
): RequestError {
  return {
    statusCode,
    statusText: STATUS_TEXTS[statusCode],
    data,
    message,
  };
}
