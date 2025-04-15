import React, { useEffect, useState } from "react";
import "./AllCourses.css";
import Navbar from "../../../Header/Navbar/Navbar";
import {
  Box,
  Button,
  CardMedia,
  Grid,
  Rating,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Footer from "../../../Footer/Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../../../Store/Slices/CoursesSlice";
import fetchCourses from "../../../Store/Thunks/coursesThunk";
import SkeletonForAllCards from "../../../SkeletonLoading/SkeletonForAllCards";
import SkeletonForLoading from "../../../SkeletonLoading/SkeletonForAllCards";

const AllCourses = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  // const { courses } = useSelector((state) => state.CoursesSlice)
  const { courses } = useSelector((state) => state.GetCourses);
  const [filteredItems, setFilteredItems] = useState([]);

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  // fetch data on mount
  useEffect(() => {
    setPageLoading(true);
    setTimeout(() => {
      dispatch(fetchCourses());
      setPageLoading(false);
    }, 1000);
  }, [dispatch]);

  // When courses are updated from Redux, reflect that in filteredItems
  useEffect(() => {
    setFilteredItems(courses);
  }, [courses]);

  // reset the filter when search input is cleared
  useEffect(() => {
    if (searchTerm === "") {
      // show all cards when there is not search term
      setFilteredItems(courses);
    }
  }, [searchTerm, courses]);

  // Search filter handler
  const searchFilterer = () => {
    const searched = courses.filter((value) =>
      value.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(searched);
  };

  // load more functionality
  const [visibleCourses, setvisibleCourses] = useState(8);

  // load more buton
  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setvisibleCourses((prev) => prev + visibleCourses);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      {/* navbar */}
      <Navbar />
      <Box sx={{ marginTop: "40px" }} className="courses container">
        {/* cards head & search */}
        <Box className="d-flex flex-wrap align-items-center justify-content-between">
          <Box>
            <Box>
              <Typography className="fs-30 mt-3 fw-semibold" variant="p">
                Courses List
              </Typography>
            </Box>
            <Box
              className="fs-15 d-flex align-items-center gap-2"
              sx={{ marginTop: "-5px" }}
            >
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive
                    ? "active text-decoration-none"
                    : "text-decoration-none"
                }
              >
                <Typography className="" variant="p">
                  Home
                </Typography>
              </NavLink>

              <Typography>/</Typography>

              <Typography>Courses List</Typography>
            </Box>
          </Box>
          {/* Search box */}
          <Box
            sx={{
              display: "flex",
              mt: 3,
            }}
          >
            <TextField
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              fullWidth
              placeholder="Search any courses"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "1px solid #6B728033",
                  },
                  "&:hover fieldset": {
                    border: "1px solid #6B728033",
                  },
                  "&.Mui-focused fieldset": {
                    border: "1px solid #6B728033",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ color: "action.active", mr: 1 }} />
                ),
                sx: {
                  height: 40,
                  marginRight: "170px",
                  borderRadius: "5px 0 0 5px",
                },
              }}
            />
            <Button
              onClick={searchFilterer}
              variant="contained"
              sx={{
                height: 40,
                paddingX: "50px",
                whiteSpace: "nowrap",
                borderRadius: "0 5px 5px 0",
                fontSize: "15px",
                textTransform: "capitalize",
                backgroundColor: "#2563EB",
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                },

                // On focus: no outline, no border glow
                "&:focus": {
                  outline: "none",
                  boxShadow: "none",
                },

                // On active (click/press): no visual push effect
                "&:active": {
                  boxShadow: "none",
                },
              }}
            >
              Search
            </Button>
          </Box>
        </Box>
        {/* all courses cards */}
        <Box sx={{ marginTop: "40px" }} className="courseCards">
          <Grid container spacing={2}>
            {pageLoading ? (
              <SkeletonForLoading />
            ) : (
              filteredItems?.slice(0, visibleCourses).map((items) => {
                return (
                  <Grid
                    key={items.id}
                    sx={{ borderRadius: "8px" }}
                    className="border bg-white"
                    item
                    size={{ xs: 12, sm: 6, lg: 3, xl: 2 }}
                  >
                    <Link
                      className="text-decoration-none text-black"
                      to={`/single-course/${items.id}`}
                    >
                      {loading && filteredItems.length === 0 ? (
                        <SkeletonForAllCards />
                      ) : (
                        <Box>
                          <CardMedia
                            sx={{ overflow: "hidden" }}
                            className="img-fluid"
                            component="img"
                            image={items.images}
                            alt="Paella dish"
                          />
                          <Box className="d-flex flex-column gap-1 px-2 py-1">
                            <Typography className="fw-bold fs-15" variant="h6">
                              {items.title}
                            </Typography>
                            <Typography
                              className="fs-13 text-span-2"
                              variant="span"
                            >
                              {items.brand}
                            </Typography>
                            {/* Rating Component */}
                            <Box className="d-flex align-items-center gap-2">
                              <Typography
                                className="fs-13 fw-medium"
                                variant="span"
                              >
                                {items.rating}
                              </Typography>
                              <Rating
                                className="text-red"
                                size="small"
                                name="half-rating-read"
                                defaultValue={2.5}
                                precision={0.5}
                                readOnly
                              />
                              <Typography
                                className="fs-13 text-span"
                                variant="span"
                              >
                                {items.noOfRatings}
                              </Typography>
                            </Box>
                            <Typography className="fs-16 fw-bold" variant="h6">
                              {items.price}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Link>
                  </Grid>
                );
              })
            )}
          </Grid>
          <Box className="text-center mt-5">
            {/* Show button only if there are more courses */}
            {visibleCourses < filteredItems.length && (
              <Button
                onClick={handleLoadMore}
                disabled={loading}
                variant="contained"
                sx={{
                  height: 40,
                  paddingX: "30px",
                  whiteSpace: "nowrap",
                  border: "1px solid #8A8C8F",
                  borderRadius: "5px",
                  fontSize: "15px",
                  textTransform: "unset",
                  background: "none",
                  boxShadow: "none",
                  color: "#8A8C8F",
                  "&:hover": {
                    boxShadow: "none",
                  },

                  // On focus: no outline, no border glow
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                  },

                  // On active (click/press): no visual push effect
                  "&:active": {
                    boxShadow: "none",
                  },
                }}
              >
                {loading ? <div className="spinner-button"></div> : "Load more"}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      {/* footer */}
      <Footer />
    </>
  );
};

export default AllCourses;
