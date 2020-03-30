import * as React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {RootState, Page} from '../../reducers';
import * as actions from '../../actions';
import {Text} from '../Typography/Text';
import {Button} from '../Button/Button';
import Highscores from '../Highscores/Highscores';
import {getFormattedTime} from '../../utils/helpers';

const mapStateToProps = (state: RootState) => ({
  elapsedTime: state.game.elapsedTime,
  playerName: state.player.playerName,
  playerClass: state.player.playerClass,
  selectedSet: state.game.selectedSet,
  selectedDifficulty: state.game.selectedDifficulty,
});

type Props = ReturnType<typeof mapStateToProps> & typeof actions;

const ResultButton = styled(Button)`
  margin: 8px;
`;

const ResultPage: React.FC<Props> = props => {
  const {
    elapsedTime,
    setCurrentPage,
    playerName,
    selectedSet,
    selectedDifficulty,
  } = props;

  return (
    <>
      <Text>Well done, {playerName}! You have completed the set in:</Text>

      <h1>{getFormattedTime(elapsedTime)}</h1>

      <h2>
        Best results in {selectedDifficulty?.toLowerCase()}{' '}
        {selectedSet?.toLowerCase()}:
      </h2>
      <Highscores set={selectedSet} difficulty={selectedDifficulty} />
      <ResultButton onClick={() => setCurrentPage(Page.HomePage)}>
        Change difficulty
      </ResultButton>
      <ResultButton onClick={() => setCurrentPage(Page.GamePage)}>
        Restart
      </ResultButton>
    </>
  );
};

export default connect(mapStateToProps, actions)(ResultPage);
