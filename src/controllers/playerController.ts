import type WebSocket from 'ws';
import type { IPlayer, PlayerRegData } from '../models/types';
import { players } from '../models/players';
import { createRegistrationResponse } from '../utils/createRegistrationResponse';
import { coloredLog } from '../utils/coloredLog';
import { LOG_COLORS } from '../constants/constants';

export const handlePlayerRegistration = (data: PlayerRegData, ws: WebSocket) => {
  const { name, password } = data;

  const existingPlayer = players.find((player) => player.name === data.name);

  if (existingPlayer) {
    if (existingPlayer.password !== password) {
      const response = createRegistrationResponse({
        name,
        index: existingPlayer.index,
        error: true,
        errorText: 'Incorrect user password',
      });

      ws.send(response);

      return;
    }

    if (existingPlayer.isConnected) {
      const response = createRegistrationResponse({
        name,
        index: existingPlayer.index,
        error: true,
        errorText: `Player ${name} is already connected`,
      });

      ws.send(response);

      return;
    }

    existingPlayer.isConnected = true;

    const response = createRegistrationResponse({
      name: existingPlayer.name,
      index: existingPlayer.index,
      error: false,
      errorText: '',
    });

    ws.send(response);
    coloredLog(`🙎 Player "${name}" successfully logged in 🎉`, LOG_COLORS.fGreen);

    return;
  }

  const newPlayer: IPlayer = {
    index: players.length + 1,
    name,
    password,
    wins: 0,
    isConnected: true,
  };

  players.push(newPlayer);

  const response = createRegistrationResponse({
    name: newPlayer.name,
    index: newPlayer.index,
    error: false,
    errorText: '',
  });

  ws.send(response);

  coloredLog(`🙎 New player "${name}" registered successfully! 🎉`, LOG_COLORS.fGreen);
  console.log('🎮 Current players:', players);
};
