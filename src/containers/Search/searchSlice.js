import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  repos: {
    items: [],
  },
  status: "idle",
  loading: false,
};

export const loadRepos = createAsyncThunk(
  "search/fetchRepos",
  async (value) => {
    const { search } = value;
    const url = `https://api.github.com/search/repositories?q=${search}+in:name`;
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

export const filterRepos = createAsyncThunk(
  "search/filterRepos",
  async (value) => {
    const { search, sort, order } = value;
    const url = `https://api.github.com/search/repositories?q=${search}+in:name&sort=${sort}&order=${order}`;
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
      })
      .addCase(loadRepos.rejected, (state) => {
        state.status = "idle";
        state.loading = false;
      })

      .addCase(filterRepos.pending, (state) => {
        state.loading = true;
      })
      .addCase(filterRepos.fulfilled, (state, action) => {
        state.loading = false;
        state.repos = action.payload;
      })
      .addCase(filterRepos.rejected, (state) => {
        state.loading = false;
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