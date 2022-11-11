import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  status: "idle",
  loading: false,
};

export const loadDetail = createAsyncThunk("detail/getRepo", async (value) => {
  const { user, repo } = value;
  const url = `https://api.github.com/repos/${user}/${repo}`;
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
});

export const detailSlice = createSlice({
  name: "detail",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    clearDetail: (state) => {
      state.data = {};
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadDetail.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(loadDetail.fulfilled, (state, action) => {
        state.status = "found";
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loadDetail.rejected, (state) => {
        state.status = "failed";
        state.loading = false;
      });
  },
});

export const { clearDetail } = detailSlice.actions;

export const selectData = (state) => state.detail.data;
export const selectStaus = (state) => state.detail.status;
export const selectLoading = (state) => state.detail.loading;

export default detailSlice.reducer;
