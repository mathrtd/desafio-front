import styled from 'styled-components';
import { LabelProps } from './types';

export const Label = styled.label<LabelProps>`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  pointer-events: ${props => props.readOnly ? 'none' : 'auto'};
  user-select: none;
`;

export const HiddenInput = styled.input.attrs({
  type: 'checkbox',
})`
  display: none;
`;