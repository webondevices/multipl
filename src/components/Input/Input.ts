import styled from 'styled-components';
import theme from '../Theme';

export const ErrorLabel = styled.span<{show: boolean}>`
  display: ${({show}) => (show ? 'block' : 'none')};
  color: red;
  margin-top: -20px;
  margin-bottom: 20px;
`;

export const InputLabel = styled.label`
  font-size: 18px;
  text-decoration: underline;
`;

export const InputField = styled.input`
  appearance: none;
  display: block;
  width: 100%;
  max-width: 300px;
  height: ${theme.unit * 5}px;
  margin: ${theme.unit * 3}px auto;
  padding: ${theme.unit * 3}px ${theme.unit * 2}px;
  font-size: ${theme.unit * 3}px;
  border: ${theme.unit / 2}px solid transparent;

  &:hover {
    border-color: ${theme.primaryInvertColor};
  }

  &:focus {
    border-color: ${theme.inkDefault};
    outline: none;
  }
`;
