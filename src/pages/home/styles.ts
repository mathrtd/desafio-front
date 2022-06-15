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
  display: flex;
  justify-content: space-between;
`

export const GridWrapper = styled.div`
  --grid-layout-gap: 32px;
  --grid-column-count: 4;
  --grid-item--min-width: 160px;
  --gap-count: calc(var(--grid-column-count) - 1);
  --total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
  --grid-item--max-width: calc((100% - var(--total-gap-width)) / var(--grid-column-count));

  /* grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); */
  grid-template-columns: repeat(auto-fill, minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr));
  display: grid;
  justify-items: center;
  grid-gap: var(--grid-layout-gap);
`