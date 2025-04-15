import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchCourses = createAsyncThunk("courses/fetchCourses", async () => {
  try {
    const res = await axios.get("https://dummyjson.com/products");
    return res?.data?.products;
  } catch (error) {
    throw error; // this will make rejected case work properly
  }
});

export default fetchCourses;
