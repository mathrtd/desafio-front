import styled from 'styled-components';

export const SearchBarWrapper = styled.div`
  width: 100%;
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