import { createSlice } from "@reduxjs/toolkit";

const ProductsSlice = createSlice({
  name: "Courses",
  initialState: {
    singleCourse: {},
  },
  reducers: {
    setSingleCourse: (state, action) => {
      state.singleCourse = action.payload;
    },
  },
});

export const { setSingleCourse } = ProductsSlice.actions;
export default ProductsSlice.reducer;
