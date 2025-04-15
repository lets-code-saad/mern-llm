import React, { useEffect, useState } from "react";
import Navbar from "../../../Header/Navbar/Navbar";
import axios from "axios";
import { Box, Grid } from "@mui/material";
import LeftSingle from "./LeftSingle/LeftSingle";
import RightSingle from "./RightSingle/RightSingle";
import "./CssSinglePage/SingleCourse.css"
import Footer from "../../../Footer/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSingleCourse } from "../../../Store/Slices/CoursesSlice";

const SingleCourse = () => {
  // restructuring product_id from params
  const { product_id } = useParams()

  // storing single product object
  const { singleCourse } = useSelector((state) => state.CoursesSlice) 
  const dispatch = useDispatch()
  useEffect(() => {
    const apiCall = async () => {
      const res = await axios.get(`https://dummyjson.com/products/${product_id}`);
     dispatch(setSingleCourse(res?.data))

    }
    apiCall();
  },[]);

  return (
    <>
      <Box>
        {/* Displaying navbar */}
        <Box
          sx={{ background: "linear-gradient(to bottom, #E6FFFF, #FFFFFF)" }}
        >
          <Navbar />
        </Box>
        {/* signle page */}
        {/* displaying single course page left side */}
        <Box className="singlePage_lg container pt-5">
          <Grid container spacing={4} justifyContent={"space-between"}>
            <Grid item size={{ xs: 12, sm: 12, lg: 8, xl: 6 }}>
              <LeftSingle />
            </Grid>
            <Grid item size={{ xs: 12, sm: 12, lg: 4, xl: 6 }}>
              <RightSingle />
            </Grid>
          </Grid>
        </Box>

        {/* Mobile Screen Single Page */}
        <Box className="singlePage_sm container pt-5">
          <Grid container spacing={4} flexDirection={"column-reverse"} justifyContent={"space-between"}>
            <Grid item size={{ xs: 12, sm: 12, lg: 8, xl: 6 }}>
              <LeftSingle />
            </Grid>
            <Grid item size={{ xs: 12, sm: 12, lg: 4, xl: 6 }}>
              <RightSingle />
            </Grid>
          </Grid>
              </Box>
              
              {/* Displaying footer */}
              <Footer/>
      </Box>
    </>
  );
};

export default SingleCourse;
