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

export const DEFAULT_HTTP_PORT = 8181;

export const DEFAULT_WS_PORT = 3000;

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

export enum MESSAGE_TYPE {
  REGISTRATION = 'reg',
  UPDATE_ROOM = 'update_room',
  CREATE_GAME = 'create_game',
  TURN = 'turn',
  START_GAME = 'start_game',
  ATTACK = 'attack',
  FINISH = 'finish',
  UPDATE_WINNERS = 'update_winners',
  ADD_SHIPS = 'add_ships',
  CREATE_ROOM = 'create_room',
  ADD_USER_TO_ROOM = 'add_user_to_room',
  RANDOM_ATTACK = 'randomAttack',
}
