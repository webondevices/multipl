import { initialState, todoReducer } from "./todoReducer";
import { addTodo, deleteLastTodo } from "../actions";

it("inits with default state", () => {
  const action = <any>{};
  const nextState = todoReducer(undefined, action);

  expect(nextState).toEqual({
    todoList: ["filltodos"]
  });
});

it("handles ADD_TODO action", () => {
  const state = initialState;
  const value = "value";
  const action = addTodo(value);

  const nextState = todoReducer(state, action);

  expect(nextState).toEqual({
    todoList: ["filltodos", value]
  });
});

it("handles DELETE_LAST_TODO action", () => {
  const state = initialState;
  const action = deleteLastTodo();

  const nextState = todoReducer(state, action);

  expect(nextState).toEqual({
    todoList: []
  });
});
