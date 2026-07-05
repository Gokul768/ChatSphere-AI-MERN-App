import React from "react";
import {
  Avatar,
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
  Info as BioIcon,
} from "@mui/icons-material";

import moment from "moment";

const Profile = ({ user }) => {
  return (
    // ✅ 1, 13, 14. Responsive Main Scrollable Grid Container Frame with Safe Area Padding Buffer
    <Stack
      spacing={{ xs: 2, md: 3 }}
      alignItems="center"
      sx={{
        height: "100%",
        width: "100%",
        overflowY: "auto",
        scrollBehavior: "smooth",
        p: {
          xs: 2,
          sm: 3,
          md: 4,
          lg: 5,
        },
        pb: {
          xs: 10, // Extra space on mobile to breathe above navigation elements
          sm: 3,
        },
        color: "#F8FAFC",
        "&::-webkit-scrollbar": {
          width: 6,
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#334155",
          borderRadius: 20,
        },
      }}
    >
      {/* ✅ 2, 12. Glassmorphic Outer Card with Max-Width Desktop Boundaries and Fluid Scale Animation */}
      <Box
        sx={{
          width: "100%",
          maxWidth: {
            xs: "100%",
            sm: 500,
            md: 550,
            lg: 650,
          },
          p: {
            xs: 2,
            sm: 3,
            md: 4,
          },
          borderRadius: {
            xs: 3,
            md: 5,
          },
          background:
            "linear-gradient(180deg,rgba(15,23,42,.95),rgba(15,23,42,.88))",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(99,102,241,.18)",
          boxShadow: "0 25px 60px rgba(0,0,0,.35)",
          textAlign: "center",
          transition: "all .35s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 30px 50px rgba(99,102,241,.18)",
          },
        }}
      >
        {/* ✅ 3. Aspect Ratio-Responsive Circular Profile Avatar Frame */}
        <Avatar
          src={user?.avatar?.url}
          alt={user?.name}
          sx={{
            width: {
              xs: 100,
              sm: 120,
              md: 140,
              lg: 160,
            },
            height: {
              xs: 100,
              sm: 120,
              md: 140,
              lg: 160,
            },
            mx: "auto",
            mb: 2,
            border: "4px solid #6366F1",
            boxShadow: "0 0 30px rgba(99,102,241,.45)",
            transition: ".3s",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 0 40px rgba(99,102,241,.7)",
            },
          }}
        >
          {user?.name?.charAt(0)}
        </Avatar>

        {/* ✅ 4. Fluid Typography Core Structural Header Tag */}
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: {
              xs: "1.3rem",
              sm: "1.6rem",
              md: "2rem",
            },
          }}
        >
          {user?.name}
        </Typography>

        {/* ✅ 5. Safe Text Breakdown Module Wrapper */}
        <Typography
          sx={{
            color: "#94A3B8",
            mt: 0.5,
            fontSize: {
              xs: 13,
              sm: 15,
              md: 16,
            },
            wordBreak: "break-word",
          }}
        >
          @{user?.username}
        </Typography>

        {/* ✅ 11. Clean Balanced Device Presence Status Indicator Pill */}
        <Box
          sx={{
            mt: 1,
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            px: {
              xs: 1.2,
              md: 2,
            },
            py: {
              xs: 0.4,
              md: 0.6,
            },
            borderRadius: "999px",
            bgcolor: "rgba(34,197,94,.15)",
            border: "1px solid rgba(34,197,94,.35)",
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: "#22C55E",
            }}
          />

          <Typography
            sx={{
              color: "#22C55E",
              fontWeight: 600,
              fontSize: {
                xs: 11,
                md: 13,
              },
            }}
          >
            Online
          </Typography>
        </Box>

        <Divider
          sx={{
            my: 3,
            borderColor: "#1E293B",
          }}
        />

        {/* ✅ 6. Multi-Orientation Mobile Collapsible Column Statistics Track */}
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={{
            xs: 2,
            sm: 0,
          }}
          justifyContent="space-around"
          alignItems="center"
          sx={{
            mb: 4,
          }}
        >
          <Box textAlign="center">
            <Typography
              variant="h6"
              fontWeight={700}
              color="#6366F1"
            >
              {user?.totalMessages || 0}
            </Typography>

            <Typography
              variant="caption"
              color="#94A3B8"
            >
              Messages
            </Typography>
          </Box>

          <Box textAlign="center">
            <Typography
              variant="h6"
              fontWeight={700}
              color="#8B5CF6"
            >
              {user?.groupsCount || 0}
            </Typography>

            <Typography
              variant="caption"
              color="#94A3B8"
            >
              Groups
            </Typography>
          </Box>
        </Stack>

        {/* Profile Details List Wrapper */}
        <Stack spacing={2}>
          <ProfileCard
            heading="Bio"
            text={user?.bio || "No bio available"}
            Icon={<BioIcon sx={{ fontSize: "inherit" }} />}
          />

          <ProfileCard
            heading="Username"
            text={user?.username}
            Icon={<UserNameIcon sx={{ fontSize: "inherit" }} />}
          />

          <ProfileCard
            heading="Name"
            text={user?.name}
            Icon={<FaceIcon sx={{ fontSize: "inherit" }} />}
          />

          <ProfileCard
            heading="Joined"
            text={moment(user?.createdAt).format("DD MMM YYYY")}
            Icon={<CalendarIcon sx={{ fontSize: "inherit" }} />}
          />
        </Stack>
      </Box>
    </Stack>
  );
};

// Internal Module Sub-Card Component
const ProfileCard = ({ text, Icon, heading }) => (
  // ✅ 7. Premium Adaptive Layout Grid Item Box with Translation Transforms
  <Box
    sx={{
      p: {
        xs: 1.5,
        sm: 2,
        md: 2.3,
      },
      borderRadius: {
        xs: 3,
        md: 4,
      },
      bgcolor: "#1E293B",
      border: "1px solid transparent",
      transition: "0.3s",
      cursor: "pointer",
      "&&:hover": {
        bgcolor: "#273449",
        transform: "translateY(-3px) scale(1.02)",
        border: "1px solid rgba(99,102,241,.3)",
        boxShadow: "0 15px 30px rgba(99,102,241,.15)",
      },
    }}
  >
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
    >
      {/* ✅ 8. Uniform Fixed-Aspect Responsive Icon Housing Grid */}
      <Box
        sx={{
          color: "#6366F1",
          fontSize: {
            xs: 22,
            md: 28,
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 40,
        }}
      >
        {Icon}
      </Box>

      <Stack
        spacing={0.3}
        alignItems="flex-start"
      >
        {/* ✅ 9. Fluid Label Header Element Node */}
        <Typography
          sx={{
            color: "#94A3B8",
            fontSize: {
              xs: 11,
              sm: 12,
              md: 13,
            },
            fontWeight: 600,
          }}
        >
          {heading}
        </Typography>

        {/* ✅ 10. Protective Word-Break Frame Layout and Text Balancing Controls */}
        <Typography
          sx={{
            color: "#F8FAFC",
            fontWeight: 600,
            fontSize: {
              xs: 14,
              sm: 15,
              md: 16,
            },
            textAlign: "left",
            wordBreak: "break-word",
            overflowWrap: "anywhere",
            lineHeight: 1.6,
          }}
        >
          {text}
        </Typography>
      </Stack>
    </Stack>
  </Box>
);

export default Profile;