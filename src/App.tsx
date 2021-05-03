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
      },
      onClose: () => console.debug("ws closed"),
      onError: (e) => console.debug("ws error", e),
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
    const { feed, product_id, bids, asks } = lastJsonMessage;
    if (feed !== FEED || product_id !== PAIR) {
      return;
    }
    if (!isEmpty(asks)) dispatch(updateAsks(asks));
    if (!isEmpty(bids)) dispatch(updateBids(bids));
  }, [lastJsonMessage]);

  const pause = () => {
    sendJsonMessage({
      event: "unsubscribe",
      feed: FEED,
      product_ids: [PAIR],
    });
  };

  const start = () => {
    sendJsonMessage({
      event: "subscribe",
      feed: FEED,
      product_ids: [PAIR],
    });
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
            orderbook
          </Text>
          <Text sx={{ textTransform: "lowercase" }}>{PAIR}</Text>
          <Text justifySelf="flex-end">
            {connectionStatus}
            <Dot
              size="10px"
              color={connectionStatus === "open" ? "accent" : "warn"}
            />
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
