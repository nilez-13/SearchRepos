import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import searchReducer from "../containers/Search/searchSlice";
import detailReducer from "../containers/Detail/detailSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    search: searchReducer,
    detail: detailReducer,
  },
});
