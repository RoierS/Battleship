import type { WebSocketServer } from 'ws';
import { LOG_COLORS, MESSAGE_TYPE } from '../constants/constants';
import { games } from '../models/games';
import type { CustomWebSocket, IShip } from '../models/types';
import { coloredLog } from '../utils/coloredLog';
import WebSocket from 'ws';
import { createWSResponse } from '../utils/createWSResponse';

type HandleAddShipsParams = {
  gameId: number;
  ships: IShip[];
  indexPlayer: number;
  wss: WebSocketServer;
};

export const handleAddShips = ({ gameId, ships, indexPlayer, wss }: HandleAddShipsParams) => {
  const game = games.find((g) => g.idGame === gameId);

  if (!game) {
    coloredLog(`Game with ID ${gameId} not found`, LOG_COLORS.fRed);
    return;
  }

  game.ships.push({ indexPlayer, ships });

  if (game.ships.length === 2) {
    game.ships.forEach((s) => {
      const response = createWSResponse(MESSAGE_TYPE.START_GAME, {
        ships: s,
        currentPlayerIndex: indexPlayer,
      });

      const client = Array.from(wss.clients).find(
        (clientWS) => (clientWS as CustomWebSocket).playerIndex === indexPlayer
      );

      if (client && client.readyState === WebSocket.OPEN) {
        client.send(response);
      }
    });

    coloredLog(
      `🚀 Game ${gameId} started. Ships have been placed by both players.`,
      LOG_COLORS.fGreen
    );
  } else {
    coloredLog(
      `Waiting for the second player to place ships for game ${gameId}`,
      LOG_COLORS.fYellow
    );
  }
};
