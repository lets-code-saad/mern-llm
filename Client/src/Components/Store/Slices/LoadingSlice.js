import { createSlice } from "@reduxjs/toolkit";

const LoadingSlice = createSlice({
  name: "Loading",
  initialState: {
   loading:false
  },
  reducers: {
    setLoading: (state, action) => {
      state.courses = action.payload;
    }
  },
});

export const {  } = LoadingSlice.actions;
export default LoadingSlice.reducer;
