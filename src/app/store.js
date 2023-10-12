import { applyMiddleware, compose, configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/LoginSlice";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = configureStore(
  {
    reducer: {
        user: userReducer,
    },
  },
  composeEnhancers(applyMiddleware())
);
