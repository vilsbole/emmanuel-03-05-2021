import { reduce, take, pipe, toPairs } from "ramda";
import { insertOrder, sortByPrice } from "./helpers";

export const initialState = { asks: {}, bids: {} };

export const reducer = (state = initialState, action = { type: "init" }) => {
  switch (action.type) {
    case "addAsks": {
      return {
        bids: state.bids,
        asks: reduce(insertOrder, state.asks, action.payload),
      };
    }
    case "addBids": {
      return {
        asks: state.asks,
        bids: reduce(insertOrder, state.bids, action.payload),
      };
    }
    default:
      return state;
  }
};

export const updateAsks = (asks) => ({ type: "addAsks", payload: asks });
export const updateBids = (bids) => ({ type: "addBids", payload: bids });

export const selectAsks = ({ asks }) => {
  return pipe(toPairs, sortByPrice, take(15))(asks);
};
export const selectBids = ({ bids }) => {
  return pipe(toPairs, sortByPrice, take(15))(bids);
};
