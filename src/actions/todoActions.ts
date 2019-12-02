import { Todo } from "../reducers";
import { ADD_TODO, DELETE_LAST_TODO, TodoActionTypes } from ".";

export function addTodo(todo: Todo): TodoActionTypes {
  return {
    type: ADD_TODO,
    payload: todo
  };
}

export function deleteLastTodo(): TodoActionTypes {
  return {
    type: DELETE_LAST_TODO
  };
}
