import styled from 'styled-components';

export const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
`

export const CharactersWrapper = styled.div`
  width: 100%;
` 

export const CharactersFilters = styled.div`
  width: 100%;
  margin-top: 16px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .subgroup {
    display: flex;
    align-items: center;
  }
`

export const Pagination = styled.div`
  overflow-wrap: break-word;
  margin-top: 16px;
  a {
    cursor: pointer;
    margin-left: 4px;
    margin-right: 4px;

    &.selected {
      text-decoration: underline;
      font-weight: bold;
    }
  }
`