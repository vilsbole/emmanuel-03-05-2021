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
import { Text, Flex, Box, Button, OrderBook } from "./components";

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
        feed: FEED,
        product_ids: [PAIR],
      })
    );
  };

  const start = () => {
    console.debug("Starty feed");
    ws.current.send(
      JSON.stringify({
        event: "subscribe",
        feed: FEED,
        product_ids: [PAIR],
      })
    );
  };

  const fail = () => {};
  return (
    <Flex height="100%" flexDirection="column" alignItems="center" mt="20%">
      <Flex mt="1em" mb="100px" justifyContent="space-between">
        <Box>
          <Button variant="primary" onClick={pause}>
            Pause
          </Button>
        </Box>
        <Box>
          <Button variant="outline" onClick={start} ml={2}>
            Restart
          </Button>
        </Box>
        <Box>
          <Button variant="outline" onClick={fail} ml={2}>
            Fail
          </Button>
        </Box>
      </Flex>
      <Box>
        <Flex alignItems="center" mb="0.5em" sx={{ fontVariant: "small-caps" }}>
          <Text as="h3" mr={"1ch"}>
            orderbook{" "}
          </Text>
          <Text
            as="span"
            sx={{ display: "inline-block", textTransform: "lowercase" }}
          >
            {PAIR}
          </Text>
        </Flex>
        <OrderBook
          bids={selectSortedBids(state)}
          asks={selectSortedAsks(state)}
        />
      </Box>
    </Flex>
  );
}

export default App;
