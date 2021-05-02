import React from "react";
import { subtract, pipe, head, last, prop } from "ramda";
import { financial } from "../utils";

import { Box, Text } from "./rebass";
import { default as Table, TableRow, CellHead, CellData } from "./Table";

const COLUMNS = ["price", "size", "total"];
const COL_WIDTH = "100px";

const OrderBook = ({ bids = [], asks = [] }) => {
  const spread = subtract(
    pipe(last, prop("0"))(asks),
    pipe(head, prop("0"))(bids)
  );
  return (
    <Box bg="dark" padding="1em" minHeight="726px" minWidth="312px">
      {asks && bids && (
        <Table
          sx={{
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: "0.8rem",
          }}
          columns={COLUMNS.map((h, idx) => (
            <CellHead
              key={idx}
              textAlign="right"
              minWidth={idx !== 0 ? COL_WIDTH : "70px"}
              sx={{
                textTransform: "uppercase",
                fontWeight: "normal",
              }}
            >
              <Text color="discrete">{h}</Text>
            </CellHead>
          ))}
        >
          {asks.map(([p, s, t], idx) => (
            <TableRow key={idx}>
              <CellData textAlign={"right"}>
                <Text color="warn">{financial(p)}</Text>
              </CellData>
              <CellData textAlign={"right"}>
                <Text color="inverted">
                  {financial(s, { fractionDigits: 0 })}
                </Text>
              </CellData>
              <CellData textAlign={"right"}>
                <Text color="inverted">
                  {financial(t, { fractionDigits: 0 })}
                </Text>
              </CellData>
            </TableRow>
          ))}
          <TableRow>
            <CellData textAlign="center" colSpan={3} pt="1em" pb="1em">
              <Text fontSize="0.9em" color="discrete">
                {financial(spread)} Spread
              </Text>
            </CellData>
          </TableRow>
          {bids.map(([p, s, t], idx) => (
            <TableRow key={idx}>
              <CellData textAlign={"right"}>
                <Text color="accent">{financial(p)}</Text>
              </CellData>
              <CellData textAlign={"right"}>
                <Text color="inverted">
                  {financial(s, { fractionDigits: 0 })}
                </Text>
              </CellData>
              <CellData textAlign={"right"}>
                <Text color="inverted">
                  {financial(t, { fractionDigits: 0 })}
                </Text>
              </CellData>
            </TableRow>
          ))}
        </Table>
      )}
    </Box>
  );
};

export default OrderBook;
