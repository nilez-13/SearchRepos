import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../containers/Search/searchSlice";
import detailReducer from "../containers/Detail/detailSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    detail: detailReducer,
  },
});
