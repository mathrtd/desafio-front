import React from "react";

export interface GridProps {
  gap?: string;
  columnCount?: number;
  minWidth?: string;
  children?: React.ReactNode;
}