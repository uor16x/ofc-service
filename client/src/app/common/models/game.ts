export interface Game {
  _id: string;
  creationTime: Date;
  hostName: string;
  name: string;
  stake: number;
  status: string;
  history: any; //TODO change to history interface
  stats: Stat[];
}

export interface Stat {
  player: string;
  stat: number;
}
