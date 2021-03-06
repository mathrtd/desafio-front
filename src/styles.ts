import styled from 'styled-components';

export const AppWrapper = styled.div`
  margin-right: auto;
  margin-left: auto;
  @media (min-width: 992px) {
    flex: 0 0 auto;
    width: 66.6666666667%;
  }
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`