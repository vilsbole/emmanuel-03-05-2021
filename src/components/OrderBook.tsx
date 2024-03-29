import { isEmpty } from "ramda";
import { financial } from "../utils";

import type { Order } from "../store";
import { getSpread } from "../store";
import { Box, Text, Flex } from "./rebass";
import { default as Table, TableRow, CellHead, CellData } from "./Table";

const COLUMNS = ["price", "size", "total"];

type Props = { bids: Order[]; asks: Order[] };
const OrderBook: React.FC<Props> = ({ bids = [], asks = [] }) => {
  const isLoading = isEmpty(asks) || isEmpty(bids);
  return (
    <Box bg="dark" padding="1em" height="726px" minWidth="312px">
      {isLoading ? (
        <Flex
          height="100%"
          width="100%"
          justifyContent="center"
          colSpan={COLUMNS.length}
          alignItems="center"
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
                {financial(getSpread({ asks, bids }))} Spread
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
