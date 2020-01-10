import * as React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {RootState} from '../../reducers';
import {easySet, fullSet} from '../../reducers/gameReducer';
import * as actions from '../../actions';
import {Text} from '../Typography/Text';
import {Button} from '../Button/Button';
import {ErrorLabel, InputLabel, InputField} from '../Input/Input';

const mapStateToProps = (state: RootState) => ({
  playerName: state.game.playerName,
  playerNameValid: state.game.playerNameValid,
  playerNameError: state.game.playerNameError,
  selectedTables: state.game.selectedTables,
});

type Props = ReturnType<typeof mapStateToProps> & typeof actions;

const TablesFieldset = styled.fieldset`
  border: none;
`;

const TablesRadio = styled.input`
  display: none;
`;

const TablesLabel = styled.label`
  display: block;
  width: 200px;
  margin: 10px auto;
  padding: 10px;
  font-size: 22px;
  background-color: #ff8f8f52;
  cursor: pointer;

  &:hover {
    outline: 4px solid #ff8f8f;
  }

  ${TablesRadio}:checked + & {
    background-color: #ff8f8f;
    outline: 4px solid white;
  }
`;

const HomePage: React.FC<Props> = props => {
  const {
    setPlayerName,
    proceedToGame,
    playerName,
    playerNameValid,
    playerNameError,
    setTables,
    selectedTables,
  } = props;

  return (
    <>
      <Text>
        Learn the times tables by competing with your firends!
        <br />
        Ready to play?
      </Text>
      <InputField
        type="text"
        id="player-name"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPlayerName(e.target.value);
        }}
        value={playerName}
        placeholder="Enter your name"
      />
      <ErrorLabel show={!playerNameValid && playerNameError}>
        {playerNameError}
      </ErrorLabel>

      <TablesFieldset>
        <InputLabel>Select set of times tables:</InputLabel>
        <TablesRadio
          id="easy"
          name="tables"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTables(e.currentTarget.value)
          }
          type="radio"
          value={easySet.toString()}
          checked={selectedTables.toString() === easySet.toString()}
        />
        <TablesLabel htmlFor="easy">
          {easySet.toString().replace(/,/g, ' ')}
        </TablesLabel>
        <TablesRadio
          id="full"
          name="tables"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTables(e.currentTarget.value)
          }
          type="radio"
          value={fullSet.toString()}
          checked={selectedTables.toString() === fullSet.toString()}
        />
        <TablesLabel htmlFor="full">
          {fullSet.toString().replace(/,/g, ' ')}
        </TablesLabel>
      </TablesFieldset>

      <Button onClick={proceedToGame}>Start</Button>
    </>
  );
};

export default connect(mapStateToProps, actions)(HomePage);
