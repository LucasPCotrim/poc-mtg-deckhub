export type RequestError = {
  statusCode: number;
  statusText: string;
  data?: object | null;
  message: string;
};

export type ApplicationError = {
  statusCode: number;
  statusText: string;
  data?: object | null;
  message: string;
};
