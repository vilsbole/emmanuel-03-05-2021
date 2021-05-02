import React, { useEffect, useReducer, useRef } from "react";
import { isEmpty } from "ramda";

import {
  reducer,
  updateAsks,
  updateBids,
  selectSortedAsks,
  selectSortedBids,
  initialState,
} from "./store";
import {
  Table,
  Flex,
  Box,
  Button,
  Text,
  CellHead,
  CellData,
} from "./components";
import { financial } from "./helpers";

const URL = "wss://www.cryptofacilities.com/ws/v1";
const FEED = "book_ui_1";
const PAIR = "PI_XBTUSD";

function App() {
  const ws = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    ws.current = new WebSocket(URL);
    ws.current.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    ws.current.onmessage = (message) => {
      const { feed, product_id, bids, asks } = JSON.parse(message.data);
      if (feed !== FEED || product_id !== PAIR) {
        console.log("wrong feed", message.data);
        return;
      }

      if (!isEmpty(asks)) dispatch(updateAsks(asks));
      if (!isEmpty(bids)) dispatch(updateBids(bids));
    };

    ws.current.onerror = (err) => {
      console.log("on error", err);
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const pause = () => {
    console.debug("Pause feed");
    ws.current.send(
      JSON.stringify({
        event: "unsubscribe",
        feed: "book_ui_1",
        product_ids: ["PI_XBTUSD"],
      })
    );
  };

  const start = () => {
    console.debug("Starty feed");
    ws.current.send(
      JSON.stringify({
        event: "subscribe",
        feed: "book_ui_1",
        product_ids: ["PI_XBTUSD"],
      })
    );
  };
  return (
    <div className="App">
      <Flex alignItems="center">
        <h1>OrderBook</h1>
        <Box>
          <Button variant="primary" onClick={start} mr={2}>
            Start
          </Button>
        </Box>
        <Box>
          <Button variant="outline" onClick={pause}>
            Stop
          </Button>
        </Box>
      </Flex>
      <Flex justifyContent="space-around">
        <Table
          columns={["Price", "Size", "Total"].map((h, idx) => (
            <CellHead key={idx} textAlign="right" minWidth={"77px"}>
              {h}
            </CellHead>
          ))}
          rows={selectSortedAsks(state).map(([p, s, t]) => (
            <>
              <CellData>
                <Text>{financial(p)}</Text>
              </CellData>
              <CellData textAlign={"right"} minWidth={"77px"}>
                <Text>{financial(s, { fractionDigits: 0 })}</Text>
              </CellData>
              <CellData textAlign={"right"} minWidth={"77px"}>
                <Text>{financial(t, { fractionDigits: 0 })}</Text>
              </CellData>
            </>
          ))}
        />
        <Table
          columns={["Price", "Size", "Total"].map((h, idx) => (
            <CellHead key={idx} textAlign="right" minWidth={"77px"}>
              {h}
            </CellHead>
          ))}
          rows={selectSortedBids(state).map(([p, s, t]) => (
            <>
              <CellData>
                <Text>{financial(p)}</Text>
              </CellData>
              <CellData textAlign={"right"} minWidth={"77px"}>
                <Text>{financial(s, { fractionDigits: 0 })}</Text>
              </CellData>
              <CellData textAlign={"right"} minWidth={"77px"}>
                <Text>{financial(t, { fractionDigits: 0 })}</Text>
              </CellData>
            </>
          ))}
        />
      </Flex>
    </div>
  );
}

export default App;
