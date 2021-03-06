import * as React from 'react';
import {connect} from 'react-redux';
import styled, {createGlobalStyle} from 'styled-components';
import {PageProps} from './types';
import {RootState, Page} from '../../reducers';
import * as actions from '../../actions';
import HomePage from '../HomePage/HomePage';
import GamePage from '../GamePage/GamePage';
import ResultPage from '../ResultPage/ResultPage';
import theme from '../Theme';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${theme.primaryFont};
    background-color: ${theme.primaryColor};
    -webkit-font-smoothing: antialiased;
    margin: 0;
  }

  *, *::after, *::before {
    box-sizing: border-box;
  }
`;

const mapStateToProps = (state: RootState) => ({
  currentPage: state.app.currentPage,
});

type Props = ReturnType<typeof mapStateToProps> & typeof actions & PageProps;

const Container = styled.div`
  width: calc(100% - ${theme.unit * 3}px);
  max-width: 850px;
  margin: ${theme.unit * 1.5}px auto;
  text-align: center;
  background-color: ${theme.interfaceBackground};
  padding: ${theme.unit * 2.5}px;

  @media (min-width: 768px) {
    width: calc(100% - ${theme.unit * 6}px);
    margin: ${theme.unit * 3}px auto;
    padding: ${theme.unit * 5}px;
  }
`;

const PageTitle = styled.h1`
  font-size: 60px;
  font-family: ${theme.headingFont};
  font-weight: normal;
  text-decoration: underline;
  margin: 0;
`;

const App: React.FC<Props> = props => {
  const {currentPage} = props;
  return (
    <Container>
      <GlobalStyle />
      <PageTitle>Multipl</PageTitle>
      {currentPage === Page.HomePage && <HomePage />}
      {currentPage === Page.GamePage && <GamePage />}
      {currentPage === Page.ResultPage && <ResultPage />}
    </Container>
  );
};

export default connect(mapStateToProps, actions)(App);
