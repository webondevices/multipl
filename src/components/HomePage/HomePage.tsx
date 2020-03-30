import * as React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {RootState, Sets, Difficulties} from '../../reducers';
import * as actions from '../../actions';
import {Text} from '../Typography/Text';
import {Button} from '../Button/Button';
import {ErrorLabel, InputLabel, InputField} from '../Input/Input';
import Highscores from '../Highscores/Highscores';

const mapStateToProps = (state: RootState) => ({
  playerName: state.player.playerName,
  playerNameValid: state.player.playerNameValid,
  playerNameError: state.player.playerNameError,
  playerClass: state.player.playerClass,
  playerClassValid: state.player.playerClassValid,
  playerClassError: state.player.playerClassError,
  selectedSet: state.game.selectedSet,
  selectedDifficulty: state.game.selectedDifficulty,
  tasks: state.game.tasks,
});

type Props = ReturnType<typeof mapStateToProps> & typeof actions;

const setColours = {
  [Sets.red]: '#ff6262',
  [Sets.orange]: '#ffa362',
  [Sets.yellow]: '#fff362',
  [Sets.green]: '#73ff62',
  [Sets.blue]: '#62e2ff',
  [Sets.indigo]: '#6275ff',
};

const difficultyColours = {
  [Difficulties.beginner]: '#dedede',
  [Difficulties.intermediate]: '#b1b1b1',
  [Difficulties.advanced]: '#6f6f6f',
};

const TablesFieldset = styled.fieldset`
  border: none;
`;

const TablesRadio = styled.input`
  display: none;
`;

const TablesLabel = styled.label<{labelColour: string}>`
  display: block;
  width: 300px;
  margin: 10px auto;
  padding: 10px;
  font-size: 22px;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: ${({labelColour}) => labelColour};
  }

  ${TablesRadio}:checked + & {
    background-color: ${({labelColour}) => labelColour};
  }
`;

const Container = styled.div`
  display: flex;
`;
const LeftPanel = styled.div<{highscoreOn: boolean}>`
  width: ${({highscoreOn}) => (highscoreOn ? '50%' : '100%')};
  transition: width 300ms;
`;
const RightPanel = styled.div<{highscoreOn: boolean}>`
  width: ${({highscoreOn}) => (highscoreOn ? '50%' : '0')};
  transition: width 300ms;
`;

const HomePage: React.FC<Props> = props => {
  const {
    setPlayerName,
    setPlayerClass,
    proceedToGame,
    playerName,
    playerNameValid,
    playerNameError,
    playerClass,
    playerClassValid,
    playerClassError,
    setSet,
    setDifficulty,
    generateTasks,
    selectedSet,
    selectedDifficulty,
  } = props;

  const highscoreOn = selectedSet !== null && selectedDifficulty !== null;

  return (
    <>
      <Text>Master the times tables by competing with your firends!</Text>
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

      <InputField
        type="text"
        id="player-class"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPlayerClass(e.target.value);
        }}
        value={playerClass}
        placeholder="Enter your class"
      />
      <ErrorLabel show={!playerClassValid && playerClassError}>
        {playerClassError}
      </ErrorLabel>
      <Text>Start at beginner red and progress slowly!</Text>
      <Container>
        <LeftPanel highscoreOn={highscoreOn}>
          <TablesFieldset>
            <InputLabel>Select your difficulty:</InputLabel>
            {Object.values(Difficulties).map(difficulty => (
              <React.Fragment key={difficulty}>
                <TablesRadio
                  id={difficulty}
                  name="difficulties"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setDifficulty(e.currentTarget.value as Difficulties);
                    generateTasks();
                  }}
                  type="radio"
                  value={difficulty}
                  checked={selectedDifficulty === difficulty}
                />
                <TablesLabel
                  htmlFor={difficulty}
                  labelColour={difficultyColours[Difficulties.beginner]}
                >
                  {difficulty}
                </TablesLabel>
              </React.Fragment>
            ))}
          </TablesFieldset>

          <TablesFieldset>
            <InputLabel>Select your set:</InputLabel>
            {Object.values(Sets).map(set => (
              <React.Fragment key={set}>
                <TablesRadio
                  id={set}
                  name="sets"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSet(e.currentTarget.value as Sets);
                    generateTasks();
                  }}
                  type="radio"
                  value={set}
                  checked={selectedSet === set}
                />
                <TablesLabel htmlFor={set} labelColour={setColours[set]}>
                  {set}
                </TablesLabel>
              </React.Fragment>
            ))}
          </TablesFieldset>
        </LeftPanel>

        <RightPanel highscoreOn={highscoreOn}>
          {highscoreOn && (
            <>
              <h2>
                Best results in {selectedDifficulty?.toLowerCase()}{' '}
                {selectedSet?.toLowerCase()}:
              </h2>
              <Highscores set={selectedSet} difficulty={selectedDifficulty} />
            </>
          )}
        </RightPanel>
      </Container>

      <Button onClick={proceedToGame}>Start</Button>
    </>
  );
};

export default connect(mapStateToProps, actions)(HomePage);
