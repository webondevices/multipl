import * as React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {RootState, Page} from '../../reducers';
import {sets, domain} from '../../reducers/gameReducer';
import * as actions from '../../actions';
import {Text} from '../Typography/Text';
import {Button} from '../Button/Button';
import {getFormattedTime} from '../../utils/helpers';

const mapStateToProps = (state: RootState) => ({
  playerName: state.player.playerName,
  playerClass: state.player.playerClass,
  tasks: state.game.tasks,
  elapsedTime: state.game.elapsedTime,
  currentTask: state.game.currentTask,
  answer: state.game.answer,
  selectedSet: state.game.selectedSet,
  selectedDifficulty: state.game.selectedDifficulty,
});

type Props = ReturnType<typeof mapStateToProps> & typeof actions;

const FIVE_MINUTES = 5 * 60;

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

const Counter = styled.div<{warning: boolean}>`
  font-size: 24px;
  background-color: ${({warning}) => (warning ? 'red' : 'transparent')};
  width: 70px;
  height: 32px;
  padding: 6px;
  margin: 0 auto;
`;

class GamePage extends React.Component<Props, {updated: boolean}> {
  timer: NodeJS.Timeout;

  previousTask: number;

  animAlternate: boolean;

  constructor(props) {
    super(props);
    window.scrollTo(0, 0);
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
      selectedSet,
      selectedDifficulty,
    } = this.props;
    const total =
      selectedSet !== null ? sets[selectedSet].length * domain.length : 0;

    if (tasks.length !== this.previousTask) {
      this.previousTask = tasks.length;
      this.animAlternate = !this.animAlternate;
    }

    return (
      <>
        <Text>
          Good luck, {playerName}!<br />
          You are doing the {selectedSet?.toLowerCase()} set at{' '}
          {selectedDifficulty?.toLowerCase()} level!
        </Text>
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
          Still to go: {tasks.length + 1}
        </ProgressBar>
        <Counter warning={elapsedTime > FIVE_MINUTES}>
          {getFormattedTime(elapsedTime)}
        </Counter>

        <Button onClick={() => setCurrentPage(Page.HomePage)}>Back</Button>
        <Button onClick={resetGame}>Restart</Button>
      </>
    );
  }
}

export default connect(mapStateToProps, actions)(GamePage);
