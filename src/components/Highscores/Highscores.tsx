import * as React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {RootState, Sets, Difficulties} from '../../reducers';
import * as actions from '../../actions';
import * as firebase from '../../utils/firebase';
import theme from '../Theme';
import {getFormattedTime} from '../../utils/helpers';

const mapStateToProps = (state: RootState) => ({
  elapsedTime: state.game.elapsedTime,
  playerName: state.player.playerName,
  playerClass: state.player.playerClass,
});

type HighScore = {
  playerName: string;
  playerClass: string;
  elapsedTime: number;
  index: number;
};

type ComponentProps = {
  scroll: boolean;
  set: Sets;
  difficulty: Difficulties;
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof actions &
  ComponentProps;
type State = {
  highscores: Array<HighScore>;
  loading: boolean;
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
  overflow-wrap: break-word;
  width: 50%;
`;
const Result = styled.div`
  width: 50%;
  text-align: right;
`;

const Scroller = styled.div<{scroll: boolean}>`
  width: 100%;
  ${({scroll}) =>
    scroll &&
    `max-height: 480px;
    overflow-y: scroll;

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100px;
      left: 0;
      bottom: 0;
      background: linear-gradient(
        to bottom,
        hsla(151, 100%, 90%, 0%) 0%,
        hsla(151, 100%, 90%, 100%) 100%
      );
  }`}
`;

class Highscores extends React.Component<Props, State> {
  extraScores: number;

  isAvailable: boolean;

  constructor(props) {
    super(props);
    this.state = {
      highscores: [],
      loading: true,
    };
    this.extraScores = 5;
    this.isAvailable = false;
  }

  componentDidMount() {
    this.isAvailable = true;
    this.setState({loading: true});
    this.updateScores();
  }

  componentDidUpdate(prevProps) {
    const {set, difficulty} = this.props;
    if (set !== prevProps.set || difficulty !== prevProps.difficulty) {
      this.updateScores();
    }
  }

  componentWillUnmount() {
    this.isAvailable = false;
  }

  updateScores() {
    const {set, difficulty} = this.props;

    firebase.readItemOnce(`/${set}${difficulty}`).then(snapshot => {
      const highscores: Array<HighScore> = [];
      snapshot.forEach(child => {
        highscores.push({...child.val(), index: highscores.length});
      });

      // const index = highscores.findIndex(
      //   ({elapsedTime: time, playerName: name, playerClass: pclass}) =>
      //     name === playerName && time === elapsedTime && pclass === playerClass,
      // );

      // if (index > -1) {
      //   const diff = index - this.extraScores;
      //   const sliceFrom = diff > -1 ? diff : 0;
      //   const sliceTo = index + this.extraScores + 1;
      //   highscores = highscores.slice(sliceFrom, sliceTo);
      // }

      if (this.isAvailable) {
        this.setState({highscores, loading: false});
      }
    });
  }

  render() {
    const {elapsedTime, playerName, playerClass, scroll} = this.props;
    const {highscores, loading} = this.state;

    const getContent = () =>
      loading ? (
        <div>Loading...</div>
      ) : (
        <div>No results yet. Be the first to complete this!</div>
      );

    return (
      <Scroller scroll={scroll}>
        {highscores.length > 0
          ? highscores.map(
              ({
                elapsedTime: time,
                playerName: name,
                playerClass: pclass,
                index,
              }) => (
                <Score
                  key={name + pclass + time + index + new Date().getTime()}
                  selected={
                    name === playerName &&
                    time === elapsedTime &&
                    pclass === playerClass
                  }
                >
                  <Name>{`${index + 1}. ${name}, ${pclass}`}</Name>
                  <Result>{`${getFormattedTime(time)}`}</Result>
                </Score>
              ),
            )
          : getContent()}
      </Scroller>
    );
  }
}

export default connect(mapStateToProps, actions)(Highscores);
