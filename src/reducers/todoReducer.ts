import { TodoActionTypes, ADD_TODO, DELETE_LAST_TODO } from "../actions/types";

import { TodoState } from ".";

const initialState: TodoState = {
  todoList: ["filltodos"]
};

export default function todoReducer(
  state = initialState,
  action: TodoActionTypes
) {
  console.log("RED", action);
  switch (action.type) {
    case ADD_TODO:
      return {
        todoList: [...state.todoList, action.payload]
      };

    case DELETE_LAST_TODO:
      return {
        todoList: state.todoList.slice(0, state.todoList.length - 1)
      };

    default:
      return state;
  }
}
