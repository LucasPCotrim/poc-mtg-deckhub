import { ApplicationError } from '../protocols/errors.js';

const STATUS_TEXTS = {
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
  506: 'Variant Also Negotiates',
  507: 'Insufficient Storage',
  508: 'Loop Detected',
  510: 'Not Extended',
  511: 'Network Authentication Required',
};

export function serverError(
  statusCode: number,
  message: string,
  data: object = null
): ApplicationError {
  return {
    statusCode,
    statusText: STATUS_TEXTS[statusCode],
    data,
    message,
  };
}
