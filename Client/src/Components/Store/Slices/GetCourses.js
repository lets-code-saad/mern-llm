import { createSlice } from "@reduxjs/toolkit";
import fetchCourses from "../Thunks/coursesThunk";

const GetCourses = createSlice({
  name: "GetCourses",
    initialState: {
      courses:[],
      loading: false,
      error:null
  },
  reducers: { 
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCourses.pending, (state,action) => {
                state.loading = true
                state.error = null
        })


            builder.addCase(fetchCourses.fulfilled, (state, action) => {
              state.courses = action.payload
              state.loading = false;
              state.error = null;
                
            })
        
            builder.addCase(fetchCourses.rejected, (state, action) => {
                state.loading =false
                state.error = action.payload
            })
    }
});

export const {  } = GetCourses.actions;
export default GetCourses.reducer;
