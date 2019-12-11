export interface AppState {
  currentPage: Page;
}

export enum Page {
  HomePage = "HOME_PAGE",
  GamePage = "GAME_PAGE",
  ResultPage = "RESULT_PAGE"
}
