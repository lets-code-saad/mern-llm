import {
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
  CardMedia,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import "./Signup.css"
import { toast, ToastContainer } from "react-toastify";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false)
  const [originalPassword, setOriginalPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    await new Promise ((resolve)=> setTimeout(resolve,2000))
      console.log(data);
     toast.success("Signed Up Successfully!");
      reset(); //just resets the form values , not states
      setOriginalPassword("");
      setConfirmPassword("");
    setLoading(false);
   
    // if we have to navigate, we have to make the navigate function wait
//     setTimeout(() => {
//   navigate("/signin")
// },2500)

  };

  return (
    <Box className="container">
      <ToastContainer position="top-center" />
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        minHeight="100vh"
      >
        <Grid item size={{ xs: 12, sm: 12, lg: 6, xl: 6 }}>
          <CardMedia
            className="signup_side_img img-fluid"
            component="img"
            image="/imgs/signup page.jpg"
          />
        </Grid>
        <Grid item size={{ xs: 12, sm: 12, lg: 5, xl: 6 }}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Welcome to Edemy!
            </Typography>

            {/* Toggle Button (Login/Register) */}
            <Box
              sx={{
                bgcolor: "#B6E2E1",
                display: "flex",
                borderRadius: "50px",
                p: "5px",
                justifyContent: "space-between",
                width: "250px",
                mx: "auto",
                mb: 2,
              }}
            >
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "activeAuth bg-none text-decoration-none"
                    : "text-decoration-none"
                }
                to="/signin"
              >
                <Button
                  sx={{
                    borderRadius: "50px",
                    textTransform: "none",
                    width: "50%",
                    color: "white!important",
                  }}
                >
                  Login
                </Button>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "activeAuth bg-none text-decoration-none"
                    : "text-decoration-none"
                }
                to="/signup"
              >
                <Button
                  sx={{
                    borderRadius: "50px",
                    textTransform: "none",
                    width: "50%",
                    color: "white!important",
                  }}
                >
                  Register
                </Button>
              </NavLink>
            </Box>
          </Box>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              {/* email */}
              <Box>
                <Typography variant="subtitle2" mb={1}>
                  User name
                </Typography>
                <Controller
                  name="username"
                  rules={{
                    required: "Username is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_]{3,20}$/,
                      message:
                        "Username must contain letter, numbers and underscores",
                    },
                  }}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={errors.username}
                      placeholder="Enter your User name"
                      variant="outlined"
                      fullWidth
                      sx={{
                        mb: 2,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px",
                          height: "45px",
                          bgcolor: "#fff",
                        },
                      }}
                    />
                  )}
                />
                {errors.username && (
                  <Typography
                    sx={{ marginTop: "-10px" }}
                    className="text-danger"
                  >
                    {errors.username.message}
                  </Typography>
                )}
              </Box>

              {/* email */}
              <Box>
                <Typography variant="subtitle2" mb={1}>
                  Email
                </Typography>
                <Controller
                  name="email"
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter a valid email address",
                    },
                  }}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={errors.email}
                      placeholder="Enter your email"
                      variant="outlined"
                      fullWidth
                      sx={{
                        mb: 2,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px",
                          height: "45px",
                          bgcolor: "#fff",
                        },
                      }}
                    />
                  )}
                />
                {errors.email && (
                  <Typography
                    sx={{ marginTop: "-10px" }}
                    className="text-danger"
                  >
                    {errors.email.message}
                  </Typography>
                )}
              </Box>

              {/* password */}
              <Box>
                <Typography variant="subtitle2" mb={1}>
                  Password
                </Typography>
                <Controller
                  name="password"
                  rules={{
                    required: "Password is required",
                    pattern: {
                      value: /^.{6,}$/,
                      message: "Password must be at least 6 characters",
                    },
                  }}
                  control={control}
                  render={({ field }) => (
                    <OutlinedInput
                      {...field} // first the component should be controlled before performing onChange
                      onChange={(e) => {
                        field.onChange(e); //update hook-form value
                        setOriginalPassword(e.target.value); // update just state value
                      }}
                      error={errors.password}
                      placeholder="Enter your Password"
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((prev) => !prev)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      sx={{
                        mb: 2,
                        borderRadius: "10px",
                        height: "45px",
                        bgcolor: "#fff",
                      }}
                    />
                  )}
                />
                {errors.password && (
                  <Typography
                    sx={{ marginTop: "-10px" }}
                    className="text-danger"
                  >
                    {errors.password.message}
                  </Typography>
                )}
              </Box>

              {/* confirm password */}
              <Box>
                <Typography variant="subtitle2" mb={1}>
                  Confirm Password
                </Typography>
                <Controller
                  name="confirmPassword"
                  rules={{
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === originalPassword || "Passwords do not match",
                  }}
                  control={control}
                  render={({ field }) => (
                    <OutlinedInput
                      {...field}
                      onChange={(e) => {
                        field.onChange(e); // update react-hook-form value
                        setConfirmPassword(e.target.value); //update just state value
                      }}
                      error={errors.confirmPassword}
                      placeholder="Enter your Password"
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPass((prev) => !prev)}
                            edge="end"
                          >
                            {showConfirmPass ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      sx={{
                        mb: 2,
                        borderRadius: "10px",
                        height: "45px",
                        bgcolor: "#fff",
                      }}
                    />
                  )}
                />
              </Box>
              {errors.confirmPassword ? (
                <Typography sx={{ color: "red", mt: -1 }}>
                  {errors.confirmPassword.message}
                </Typography>
              ) : null}

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
              >
                <FormControlLabel control={<Checkbox />} label="Remember me" />
                <Typography variant="body2" sx={{ cursor: "pointer" }}>
                  Forgot Password ?
                </Typography>
              </Box>

              <Box className="text-end">
                <Button
                  disabled={loading}
                  type="submit"
                  className=""
                  variant="contained"
                  sx={{
                    bgcolor: "#49BBBD",
                    borderRadius: "50px",
                    textTransform: "none",
                    py: 1.5,
                    width: "50%",
                    fontSize: "1rem",
                    "&:hover": {
                      bgcolor: "#3AA9AB",
                    },
                  }}
                >
                  {loading ? <div className="spinner-button"></div> : "Signup"}
                </Button>
              </Box>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Signup;
