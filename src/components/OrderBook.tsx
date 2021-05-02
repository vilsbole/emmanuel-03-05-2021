import React from "react";
import { subtract, pipe, head, last, prop } from "ramda";
import { financial } from "../utils";

import { Box, Text } from "./rebass";
import { default as Table, TableRow, CellHead, CellData } from "./Table";

const OrderBook = ({ bids = [], asks = [] }) => {
  const columns = ["Price", "Size", "Total"];
  const spread = subtract(
    pipe(last, prop("0"))(asks),
    pipe(head, prop("0"))(bids)
  );
  return (
    <Box>
      <Table
        columns={columns.map((h, idx) => (
          <CellHead key={idx} textAlign="right" minWidth={"77px"}>
            {h}
          </CellHead>
        ))}
      >
        {asks.map(([p, s, t], idx) => (
          <TableRow key={idx}>
            <CellData>
              <Text>{financial(p)}</Text>
            </CellData>
            <CellData textAlign={"right"} minWidth={"77px"}>
              <Text>{financial(s, { fractionDigits: 0 })}</Text>
            </CellData>
            <CellData textAlign={"right"} minWidth={"77px"}>
              <Text>{financial(t, { fractionDigits: 0 })}</Text>
            </CellData>
          </TableRow>
        ))}
        <TableRow>
          <CellData bg="red" textAlign="center" colSpan={3}>
            spread: {financial(spread)}
          </CellData>
        </TableRow>
        {bids.map(([p, s, t], idx) => (
          <TableRow key={idx}>
            <CellData>
              <Text>{financial(p)}</Text>
            </CellData>
            <CellData textAlign={"right"} minWidth={"77px"}>
              <Text>{financial(s, { fractionDigits: 0 })}</Text>
            </CellData>
            <CellData textAlign={"right"} minWidth={"77px"}>
              <Text>{financial(t, { fractionDigits: 0 })}</Text>
            </CellData>
          </TableRow>
        ))}
      </Table>
    </Box>
  );
};

export default OrderBook;
