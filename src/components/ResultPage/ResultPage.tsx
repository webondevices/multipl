import * as React from "react";
import { connect } from "react-redux";
import { RootState, Page } from "../../reducers";
import * as actions from "../../actions";

const mapStateToProps = (state: RootState) => ({
  elapsedTime: state.game.elapsedTime
});

type Props = ReturnType<typeof mapStateToProps> & typeof actions;

class HomePage extends React.Component<Props, {}> {
  render() {
    const { elapsedTime, setCurrentPage } = this.props;
    const seconds = elapsedTime % 60;
    const minutes = Math.floor(elapsedTime / 60);
    return (
      <React.Fragment>
        <p>Congratulations! You completed the task in:</p>

        <h1>
          {minutes}:{seconds < 10 ? "0" : ""}
          {seconds}
        </h1>

        <button onClick={() => setCurrentPage(Page.HomePage)}>Back home</button>
        <button onClick={() => setCurrentPage(Page.GamePage)}>Restart</button>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, actions)(HomePage);
