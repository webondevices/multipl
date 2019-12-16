import * as React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { RootState, Page } from "../../reducers";
import * as actions from "../../actions";
import * as firebase from "../../utils/firebase";

const mapStateToProps = (state: RootState) => ({
  elapsedTime: state.game.elapsedTime,
  playerName: state.game.playerName,
  selectedTables: state.game.selectedTables
});

type HighScore = {
  playerName: string;
  elapsedTime: number;
};

type Props = ReturnType<typeof mapStateToProps> & typeof actions;
type State = {
  highscores: Array<HighScore>;
};

const CTAButton = styled.button`
  width: 200px;
  height: 40px;
  font-size: 18px;
  background-color: black;
  color: white;
  margin: 20px;
`;

const Score = styled.div<{ selected: boolean }>`
  font-size: 18px;
  margin: 10px;
  outline: ${({ selected }) =>
    selected ? "2px solid red" : "2px solid transparent"};
  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
`;

class HomePage extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      highscores: []
    };
  }

  componentDidMount() {
    firebase
      .readItemOnce("/" + this.props.selectedTables.toString())
      .then(snapshot => {
        let highscores: Array<HighScore> = [];
        snapshot.forEach(child => {
          highscores.push(child.val());
        });
        this.setState({ highscores });
      });
  }

  render() {
    const { elapsedTime, setCurrentPage, playerName } = this.props;
    const { highscores } = this.state;
    const seconds = elapsedTime % 60;
    const minutes = Math.floor(elapsedTime / 60);

    return (
      <React.Fragment>
        <p>Congratulations, {playerName}! You completed the task in:</p>

        <h1>
          {minutes}:{seconds < 10 ? "0" : ""}
          {seconds}
        </h1>

        <h2>High scores:</h2>
        {highscores.map(({ elapsedTime: time, playerName: name }, i) => (
          <Score key={name + time + i} selected={name === playerName}>
            {`${i + 1}. ${name}....... in ${time} seconds`}
          </Score>
        ))}

        <CTAButton onClick={() => setCurrentPage(Page.HomePage)}>
          Back home
        </CTAButton>
        <CTAButton onClick={() => setCurrentPage(Page.GamePage)}>
          Restart
        </CTAButton>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, actions)(HomePage);
