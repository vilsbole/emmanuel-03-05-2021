import React from "react";
import { Box } from "rebass";

export const CellHead = ({ children, ...props }) => (
  <Box as="th" {...props}>
    {children}
  </Box>
);

export const CellData = ({ children, ...props }) => (
  <Box as="td" {...props}>
    {children}
  </Box>
);

const Table = ({ columns, rows }) => {
  return (
    <table>
      <thead>
        <tr>{columns.map((c, idx) => c)}</tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx}>{row}</tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
