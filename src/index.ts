import { DEFAULT_HTTP_PORT, DEFAULT_WS_PORT, LOG_COLORS } from './constants/constants';
import { httpServer } from './http_server/index';
import { coloredLog } from './utils/coloredLog';
import dotenv from 'dotenv';
import { startWSServer } from './ws_server';

dotenv.config();

const HTTP_PORT = Number(process.env.HTTP_PORT) || DEFAULT_HTTP_PORT;
const WS_PORT = Number(process.env.WS_PORT) || DEFAULT_WS_PORT;

coloredLog(`🚀 Start static http server on port ${HTTP_PORT}`, LOG_COLORS.fMagenta);

httpServer.listen(HTTP_PORT);

coloredLog(`🚀 Starting WebSocket server on port ${WS_PORT}...`, LOG_COLORS.fGreen);

startWSServer(WS_PORT);

process.on('SIGINT', () => {
  coloredLog('🏁 Shutting down HTTP server...', LOG_COLORS.fMagenta);
  httpServer.close(() => process.exit(0));
});
