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
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .subgroup {
    display: flex;
    align-items: center;
  }
`