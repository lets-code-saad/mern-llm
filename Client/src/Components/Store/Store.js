import { configureStore } from "@reduxjs/toolkit";
import CoursesSlice from "./Slices/CoursesSlice";
import GetCourses from "./Slices/GetCourses";
import SigninSlice from "./Slices/SigninSlice";
import SignupSlice from "./Slices/SignupSlice";
import GetProfileSlice from "./Slices/GetProfileSlice";

const store = configureStore({
  reducer: {
    CoursesSlice: CoursesSlice,
    GetCourses: GetCourses,
    SignupSlice: SignupSlice,
    SigninSlice: SigninSlice,
    GetProfileSlice: GetProfileSlice,
  },
});

export default store;
