import * as React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { RootState, easySet, fullSet } from "../../reducers";
import * as actions from "../../actions";

const mapStateToProps = (state: RootState) => ({
  playerName: state.game.playerName,
  playerNameValid: state.game.playerNameValid,
  playerNameError: state.game.playerNameError,
  selectedTables: state.game.selectedTables
});

type Props = ReturnType<typeof mapStateToProps> & typeof actions;

const ErrorLabel = styled.span<{ show: boolean }>`
  display: ${({ show }) => (show ? "block" : "none")};
  color: red;
`;

const FormLabel = styled.label`
  font-size: 18px;
`;

const NameInput = styled.input`
  box-sizing: border-box;
  display: block;
  width: 300px;
  height: 40px;
  margin: 20px auto;
  padding: 10px;
  font-size: 18px;
  border: none;
  outline: 2px solid lightgray;

  &:focus {
    outline: 4px solid black;
  }
`;

const TablesFieldset = styled.fieldset`
  border: none;
`;

const TablesLegend = styled.legend`
  font-size: 18px;
`;

const CTAButton = styled.button`
  width: 200px;
  height: 40px;
  font-size: 18px;
  background-color: black;
  color: white;
  margin: 20px;
`;

class HomePage extends React.Component<Props, {}> {
  render() {
    const {
      setPlayerName,
      proceedToGame,
      playerName,
      playerNameValid,
      playerNameError,
      setTables,
      selectedTables
    } = this.props;

    return (
      <React.Fragment>
        <p>Welcome! Ready to play?</p>

        <FormLabel htmlFor="player-name">Enter your name:</FormLabel>
        <NameInput
          type="text"
          id="player-name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPlayerName(e.target.value);
          }}
          value={playerName}
        />
        <ErrorLabel show={!playerNameValid && playerNameError}>
          {playerNameError}
        </ErrorLabel>
        <TablesFieldset>
          <TablesLegend>Choose the difficulty:</TablesLegend>
          <FormLabel>
            Easy: {easySet.toString()}
            <input
              name="tables"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTables(e.currentTarget.value)
              }
              type="radio"
              value={easySet.toString()}
              checked={selectedTables.toString() === easySet.toString()}
            />
          </FormLabel>
          <br />
          <FormLabel>
            Full: {fullSet.toString()}
            <input
              name="tables"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTables(e.currentTarget.value)
              }
              type="radio"
              value={fullSet.toString()}
              checked={selectedTables.toString() === fullSet.toString()}
            />
          </FormLabel>
        </TablesFieldset>

        <CTAButton onClick={proceedToGame}>Start</CTAButton>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, actions)(HomePage);
