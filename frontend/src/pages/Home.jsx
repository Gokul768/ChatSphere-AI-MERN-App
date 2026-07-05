import React from "react";
import AppLayout from "../components/layout/AppLayout";
import {
  Box,
  Stack,
  Typography,
} from "@mui/material";
import {
  ChatBubbleOutline,
  SmartToy,
} from "@mui/icons-material";

const Home = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100dvh",
        minHeight: "100dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(180deg,#020617,#0F172A)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow Effect 1 */}
      <Box
        sx={{
          position: "absolute",
          width: {
            xs: 180,
            sm: 250,
            md: 350,
          },
          height: {
            xs: 180,
            sm: 250,
            md: 350,
          },
          borderRadius: "50%",
          background: "rgba(99,102,241,.15)",
          filter: {
            xs: "blur(80px)",
            md: "blur(120px)",
          },
          top: {
            xs: -60,
            md: -120,
          },
          left: {
            xs: -60,
            md: -120,
          },
        }}
      />

      {/* Glow Effect 2 */}
      <Box
        sx={{
          position: "absolute",
          width: {
            xs: 180,
            sm: 220,
            md: 300,
          },
          height: {
            xs: 180,
            sm: 220,
            md: 300,
          },
          borderRadius: "50%",
          background: "rgba(139,92,246,.15)",
          filter: {
            xs: "blur(80px)",
            md: "blur(120px)",
          },
          bottom: {
            xs: -60,
            md: -100,
          },
          right: {
            xs: -60,
            md: -100,
          },
        }}
      />

      {/* Main Card */}
      <Stack
        spacing={3}
        alignItems="center"
        textAlign="center"
        sx={{
          zIndex: 2,
          width: {
            xs: "95%",
            sm: "90%",
            md: "80%",
            lg: "60%",
          },
          maxWidth: 700,
          p: {
            xs: 3,
            sm: 4,
            md: 5,
          },
          borderRadius: {
            xs: 4,
            md: 6,
          },
          background: "rgba(15,23,42,.75)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,.08)",
          boxShadow: "0 10px 40px rgba(0,0,0,.35)",
        }}
      >
        {/* Icon Area */}
        <Box
          sx={{
            width: {
              xs: 70,
              sm: 80,
              md: 90,
            },
            height: {
              xs: 70,
              sm: 80,
              md: 90,
            },
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
            boxShadow: "0 0 30px rgba(99,102,241,.5)",
          }}
        >
          <SmartToy
            sx={{
              fontSize: {
                xs: 35,
                sm: 40,
                md: 45,
              },
              color: "#fff",
            }}
          />
        </Box>

        {/* Title */}
        <Typography
          sx={{
            fontWeight: 800,
            color: "#F8FAFC",
            fontSize: {
              xs: "1.6rem",
              sm: "2rem",
              md: "2.4rem",
            },
            textAlign: "center",
          }}
        >
          Welcome to Gokul Chat
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            color: "#94A3B8",
            fontSize: {
              xs: ".95rem",
              sm: "1rem",
              md: "1.1rem",
            },
            lineHeight: 1.8,
            maxWidth: 500,
            textAlign: "center",
          }}
        >
          Select a friend or group from the sidebar to start chatting instantly.
          Stay connected with real-time messaging, media sharing, and AI assistance.
        </Typography>

        {/* Hint */}
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            color: "#CBD5E1",
            textAlign: "center",
          }}
        >
          <ChatBubbleOutline />
          <Typography>
            Select a conversation to begin
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default AppLayout()(Home);