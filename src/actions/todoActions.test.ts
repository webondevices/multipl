import { addTodo, deleteLastTodo, ADD_TODO, DELETE_LAST_TODO } from ".";

test("creates the 'addTodo' action", () => {
  const value = "value";
  const action = addTodo(value);

  expect(action).toEqual({
    type: ADD_TODO,
    payload: value
  });
});

test("creates the 'deleteLastTodo' action", () => {
  const action = deleteLastTodo();

  expect(action).toEqual({
    type: DELETE_LAST_TODO
  });
});
