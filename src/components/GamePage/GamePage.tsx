import * as React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {RootState, Page} from '../../reducers';
import {easySet} from '../../reducers/gameReducer';
import * as actions from '../../actions';
import {Text} from '../Typography/Text';
import {Button} from '../Button/Button';

const mapStateToProps = (state: RootState) => ({
  playerName: state.game.playerName,
  tasks: state.game.tasks,
  elapsedTime: state.game.elapsedTime,
  currentTask: state.game.currentTask,
  answer: state.game.answer,
  selectedTables: state.game.selectedTables,
});

type Props = ReturnType<typeof mapStateToProps> & typeof actions;

const Input = styled.input<{alternate: boolean}>`
  @keyframes fade1 {
    from {
      background-color: green;
    }
    to {
      background-color: white;
    }
  }
  @keyframes fade2 {
    from {
      background-color: green;
    }
    to {
      background-color: white;
    }
  }

  width: 115px;
  height: 100px;
  font-size: 64px;
  text-align: center;
  border: 2px solid rgb(220, 220, 220);
  animation: ${({alternate}) => (alternate ? 'fade1' : 'fade2')} 1s;

  &:focus {
    outline: 4px solid #ff8f8f;
  }
`;

const Task = styled.div`
  font-size: 24px;
  margin: 20px;
`;

const ProgressBar = styled.div<{total: number; left: number}>`
  width: calc((80% / (${({total, left}) => total / (total - left)})) + 20%);
  height: 30px;
  margin: 10px auto;
  padding-top: 10px;
  color: white;
  background-color: hsl(
    ${({total, left}) => 100 - 100 * (left / total)},
    100%,
    30%
  );
  transition: width 300ms, background-color 300ms;
`;

class GamePage extends React.Component<Props, {updated: boolean}> {
  timer: NodeJS.Timeout;

  previousTask: number;

  animAlternate: boolean;

  constructor(props) {
    super(props);
    this.timer = setInterval(props.incrementTimer, 1000);
    this.previousTask = props.tasks.length;
    this.animAlternate = false;
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
      resetGame,
      selectedTables,
    } = this.props;
    const seconds = elapsedTime % 60;
    const minutes = Math.floor(elapsedTime / 60);
    const total = selectedTables.toString() === easySet.toString() ? 50 : 100;
    if (tasks.length !== this.previousTask) {
      this.previousTask = tasks.length;
      this.animAlternate = !this.animAlternate;
    }

    return (
      <>
        <Text>Answer all the questions, {playerName}!</Text>
        <Task>
          {currentTask[0]}x{currentTask[1]}
        </Task>
        <Input
          alternate={this.animAlternate}
          type="text"
          autoFocus
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setAnswer(e.target.value);
            checkAnswer();
          }}
          value={answer}
        />
        <ProgressBar total={total} left={tasks.length}>
          Tasks left: {tasks.length}
        </ProgressBar>
        <div>
          {minutes}:{seconds < 10 ? '0' : ''}
          {seconds}
        </div>

        <Button onClick={() => setCurrentPage(Page.HomePage)}>Back</Button>
        <Button onClick={resetGame}>Restart</Button>
      </>
    );
  }
}

export default connect(mapStateToProps, actions)(GamePage);
