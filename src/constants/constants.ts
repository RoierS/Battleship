export enum HttpStatusCodes {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

export const enum LOG_COLORS {
  reset = '\x1b[0m',
  fRed = '\x1b[31m',
  fGreen = '\x1b[32m',
  fYellow = '\x1b[33m',
  fBlue = '\x1b[34m',
  fMagenta = '\x1b[35m',
  bgGreen = '\x1b[42m',
  bgBlue = '\x1b[44m',
}
