import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  repos: {
    items: [],
  },
  status: "idle",
  loading: false,
  value: 0,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const loadRepos = createAsyncThunk(
  "search/fetchRepos",
  async (value) => {
    const url = `https://api.github.com/search/repositories?q=${value}+in:name&sort=stars&order=desc`;
    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return;
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    clearSearch: (state) => {
      state.repos = { items: [] };
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadRepos.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(loadRepos.fulfilled, (state, action) => {
        state.status = action.payload.items.length > 0 ? "found" : "notfound";
        state.loading = false;
        state.repos = action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount, clearSearch } =
  searchSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectData = (state) => state.search.repos.items;
export const selectRepos = (state) => state.search.repos;
export const selectStaus = (state) => state.search.status;
export const selectLoading = (state) => state.search.loading;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default searchSlice.reducer;
