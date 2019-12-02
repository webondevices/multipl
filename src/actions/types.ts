import { Todo } from "../reducers/types";

export const ADD_TODO = "ADD_TODO";
export const DELETE_LAST_TODO = "DELETE_LAST_TODO";

interface SendTodoAction {
  type: typeof ADD_TODO;
  payload: Todo;
}

interface DeleteLastTodoAction {
  type: typeof DELETE_LAST_TODO;
}

export type TodoActionTypes = SendTodoAction | DeleteLastTodoAction;
