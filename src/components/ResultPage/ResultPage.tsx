import * as React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {RootState, Page} from '../../reducers';
import * as actions from '../../actions';
import * as firebase from '../../utils/firebase';
import {Text} from '../Typography/Text';
import {Button} from '../Button/Button';
import theme from '../Theme';

const mapStateToProps = (state: RootState) => ({
  elapsedTime: state.game.elapsedTime,
  playerName: state.game.playerName,
  selectedTables: state.game.selectedTables,
});

type HighScore = {
  playerName: string;
  elapsedTime: number;
  index: number;
};

type Props = ReturnType<typeof mapStateToProps> & typeof actions;
type State = {
  highscores: Array<HighScore>;
};

const Score = styled.div<{selected: boolean}>`
  display: flex;
  width: 300px;
  font-size: 18px;
  margin: 10px auto;
  text-align: left;
  color: ${({selected}) =>
    selected ? theme.primaryInvertColor : theme.inkDefault};
  font-weight: ${({selected}) => (selected ? 'bold' : 'normal')};
`;

const Name = styled.div`
  width: 50%;
`;
const Result = styled.div`
  width: 50%;
`;

class HomePage extends React.Component<Props, State> {
  extraScores: number;

  constructor(props) {
    super(props);
    this.state = {
      highscores: [],
    };
    this.extraScores = 3;
  }

  componentDidMount() {
    const {selectedTables, playerName, elapsedTime} = this.props;
    firebase.readItemOnce(`/${selectedTables.toString()}`).then(snapshot => {
      let highscores: Array<HighScore> = [];
      snapshot.forEach(child => {
        highscores.push({...child.val(), index: highscores.length});
      });
      const index = highscores.findIndex(
        ({elapsedTime: time, playerName: name}) =>
          name === playerName && time === elapsedTime,
      );

      if (index > -1) {
        const diff = index - this.extraScores;
        const sliceFrom = diff > -1 ? diff : 0;
        const sliceTo = index + this.extraScores + 1;
        highscores = highscores.slice(sliceFrom, sliceTo);
      }
      this.setState({highscores});
    });
  }

  render() {
    const {elapsedTime, setCurrentPage, playerName} = this.props;
    const {highscores} = this.state;
    const seconds = elapsedTime % 60;
    const minutes = Math.floor(elapsedTime / 60);

    return (
      <>
        <Text>Congratulations, {playerName}! You completed the task in:</Text>

        <h1>
          {minutes}:{seconds < 10 ? '0' : ''}
          {seconds}
        </h1>

        <h2>High scores:</h2>
        {highscores.map(({elapsedTime: time, playerName: name, index}) => (
          <Score
            key={name + time}
            selected={name === playerName && time === elapsedTime}
          >
            <Name>{`${index + 1}. ${name}`}</Name>
            <Result>{`${time} seconds`}</Result>
          </Score>
        ))}

        <Button onClick={() => setCurrentPage(Page.HomePage)}>Back home</Button>
        <Button onClick={() => setCurrentPage(Page.GamePage)}>Restart</Button>
      </>
    );
  }
}

export default connect(mapStateToProps, actions)(HomePage);
