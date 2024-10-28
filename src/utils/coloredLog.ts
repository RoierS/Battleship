import { LOG_COLORS } from '../constants/constants';

export const coloredLog = (message: string, color: LOG_COLORS) => {
  console.log(`${color}${message}${LOG_COLORS.reset}`);
};
