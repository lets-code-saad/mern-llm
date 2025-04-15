import { configureStore } from "@reduxjs/toolkit";
import CoursesSlice from "./Slices/CoursesSlice";
import LoadingSlice from "./Slices/LoadingSlice"
import GetCourses from "./Slices/GetCourses"

const store = configureStore({
  reducer: {
    CoursesSlice: CoursesSlice,
    LoadingSlice: LoadingSlice,
    GetCourses: GetCourses
  },
});

export default store
