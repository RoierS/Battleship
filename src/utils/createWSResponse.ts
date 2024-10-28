import type { MESSAGE_TYPE } from '../constants/constants';
import type { IMessage } from '../models/types';

export const createWSResponse = <T>(type: MESSAGE_TYPE, data: T, id = 0): string => {
  const message: IMessage = {
    type,
    data: JSON.stringify(data),
    id,
  };

  return JSON.stringify(message);
};
