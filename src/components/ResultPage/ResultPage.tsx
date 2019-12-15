import * as React from "react";
import { connect } from "react-redux";
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
        {highscores.map(({ elapsedTime, playerName }, i) => (
          <div key={playerName + elapsedTime + i}>
            {`${i + 1}. ${playerName}....... in ${elapsedTime} seconds`}
          </div>
        ))}

        <button onClick={() => setCurrentPage(Page.HomePage)}>Back home</button>
        <button onClick={() => setCurrentPage(Page.GamePage)}>Restart</button>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, actions)(HomePage);
