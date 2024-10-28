import { rooms } from '../models/rooms';
import type { CustomWebSocket, IRoom } from '../models/types';
import type { WebSocketServer } from 'ws';
import WebSocket from 'ws';

import { coloredLog } from '../utils/coloredLog';
import { LOG_COLORS, MESSAGE_TYPE } from '../constants/constants';
import { players } from '../models/players';
import { createWSResponse } from '../utils/createWSResponse';

export const updateRooms = (wss: WebSocketServer) => {
  const availableRooms = rooms
    .filter((r) => r.roomUsers.length === 1)
    .map((r) => ({
      roomId: r.roomId,
      roomUsers: r.roomUsers.map((p) => ({ name: p.name, index: p.index })),
    }));

  const message = JSON.stringify({
    type: 'update_room',
    data: JSON.stringify(availableRooms),
    id: 0,
  });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });

  coloredLog(`🛖 Rooms: ${JSON.stringify(availableRooms)}`, LOG_COLORS.fBlue);
};

export const handleCreateRoom = (ws: CustomWebSocket) => {
  const player = players.find((p) => p.name === ws.playerName);

  if (player) {
    const existingRooms = rooms.filter((room) =>
      room.roomUsers.some((user) => user.name === player.name)
    );
    if (existingRooms.length === 0) {
      const roomId = rooms.length + 1;
      const newRoom = {
        roomId,
        roomUsers: [{ name: ws.playerName, index: ws.playerIndex }],
      };

      rooms.push(newRoom);

      coloredLog(`🛖 New Room created! 🎉`, LOG_COLORS.fGreen);
    } else {
      coloredLog(`🛖 This Player ${player.name} already have a room!`, LOG_COLORS.fYellow);
    }
  }
};

const createGameInRoom = (room: IRoom, wss: WebSocketServer) => {
  const { roomId, roomUsers } = room;
  const idGame = roomId;

  roomUsers.forEach((user) => {
    const response = createWSResponse(MESSAGE_TYPE.CREATE_GAME, {
      idGame,
      idPlayer: user.index,
    });

    const client = Array.from(wss.clients).find(
      (clientWS) => (clientWS as CustomWebSocket).playerIndex === user.index
    );

    if (client && client.readyState === WebSocket.OPEN) {
      client.send(response);
    }
  });

  coloredLog(
    `🎮 Game started in room #${idGame} between ${roomUsers.map((u) => `'${u.name}'`).join(' and ')}`,
    LOG_COLORS.fGreen
  );

  const roomIndex = rooms.findIndex((r) => r.roomId === roomId);
  if (roomIndex !== -1) {
    rooms.splice(roomIndex, 1);
  }
};

export const handleAddUserToRoom = (
  ws: CustomWebSocket,
  indexRoom: number | string,
  wss: WebSocketServer
) => {
  const room = rooms.find((r) => r.roomId === indexRoom);
  const player = players.find((p) => p.index === ws.playerIndex);

  if (!room || room.roomUsers.length >= 2 || !player) return;

  rooms.forEach((r) => {
    const userIndex = r.roomUsers.findIndex((user) => user.index === ws.playerIndex);
    if (userIndex !== -1) {
      r.roomUsers.splice(userIndex, 1);
    }
  });

  if (room.roomUsers.length < 2) {
    room.roomUsers.push({ name: player.name, index: ws.playerIndex });

    if (room.roomUsers.length === 2) {
      createGameInRoom(room, wss);
    }
  }
};
