import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
} from "@mui/material";
import ManageLeft from "../../Left/ManageLeft";
import Navbar from "../../../../../Header/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import fetchCourses from "../../../../../Store/Thunks/coursesThunk";
import "./StudentsEnrolled.css";
import SkeletonForTable from "../../../../../SkeletonLoading/SkeletonForTable";

const StudentsEnrolled = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.GetCourses);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setPageLoading(true);
    setTimeout(() => {
      dispatch(fetchCourses());
      setPageLoading(false);
    }, 1500);
  }, []);

  console.log(courses, "courses");

  return (
    <div>
      <Navbar />
      <Box className="studentsEnrolledDiv d-flex container">
        <ManageLeft />

        <Box
          className="studentsEnrolledTable"
          sx={{ flex: 1, ml: 1, boxShadow: "none" }}
        >
          {pageLoading ? (
            <SkeletonForTable />
          ) : (
            <TableContainer
              className="border"
              sx={{ boxShadow: "none" }}
              component={Paper}
            >
              <Table aria-label="students enrolled table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "600", fontSize: "14px" }}>
                      #
                    </TableCell>
                    <TableCell sx={{ fontWeight: "600", fontSize: "14px" }}>
                      Student Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "600", fontSize: "14px" }}>
                      Course Title
                    </TableCell>
                    <TableCell sx={{ fontWeight: "600", fontSize: "14px" }}>
                      Date
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courses.map((student, index) => (
                    <TableRow key={student.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Avatar src={student.thumbnail} sx={{ mr: 1 }} />
                          <Typography>{student.category}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{student.title}</TableCell>
                      <TableCell>
                        {new Date(student.meta.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default StudentsEnrolled;
