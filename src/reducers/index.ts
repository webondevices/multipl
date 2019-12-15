import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import { gameReducer } from "./gameReducer";

export const rootReducer = combineReducers({
  app: appReducer,
  game: gameReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export * from "./appReducer";
export * from "./gameReducer";
export * from "./types";
