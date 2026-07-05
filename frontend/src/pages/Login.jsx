import { useFileHandler, useInputValidation } from "6pp";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { server } from "../constants/config";
import { userExists } from "../redux/reducers/auth";
import { usernameValidator } from "../utils/validators";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");

  const avatar = useFileHandler("single");

  const dispatch = useDispatch();

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      bgcolor: "#1E293B",
      color: "#F8FAFC",
      borderRadius: "14px",
      "& fieldset": { borderColor: "#334155" },
      "&:hover fieldset": { borderColor: "#6366F1" },
      "&.Mui-focused fieldset": { borderColor: "#6366F1" },
    },
    "& .MuiInputLabel-root": {
      color: "#94A3B8",
    },
    "& input": {
      fontSize: { xs: "0.95rem", sm: "1rem" },
      padding: { xs: "14px", sm: "16px" },
    },
    "& textarea": {
      fontSize: { xs: "0.95rem", sm: "1rem" },
    },
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging In...");
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        { username: username.value, password: password.value },
        { withCredentials: true }
      );

      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // 🌟 Improvement 3: Validate avatar existence before making API call
    if (!avatar.file) {
      return toast.error("Profile picture required");
    }

    const toastId = toast.loading("Signing Up...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg,#020617,#0F172A)",
        width: "100%",
        minHeight: "100dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: { xs: 180, sm: 240, md: 300 },
          height: { xs: 180, sm: 240, md: 300 },
          borderRadius: "50%",
          background: "rgba(99,102,241,.15)",
          filter: "blur(100px)",
          top: { xs: -60, md: -100 },
          left: { xs: -60, md: -100 },
        }}
      />
      
      <Box
        sx={{
          position: "absolute",
          width: { xs: 150, sm: 200, md: 250 },
          height: { xs: 150, sm: 200, md: 250 },
          borderRadius: "50%",
          background: "rgba(139,92,246,.15)",
          filter: "blur(100px)",
          bottom: { xs: -50, md: -80 },
          right: { xs: -50, md: -80 },
        }}
      />

      <Container maxWidth="sm" sx={{ zIndex: 2 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 3.5, md: 4 },
            width: "100%",
            maxWidth: { xs: "100%", sm: "450px", md: "500px" },
            mx: "auto",
            borderRadius: { xs: 4, md: 5 },
            background: "rgba(15,23,42,.85)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,.08)",
            boxShadow: "0 20px 50px rgba(0,0,0,.4)",
            color: "#F8FAFC",
          }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
              mb: 1,
            }}
          >
            🤖 Gokul AI
          </Typography>

          <Typography sx={{ textAlign: "center", color: "#94A3B8", mb: 3 }}>
            Secure AI Messaging Platform
          </Typography>

          {isLogin ? (
            <>
              <Typography variant="h5" textAlign="center" mb={2}>
                Login
              </Typography>

              <form onSubmit={handleLogin}>
                <TextField
                  fullWidth
                  label="Username"
                  sx={inputSx}
                  margin="normal"
                  value={username.value}
                  onChange={username.changeHandler}
                />

                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  sx={inputSx}
                  margin="normal"
                  value={password.value}
                  onChange={password.changeHandler}
                />

                <Button
                  fullWidth
                  type="submit"
                  disabled={isLoading}
                  sx={{
                    mt: 2,
                    py: { xs: 1.2, sm: 1.4, md: 1.5 },
                    fontSize: { xs: ".95rem", sm: "1rem" },
                    transition: "0.25s",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
                    fontWeight: 700,
                    color: "white",
                    boxShadow: "0 10px 25px rgba(99,102,241,.4)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 12px 30px rgba(99,102,241,.45)",
                    },
                  }}
                >
                  Login
                </Button>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: 2 }}>
                  <Box sx={{ flex: 1, height: 1, bgcolor: "#334155" }} />
                  <Typography sx={{ color: "#94A3B8", fontSize: { xs: ".85rem", sm: ".95rem", md: "1rem" } }}>
                    OR
                  </Typography>
                  <Box sx={{ flex: 1, height: 1, bgcolor: "#334155" }} />
                </Box>

                <Button
                  fullWidth
                  variant="outlined"
                  onClick={toggleLogin}
                  disabled={isLoading}
                  sx={{
                    borderRadius: "14px",
                    borderColor: "#334155",
                    color: "#F8FAFC",
                  }}
                >
                  Sign Up Instead
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5" textAlign="center" mb={2}>
                Sign Up
              </Typography>

              <form onSubmit={handleSignUp}>
                <Stack position="relative" sx={{ width: { xs: "8rem", sm: "9rem", md: "10rem" }, margin: "auto" }}>
                  <Avatar
                    src={avatar.preview}
                    sx={{
                      width: { xs: 100, sm: 120, md: 130 },
                      height: { xs: 100, sm: 120, md: 130 },
                      border: "4px solid #6366F1",
                      boxShadow: "0 0 30px rgba(99,102,241,.4)",
                    }}
                  >
                    👤
                  </Avatar>

                  <IconButton
                    component="label"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      bgcolor: "#6366F1",
                      color: "white",
                      "&:hover": { bgcolor: "#4F46E5" },
                    }}
                  >
                    <CameraAltIcon />
                    <VisuallyHiddenInput type="file" onChange={avatar.changeHandler} />
                  </IconButton>
                </Stack>

                {avatar.error && (
                  <Typography color="error" textAlign="center" mt={1}>
                    {avatar.error}
                  </Typography>
                )}

                <TextField
                  fullWidth
                  label="Name"
                  sx={inputSx}
                  margin="normal"
                  value={name.value}
                  onChange={name.changeHandler}
                />

                <TextField
                  fullWidth
                  label="Bio"
                  sx={inputSx}
                  margin="normal"
                  value={bio.value}
                  onChange={bio.changeHandler}
                />

                <TextField
                  fullWidth
                  label="Username"
                  sx={inputSx}
                  margin="normal"
                  value={username.value}
                  onChange={username.changeHandler}
                />

                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  sx={inputSx}
                  margin="normal"
                  value={password.value}
                  onChange={password.changeHandler}
                />

                <Button
                  fullWidth
                  type="submit"
                  disabled={isLoading}
                  sx={{
                    mt: 2,
                    py: { xs: 1.2, sm: 1.4, md: 1.5 },
                    fontSize: { xs: ".95rem", sm: "1rem" },
                    transition: "0.25s",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
                    fontWeight: 700,
                    color: "white",
                    boxShadow: "0 10px 25px rgba(99,102,241,.4)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 12px 30px rgba(99,102,241,.45)",
                    },
                  }}
                >
                  Sign Up
                </Button>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: 2 }}>
                  <Box sx={{ flex: 1, height: 1, bgcolor: "#334155" }} />
                  <Typography sx={{ color: "#94A3B8", fontSize: { xs: ".85rem", sm: ".95rem", md: "1rem" } }}>
                    OR
                  </Typography>
                  <Box sx={{ flex: 1, height: 1, bgcolor: "#334155" }} />
                </Box>

                <Button
                  fullWidth
                  variant="outlined"
                  onClick={toggleLogin}
                  disabled={isLoading}
                  sx={{
                    borderRadius: "14px",
                    borderColor: "#334155",
                    color: "#F8FAFC",
                  }}
                >
                  Login Instead
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;