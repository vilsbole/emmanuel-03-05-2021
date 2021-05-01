export const initialState = { asks: [], bids: [] };

export const reducer = (state = initialState, action = { type: "init" }) => {
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

export const updateAsks = (asks) => ({ type: "addAsks", payload: asks });
export const updateBids = (bids) => ({ type: "addBids", payload: bids });

export const selectAsks = (state) => state.asks;
export const selectBids = (state) => state.bids;
