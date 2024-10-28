import { WebSocketServer } from 'ws';
import { coloredLog } from '../utils/coloredLog';
import { LOG_COLORS } from '../constants/constants';
import { handlePlayerRegistration } from '../controllers/playerController';
import type { PlayerRegData, GameRequest, IAddUserToRoom, CustomWebSocket } from '../models/types';
import { handleAddUserToRoom, handleCreateRoom, updateRooms } from '../controllers/roomController';

export const startWSServer = (WS_PORT: number) => {
  const wss = new WebSocketServer({ port: WS_PORT });
  coloredLog(`🎉 WebSocket server started on port ${WS_PORT}`, LOG_COLORS.fGreen);

  wss.on('connection', (ws: CustomWebSocket) => {
    coloredLog('🔌 New WebSocket connection established', LOG_COLORS.fYellow);

    ws.on('message', (msg: string) => {
      try {
        const parsedMessage: GameRequest = JSON.parse(msg);
        console.log(`📩 Received command - '${parsedMessage.type}': ${msg}`);

        const { type, data } = parsedMessage;

        switch (type) {
          case 'reg': {
            const parsedData: PlayerRegData = JSON.parse(data);
            handlePlayerRegistration(parsedData, ws);
            updateRooms(wss);
            break;
          }

          case 'create_room': {
            handleCreateRoom(ws);
            updateRooms(wss);
            break;
          }

          case 'add_user_to_room': {
            const { indexRoom }: IAddUserToRoom = JSON.parse(data);
            handleAddUserToRoom(ws, indexRoom, wss);
            updateRooms(wss);
            break;
          }

          default:
            coloredLog('Unknown command', LOG_COLORS.fRed);
        }
      } catch (error) {
        coloredLog('Failed to parse message:', LOG_COLORS.fRed);
        console.error(error);
      }
    });

    wss.on('error', (error) => {
      coloredLog(`Error: ${error.message}`, LOG_COLORS.fRed);
    });

    ws.on('close', () => coloredLog('WebSocket connection closed', LOG_COLORS.fRed));
  });

  process.on('SIGINT', () => {
    coloredLog('\n🏁 Shutting down WebSocket server...', LOG_COLORS.fGreen);
    wss.close(() => process.exit(0));
  });
};
