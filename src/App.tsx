import { useEffect, useReducer } from "react";
import useWebsocket, { ReadyState } from "react-use-websocket";
import { isEmpty } from "ramda";

import {
  reducer,
  updateAsks,
  updateBids,
  resetState,
  selectSortedAsks,
  selectSortedBids,
  initialState,
} from "./store";
import { WS_URL, FEED, PAIR } from "./config";
import { Text, Flex, Dot, Box, OrderBook } from "./components";

function App() {
  const [state, dispatch] = useReducer<typeof reducer>(reducer, initialState);

  const { sendJsonMessage, readyState, getWebSocket } = useWebsocket(WS_URL, {
    onOpen: () => {
      sendJsonMessage({
        event: "subscribe",
        feed: FEED,
        product_ids: [PAIR],
      });
    },
    onMessage: (message) => {
      const { bids, asks, feed, product_id } = JSON.parse(message.data);
      if (feed !== FEED || product_id !== PAIR) return;
      if (!isEmpty(asks)) dispatch(updateAsks(asks));
      if (!isEmpty(bids)) dispatch(updateBids(bids));
    },
    onClose: () => console.debug("ws closed"),
    onError: (e) => console.debug("ws error", e),
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: "connecting",
    [ReadyState.OPEN]: "open",
    [ReadyState.CLOSING]: "closing",
    [ReadyState.CLOSED]: "closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    if (readyState === ReadyState.CLOSED) {
      dispatch(resetState());
    }
    // return () => {
    //   getWebSocket()?.close();
    // };
  }, [readyState, dispatch, getWebSocket]);

  return (
    <Flex height="100%" flexDirection="column" alignItems="center" mt="20%">
      <Box>
        <Flex alignItems="center" mb="0.5em" sx={{ fontVariant: "small-caps" }}>
          <Text as="h3" mr="1ch">
            orderbook
          </Text>
          <Dot
            size="10px"
            color={connectionStatus === "open" ? "accent" : "warn"}
          />
          <Text sx={{ textTransform: "lowercase" }} ml="2px">
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
