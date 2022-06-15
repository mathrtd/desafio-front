import styled from "styled-components";
import { GridProps } from "./types";

export const DefaultGrid = styled.div<GridProps>`
  --grid-layout-gap: ${(props) => props.gap};
  --grid-column-count: ${(props) => props.columnCount};
  --grid-item--min-width: ${(props) => props.minWidth};
  --gap-count: calc(var(--grid-column-count) - 1);
  --total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
  --grid-item--max-width: calc((100% - var(--total-gap-width)) / var(--grid-column-count));

  /* grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); */
  grid-template-columns: repeat(auto-fill, minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr));
  display: grid;
  justify-items: center;
  grid-gap: var(--grid-layout-gap);
`