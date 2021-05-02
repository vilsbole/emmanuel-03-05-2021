import React from "react";
import { subtract, pipe, head, last, prop, isEmpty } from "ramda";
import { financial } from "../utils";

import { Box, Text, Flex } from "./rebass";
import { default as Table, TableRow, CellHead, CellData } from "./Table";

const COLUMNS = ["price", "size", "total"];

const OrderBook = ({ bids = [], asks = [] }) => {
  const spread = subtract(
    pipe(last, prop("0"))(asks),
    pipe(head, prop("0"))(bids)
  );
  const loading = isEmpty(asks) || isEmpty(bids);
  return (
    <Box bg="dark" padding="1em" minHeight="726px" minWidth="312px">
      {loading ? (
        <Flex
          height="100%"
          width="100%"
          justifyContent="center"
          alignItems="center"
          colSpan={COLUMNS.length}
        >
          <Text color="inverted">Loading...</Text>
        </Flex>
      ) : (
        <Table
          sx={{
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: "0.8rem",
          }}
          columns={COLUMNS.map((h, idx) => (
            <CellHead
              key={idx}
              textAlign="right"
              minWidth={idx !== 0 ? "100px" : "70px"}
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
