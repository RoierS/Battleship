import type WebSocket from 'ws';
export interface IPlayer {
  index: number;
  name: string;
  password: string;
  wins: number;
  isConnected: boolean;
}

export interface GameRequest {
  type: string;
  data: string;
  id: number;
}

export interface PlayerRegData {
  name: string;
  password: string;
}

export interface IMessage {
  type: string;
  data: string;
  id: number;
}

export interface IRoom {
  roomId: number;
  roomUsers: IRoomPlayer[];
}
export interface IRoomPlayer {
  index: number;
  name: string;
}

export interface IAddUserToRoom {
  indexRoom: number | string;
}

export interface CustomWebSocket extends WebSocket {
  playerName: string;
  playerIndex: number;
}

export interface IShip {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: 'small' | 'medium' | 'large' | 'huge';
}

export interface IAddShipsData {
  gameId: number;
  ships: IShip[];
  indexPlayer: number;
}

export interface IGame {
  idGame: number;
  players: IRoomPlayer[];
  ships: PlayerShips[];
  currentTurn?: number;
}

export type ShipType = 'small' | 'medium' | 'large' | 'huge';

export interface Position {
  x: number;
  y: number;
}

export interface Ship {
  position: Position;
  direction: boolean;
  length: number;
  type: ShipType;
}
export interface PlayerShips {
  indexPlayer: number;
  ships: Ship[];
}
