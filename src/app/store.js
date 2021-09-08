import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/reducers/authReducer";
import notesReducer from "../redux/reducers/notesReducer";
import uiReducer from "../redux/reducers/uiReducer";
import filtersReducer from "../redux/reducers/filtersReducer";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     notes: notesReducer,
//     ui: uiReducer,
//     filters: filtersReducer,
//   },
// });
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  notes: notesReducer,
  filters: filtersReducer,
  ui: uiReducer,
  auth: authReducer,
});
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
