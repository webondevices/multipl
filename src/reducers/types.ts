export interface AppState {
  currentPage: Page;
}

export type Multiplication = [number, number];

export interface GameState {
  playerName: string;
  playerNameValid: boolean;
  playerNameError: string;
  selectedTables: Array<number>;
  roundActive: boolean;
  elapsedTime: number;
  tasks: Array<Multiplication>;
  currentTask: Multiplication;
  answer: string;
}

export enum Page {
  HomePage = 'HOME_PAGE',
  GamePage = 'GAME_PAGE',
  ResultPage = 'RESULT_PAGE',
}
