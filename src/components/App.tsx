import * as React from "react";
import { connect } from "react-redux";
import { PageProps } from "./types";
import { RootState } from "../reducers";
import * as actions from "../actions";

const mapStateToProps = (state: RootState) => ({
  todoList: state.todos.todoList
});

const mapDispatchToProps = dispatch => ({
  addTodo: todo => dispatch(actions.addTodo(todo)),
  deleteLastTodo: () => dispatch(actions.deleteLastTodo())
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  PageProps;

class App extends React.Component<Props, {}> {
  render() {
    const { color, todoList, addTodo, deleteLastTodo } = this.props;
    return (
      <div>
        <h1>Welcome to React with Typescript</h1>
        <p style={{ color }}>The color of this page is: {color}</p>
        <p>
          The message state is:{" "}
          {todoList.map(todo => (
            <span key={todo}>{todo}</span>
          ))}
          <button
            onClick={() => {
              addTodo(`random todo ${Math.random()}`);
            }}
          >
            Add
          </button>
          <button
            onClick={() => {
              console.log("REMOVE");
              deleteLastTodo();
            }}
          >
            Remove
          </button>
        </p>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
