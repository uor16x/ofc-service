export interface Game {
  _id: string;
  creationTime: Date;
  hostName: string;
  name: string;
  stake: number;
  status: string;
  history: any; //TODO change to history interface
  players: Player[];
  stats: Stat[];
}

export interface Stat {
  player: string;
  stat: number;
}

export interface Player {
  name: string;
  hand: Hand
}

export interface Hand {
  isDone: boolean;
  isScoop: boolean;
  nextIsFantasy: boolean;
  extraLineBonuses: number;
  top: HandRow;
  middle: HandRow;
  bottom: HandRow;
}

export interface HandRow {
  combination: string;
  cards: string[];
  stats: {
    bonus: number;
    line: number;
    total: number;
  }
}
