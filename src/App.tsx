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
import { Text, Flex, Dot, Box, Button, OrderBook } from "./components";

function App() {
  const [state, dispatch] = useReducer<typeof reducer>(reducer, initialState);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebsocket(
    WS_URL,
    {
      onOpen: () => {
        dispatch(resetState());
        sendJsonMessage({
          event: "subscribe",
          feed: FEED,
          product_ids: [PAIR],
        });
      },
      onClose: () => console.debug("ws closed"),
      onError: (e) => console.debug("ws error", e),
      retryOnError: true,
      reconnectAttempts: 5,
    }
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "connecting",
    [ReadyState.OPEN]: "open",
    [ReadyState.CLOSING]: "closing",
    [ReadyState.CLOSED]: "closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  // Update state when we receive a valid message.
  useEffect(() => {
    if (!lastJsonMessage) return;
    const { bids, asks, feed, product_id } = lastJsonMessage;
    if (feed !== FEED || product_id !== PAIR) return;
    if (!isEmpty(asks)) dispatch(updateAsks(asks));
    if (!isEmpty(bids)) dispatch(updateBids(bids));
  }, [lastJsonMessage]);

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
