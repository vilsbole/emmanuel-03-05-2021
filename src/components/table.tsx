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

export const TableRow = ({ children, ...props }) => (
  <Box as="tr" {...props}>
    {children}
  </Box>
);

const Table = ({ columns, children }) => {
  return (
    <table>
      <thead>
        <tr>{columns.map((c, idx) => c)}</tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;
