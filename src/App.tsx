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
import { URL, FEED, PAIR } from "./config";
import { Flex, Box, Button, OrderBook } from "./components";

function App() {
  const ws = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    ws.current = new WebSocket(`wss://${URL}`);
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
        <OrderBook
          bids={selectSortedBids(state)}
          asks={selectSortedAsks(state)}
        />
      </Flex>
    </div>
  );
}

export default App;
