import configureStore from "./configureStore";

test("creates the store with initial state", () => {
  const store = configureStore({
    todos: {
      todoList: ["test_value"]
    }
  });
  const state = store.getState();

  expect(state).toEqual({
    todos: {
      todoList: ["test_value"]
    }
  });
});
