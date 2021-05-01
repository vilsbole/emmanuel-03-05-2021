import React, { useEffect, useReducer, useRef, useState } from "react";
import "./App.css";
import { default as isEmpty } from "ramda/src/isEmpty";
import { Flex, Box, Button } from "rebass";

const URL = "wss://www.cryptofacilities.com/ws/v1";
const FEED = "book_ui_1";
const PAIR = "PI_XBTUSD";

const initialState = { asks: [], bids: [] };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "addAsks": {
      return {
        bids: state.bids,
        asks: [...state.asks, ...action.payload],
      };
    }
    case "addBids": {
      return {
        asks: state.asks,
        bids: [...state.bids, ...action.payload],
      };
    }
    default:
      return state;
  }
};

const addAsks = (asks) => ({ type: "addAsks", payload: asks });
const addBids = (bids) => ({ type: "addBids", payload: bids });

function App() {
  const ws = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    ws.current = new WebSocket(URL);
    ws.current.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    ws.current.onmessage = (message) => {
      console.log(message);
      const { feed, product_id, bids, asks } = JSON.parse(message.data);
      if (feed !== FEED || product_id !== PAIR) {
        console.log("wrong feed", message.data);
        return;
      }

      console.log("message", asks, bids);
      if (!isEmpty(asks)) dispatch(addAsks(asks));
      if (!isEmpty(bids)) dispatch(addBids(asks));
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
          <Button variant="Outline" onClick={start} mr={2}>
            Start Feed
          </Button>
        </Box>
        <Box>
          <Button variant="Outline" onClick={pause}>
            Stop Feed
          </Button>
        </Box>
      </Flex>
      <Flex justifyContent="space-around">
        <Flex flexDirection="column">
          <h3>Asks</h3>
          {state.asks.map((a, i) => (
            <div key="i">{`[${a[0]}, ${a[1]}]`}</div>
          ))}
        </Flex>
        <Flex flexDirection="column">
          <h3>Bids</h3>
          {state.bids.map((a, i) => (
            <div key="i">{`[${a[0]}, ${a[1]}]`}</div>
          ))}
        </Flex>
      </Flex>
    </div>
  );
}

export default App;
