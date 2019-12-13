import * as React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { RootState, Page } from "../../reducers";
import * as actions from "../../actions";

const mapStateToProps = (state: RootState) => ({
  playerName: state.game.playerName,
  playerNameValid: state.game.playerNameValid,
  playerNameError: state.game.playerNameError
});

type Props = ReturnType<typeof mapStateToProps> & typeof actions;

const ErrorLabel = styled.span<{ show: boolean }>`
  display: ${({ show }) => (show ? "block" : "none")};
  color: red;
`;

class HomePage extends React.Component<Props, {}> {
  render() {
    const {
      setPlayerName,
      proceedToGame,
      playerName,
      playerNameValid,
      playerNameError
    } = this.props;
    console.log(playerNameValid, playerNameError);
    return (
      <React.Fragment>
        <p>Welcome! Ready to play?</p>

        <label htmlFor="player-name">Enter your name:</label>
        <input
          type="text"
          id="player-name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPlayerName(e.target.value)
          }
          value={playerName}
        />
        <ErrorLabel show={!playerNameValid && playerNameError}>
          {playerNameError}
        </ErrorLabel>

        <button onClick={proceedToGame}>Start</button>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, actions)(HomePage);
