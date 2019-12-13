import * as React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { PageProps } from "./types";
import { RootState, Page } from "../../reducers";
import * as actions from "../../actions";
import HomePage from "../HomePage/HomePage";
import GamePage from "../GamePage/GamePage";
import ResultPage from "../ResultPage/ResultPage";

const mapStateToProps = (state: RootState) => ({
  currentPage: state.app.currentPage
});

type Props = ReturnType<typeof mapStateToProps> & typeof actions & PageProps;

const Container = styled.div`
  font-family: sans-serif;
  width: 600px;
`;

class App extends React.Component<Props, {}> {
  render() {
    const { currentPage } = this.props;
    return (
      <Container>
        <h1>Multipl</h1>
        {currentPage === Page.HomePage && <HomePage />}
        {currentPage === Page.GamePage && <GamePage />}
        {currentPage === Page.ResultPage && <ResultPage />}
      </Container>
    );
  }
}

export default connect(mapStateToProps, actions)(App);
