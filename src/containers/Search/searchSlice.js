import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  repos: {
    items: [],
  },
  status: "idle",
  loading: false,
  term: "",
  sort: "stars",
  order: "desc",
  page: 1,
  size: 30,
};

export const loadRepos = createAsyncThunk(
  "search/fetchRepos",
  async (value, { rejectWithValue }) => {
    const { term } = value;
    const url = `https://api.github.com/search/repositories?q=${term}+in:name`;
    const options = {
      method: "GET",
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        return rejectWithValue("api error");
      }
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const filterRepos = createAsyncThunk(
  "search/filterRepos",
  async (value, { rejectWithValue }) => {
    const { search, sort, order, page, size } = value;
    const url = `https://api.github.com/search/repositories?q=${search}+in:name&sort=${sort}&order=${order}&page=${page}&per_page=${size}`;
    const options = {
      method: "GET",
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        return rejectWithValue("api error");
      }
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
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
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSize: (state, action) => {
      state.size = action.payload;
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
        state.repos = action.payload ? action.payload : { items: [] };
      })
      .addCase(loadRepos.rejected, (state) => {
        state.status = "failed";
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

export const { clearSearch, setTerm, setOrder, setPage, setSize, setSort } =
  searchSlice.actions;

export const selectData = (state) => state.search.repos.items;
export const selectRepos = (state) => state.search.repos;
export const selectStaus = (state) => state.search.status;
export const selectLoading = (state) => state.search.loading;
export const selectTerm = (state) => state.search.term;
export const selectSort = (state) => state.search.sort;
export const selectOrder = (state) => state.search.order;
export const selectPage = (state) => state.search.page;
export const selectSize = (state) => state.search.size;

export default searchSlice.reducer;
