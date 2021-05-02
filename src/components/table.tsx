import { Box, BoxProps } from "rebass";

export const CellHead: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box as="th" {...props}>
    {children}
  </Box>
);

export const CellData: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box as="td" {...props}>
    {children}
  </Box>
);

export const TableRow: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box as="tr" {...props}>
    {children}
  </Box>
);

const TableTag: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box as="table" height="100%" {...props}>
    {children}
  </Box>
);

const Table: React.FC<BoxProps & { columns: JSX.Element[] }> = ({
  columns,
  children,
  ...props
}) => {
  return (
    <TableTag {...props}>
      <thead>
        <tr>{columns.map((c) => c)}</tr>
      </thead>
      <tbody>{children}</tbody>
    </TableTag>
  );
};

export default Table;
