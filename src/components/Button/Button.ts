import styled from 'styled-components';
import theme from '../Theme';

export const Button = styled.button`
  box-sizing: border-box;
  width: 200px;
  height: ${theme.unit * 5}px;
  margin: ${theme.unit * 3}px;
  font-size: 20px;
  background-color: black;
  border: none;
  color: white;
  cursor: pointer;

  &:hover {
    outline: ${theme.unit / 2}px solid ${theme.primaryInvertColor};
  }
`;
