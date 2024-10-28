import type { CustomWebSocket, IPlayer, PlayerRegData } from '../models/types';
import { players } from '../models/players';
import { createRegistrationResponse } from '../utils/createRegistrationResponse';
import { coloredLog } from '../utils/coloredLog';
import { LOG_COLORS } from '../constants/constants';

export const handlePlayerRegistration = (data: PlayerRegData, ws: CustomWebSocket) => {
  const { name, password } = data;

  const existingPlayer = players.find((player) => player.name === data.name);

  if (existingPlayer) {
    if (existingPlayer.password !== password) {
      ws.send(
        createRegistrationResponse({
          name,
          index: existingPlayer.index,
          error: true,
          errorText: 'Incorrect user password',
        })
      );

      return;
    }

    if (existingPlayer.isConnected) {
      ws.send(
        createRegistrationResponse({
          name,
          index: existingPlayer.index,
          error: true,
          errorText: `Player ${name} is already connected`,
        })
      );

      return;
    }

    existingPlayer.isConnected = true;

    ws.playerName = existingPlayer.name;
    ws.playerIndex = existingPlayer.index;

    ws.send(
      createRegistrationResponse({
        name: existingPlayer.name,
        index: existingPlayer.index,
        error: false,
        errorText: '',
      })
    );
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

  ws.playerName = newPlayer.name;
  ws.playerIndex = newPlayer.index;

  ws.send(
    createRegistrationResponse({
      name: newPlayer.name,
      index: newPlayer.index,
      error: false,
      errorText: '',
    })
  );

  coloredLog(`🙎 New player "${name}" registered successfully! 🎉`, LOG_COLORS.fGreen);
  console.log('🎮 Current players:', players);
};
