import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const fetchCourses = createAsyncThunk("courses/fetchCourses", async () => {
  try {
    const res = await axios.get("https://dummyjson.com/products");
    return res?.data?.products;
  } catch (error) {
    toast.error("API FAILED")
    throw error; // this will make rejected case work properly
  }
});

export default fetchCourses;
