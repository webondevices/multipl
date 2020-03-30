export interface AppState {
  currentPage: Page;
}

export interface PlayerState {
  playerName: string;
  playerNameValid: boolean;
  playerNameError: string;
  playerClass: string;
  playerClassValid: boolean;
  playerClassError: string;
}

export interface GameState {
  selectedSet: Sets | null;
  selectedDifficulty: Difficulties | null;
  roundActive: boolean;
  elapsedTime: number;
  tasks: Array<Multiplication>;
  currentTask: Multiplication;
  answer: string;
}

export type Multiplication = [number, number];

export enum Page {
  HomePage = 'HOME_PAGE',
  GamePage = 'GAME_PAGE',
  ResultPage = 'RESULT_PAGE',
}

export enum Sets {
  red = 'RED',
  orange = 'ORANGE',
  yellow = 'YELLOW',
  green = 'GREEN',
  blue = 'BLUE',
  indigo = 'INDIGO',
}

export enum Difficulties {
  beginner = 'BEGINNER',
  intermediate = 'INTERMEDIATE',
  advanced = 'ADVANCED',
}
