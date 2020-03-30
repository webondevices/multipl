import styled from 'styled-components';
import theme from '../Theme';

export const Button = styled.button`
  width: 100%;
  max-width: 300px;
  height: ${theme.unit * 8}px;
  margin: ${theme.unit * 3}px 0;
  font-size: 28px;
  background-color: black;
  border: none;
  color: white;
  cursor: pointer;

  &:hover {
    outline: ${theme.unit / 2}px solid ${theme.primaryInvertColor};
  }
`;
