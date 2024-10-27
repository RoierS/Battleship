import { MESSAGE_TYPE } from '../constants/constants';
import { createWSResponse } from './createWSResponse';

type RegistrationResponseParams = {
  name: string;
  index: number;
  error: boolean;
  errorText: string;
};

export const createRegistrationResponse = ({
  name,
  index,
  error,
  errorText,
}: RegistrationResponseParams) =>
  createWSResponse(MESSAGE_TYPE.REGISTRATION, { name, index, error, errorText });
