import { Box, Grid, Rating, Typography } from '@mui/material';
import React from 'react'
import AlarmIcon from "@mui/icons-material/Alarm";
import CourseStructure from './CourseStructure/CourseStructure';
import { useDispatch, useSelector } from 'react-redux';
const LeftSingle = () => {

    const { singleCourse } = useSelector((state) => state.CoursesSlice);
    const dispatch = useDispatch();

  return (
    <>
      <Box>
        <Box className="left-head d-flex flex-column gap-2">
          <Box>
            <Typography className="fs-40 mt-3 fw-semibold" variant="p">
              {singleCourse.title}
            </Typography>
          </Box>
          <Box>
            <Typography className="fs-15 mt-3" variant="p">
              {singleCourse.description}
            </Typography>
          </Box>
          {/* Rating Component */}
          <Box className="d-flex align-items-center gap-2">
            <Typography className="fs-13 fw-medium" variant="span">
              {singleCourse?.rating}
            </Typography>
            <Rating
              className="text-red"
              size="small"
              name="half-rating-read"
              defaultValue={singleCourse?.rating}
              precision={0.5}
              readOnly
            />
            <Typography className="fs-13 text-blue" variant="span">
              {singleCourse?.reviews?.length}
            </Typography>
          </Box>
          <Box className="d-flex align-items-center gap-1">
            <Typography className="fs-13 ">Course By</Typography>
            <Typography className="fs-13 text-blue" variant="span">
              {"(James Bond)"}
            </Typography>
          </Box>
          {/* Course Structure Component */}
          <Box className="mt-4">
            <CourseStructure />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default LeftSingle
