import { LOG_COLORS } from '../constants/constants';

export const coloredLog = (message: string, color: string) => {
  console.log(`${color}${message}${LOG_COLORS.reset}`);
};
