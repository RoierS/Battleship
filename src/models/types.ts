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
