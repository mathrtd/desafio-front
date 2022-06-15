import * as React from 'react';
import { DefaultGrid } from "./styles";
import { GridProps } from "./types";

const Grid: React.FC<GridProps> = ({...props}) => {
  return (
    <DefaultGrid
      {...props}
    >
      {props.children}
    </DefaultGrid>
  )
}

export default Grid;