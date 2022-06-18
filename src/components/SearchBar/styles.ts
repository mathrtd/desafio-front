import styled from 'styled-components';
import { SearchBarProps } from './types';

export const SearchBarWrapper = styled.div<SearchBarProps>`
  width: ${props => props.width ?? "100%"};
  max-width: calc(100% - 32px);
  position: relative;
  margin-left: -32px;
`

export const IconWrapper = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  top: 10px;
  left: 10px;
  img {
    width: auto;
    height: 100%;
  }
`

export const DefaultSearchBar = styled.input`
  max-width: calc(100% - 32px);
  height: 36px;
  width: 100%;
  border-radius: 16px;
  padding-left: 32px;
  border: 0;
  background-color: #FDECEC;

  &:focus {
    outline: 2px solid red;
  }
`