import * as React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { RootState, Page } from "../../reducers";
import * as actions from "../../actions";
import { setCurrentPage, resetTasks, sliceNextRandomTask } from "../../actions";
import { clearImmediate } from "timers";

const mapStateToProps = (state: RootState) => ({
  playerName: state.game.playerName,
  tasks: state.game.tasks,
  elapsedTime: state.game.elapsedTime,
  currentTask: state.game.currentTask,
  answer: state.game.answer
});

type Props = ReturnType<typeof mapStateToProps> & typeof actions;

const Input = styled.input`
  width: 115px;
  height: 100px;
  font-size: 64px;
  text-align: center;
  border: 2px solid rgb(220, 220, 220);
`;

class GamePage extends React.Component<Props, {}> {
  timer: NodeJS.Timeout;
  constructor(props) {
    super(props);
    this.timer = setInterval(props.incrementTimer, 1000);
    props.resetGame();
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const {
      playerName,
      elapsedTime,
      tasks,
      currentTask,
      setAnswer,
      checkAnswer,
      answer,
      setCurrentPage,
      resetGame
    } = this.props;
    const seconds = elapsedTime % 60;
    const minutes = Math.floor(elapsedTime / 60);
    return (
      <React.Fragment>
        <p>Answer all the questions, {playerName}!</p>
        <div>Tasks left: {tasks.length}</div>
        <div>
          {currentTask[0]} x {currentTask[1]}
        </div>
        <Input
          type="text"
          autoFocus
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setAnswer(e.target.value);
            checkAnswer();
          }}
          value={answer}
        />
        <div>
          {minutes}:{seconds < 10 ? "0" : ""}
          {seconds}
        </div>

        <button onClick={() => setCurrentPage(Page.HomePage)}>Back</button>
        <button onClick={resetGame}>Restart</button>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, actions)(GamePage);
