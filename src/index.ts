import { LOG_COLORS } from './constants/constants';
import { httpServer } from './http_server/index';
import { coloredLog } from './utils/coloredLog';

const HTTP_PORT = process.env.HTTP_PORT || 8181;

coloredLog(`Start static http server on the ${HTTP_PORT} port!`, LOG_COLORS.fMagenta);

httpServer.listen(HTTP_PORT);
