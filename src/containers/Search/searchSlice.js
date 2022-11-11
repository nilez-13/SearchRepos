import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  repos: {
    items: [],
  },
  status: "idle",
  loading: false,
  term: "",
};

export const loadRepos = createAsyncThunk(
  "search/fetchRepos",
  async (value) => {
    const { term } = value;
    const url = `https://api.github.com/search/repositories?q=${term}+in:name`;
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
    setTerm: (state, action) => {
      state.term = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadRepos.pending, (state, action) => {
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

export const { clearSearch, setTerm } = searchSlice.actions;

export const selectData = (state) => state.search.repos.items;
export const selectRepos = (state) => state.search.repos;
export const selectStaus = (state) => state.search.status;
export const selectLoading = (state) => state.search.loading;
export const selectTerm = (state) => state.search.term;

export default searchSlice.reducer;
