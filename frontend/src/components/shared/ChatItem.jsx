import React, { memo } from "react";
import { Link } from "../styles/StyledComponents";
import { Box, Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";
import { motion } from "framer-motion";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  lastMessage,
  time = "",
  index = 0,
  handleDeleteChat,
}) => {
  return (
    // ✅ 1, 17. Link Container Optimization with Responsive Margins and Accessibility Controls
    <Link
      to={`/chat/${_id}`}
      aria-label={name}
      sx={{
        textDecoration: "none",
        display: "block",
        mx: {
          xs: 0.5,
          sm: 1,
          md: 1.2,
          lg: 1.5,
        },
        my: {
          xs: 0.4,
          sm: 0.6,
          md: 0.7,
        },
        borderRadius: 4,
        overflow: "hidden",
      }}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      {/* ✅ 2, 3, 4, 14, 15, 16, 18, 20. Motion Wrapper with Clamped Typography & Smooth Transitions */}
      <motion.div
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
        }}
        transition={{
          duration: 0.3,
          delay: index * 0.03,
          type: "spring",
          stiffness: 120,
        }}
        whileHover={{
          scale: 1.015,
          y: -2,
        }}
        whileTap={{
          scale: 0.98,
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(.6rem, 2vw, 1rem)",
          padding: "clamp(10px, 2vw, 16px)",
          borderRadius: "clamp(14px, 2vw, 20px)",
          cursor: "pointer",
          position: "relative",
          width: "100%",
          minWidth: 0,
          overflow: "hidden",
          touchAction: "manipulation",
          transition: "all .3s cubic-bezier(.4, 0, .2, 1)",

          background: sameSender
            ? "linear-gradient(135deg, #6366F1, #8B5CF6)"
            : "rgba(15, 23, 42, .72)",

          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",

          borderLeft: sameSender
            ? "4px solid #A5B4FC"
            : "4px solid transparent",

          border: sameSender
            ? "1px solid rgba(255, 255, 255, .15)"
            : "1px solid #1E293B",

          color: "#F8FAFC",

          boxShadow: sameSender
            ? "0 12px 30px rgba(99, 102, 241, .45)"
            : "0 8px 18px rgba(2, 6, 23, .18)",
        }}
      >
        {/* AVATAR BOX */}
        <Box
          sx={{
            position: "relative",
            transition: "all .3s ease",
            // ✅ 5. Refined Scaling Threshold on Hover
            "&:hover": {
              transform: "scale(1.05)",
              transition: "all .25s",
            },
          }}
        >
          <AvatarCard avatar={avatar} />

          {isOnline && (
            // ✅ 6. Micro-responsive Status Sizing Grid
            <Box
              sx={{
                width: {
                  xs: 8,
                  sm: 9,
                  md: 10,
                },
                height: {
                  xs: 8,
                  sm: 9,
                  md: 10,
                },
                borderRadius: "50%",
                bgcolor: "#22C55E",
                border: {
                  xs: "1.5px solid #1E293B",
                  md: "2px solid #1E293B",
                },
                position: "absolute",
                bottom: 0,
                right: 0,
                boxShadow: "0 0 12px rgba(34, 197, 94, .9)",

                "@keyframes onlinePulse": {
                  "0%": {
                    boxShadow: "0 0 0 0 rgba(34, 197, 94, .7)",
                  },
                  "70%": {
                    boxShadow: "0 0 0 8px rgba(34, 197, 94, 0)",
                  },
                  "100%": {
                    boxShadow: "0 0 0 0 rgba(34, 197, 94, 0)",
                  },
                },

                animation: "onlinePulse 2s infinite",
              }}
            />
          )}
        </Box>

        {/* CHAT INFO STACK */}
        <Stack
          spacing={{
            xs: 0.3,
            sm: 0.5,
          }}
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          {/* ✅ 13. Dynamic Context Multi-Row Alignment Block */}
          <Stack
            direction="row"
            flexWrap="nowrap"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* ✅ 8. Adaptive Mobile Scaling Typographic Text */}
            <Typography
              variant="body1"
              sx={{
                fontWeight: 700,
                fontSize: {
                  xs: ".88rem",
                  sm: ".95rem",
                  md: "1rem",
                  lg: "1.05rem",
                },
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: {
                  xs: "110px",
                  sm: "150px",
                  md: "170px",
                  lg: "220px",
                },
              }}
            >
              {groupChat ? "👥 " : ""}
              {name}
            </Typography>

            {/* ✅ 9. Secondary Viewport Time Node Filter */}
            <Typography
              sx={{
                fontSize: {
                  xs: ".65rem",
                  sm: ".7rem",
                  md: ".75rem",
                },
                color: "#94A3B8",
                fontWeight: 600,
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              {time}
            </Typography>
          </Stack>

          {/* ✅ 10. Adaptive Custom Label Element */}
          {name === "AI" && (
            <Box
              sx={{
                width: "fit-content",
                px: {
                  xs: 0.7,
                  sm: 1,
                },
                py: 0.2,
                borderRadius: 10,
                bgcolor: "rgba(16, 185, 129, .15)",
                color: "#34D399",
                fontSize: {
                  xs: ".6rem",
                  sm: ".7rem",
                },
                fontWeight: 700,
              }}
            >
              🤖 AI
            </Box>
          )}

          {/* LAST MESSAGE CONTAINER */}
          <Stack direction="row" spacing={1} alignItems="center">
            {/* ✅ 11. Multi-Core Webkit Box Clipping Frame Setup */}
            <Typography
              variant="body2"
              sx={{
                color: newMessageAlert?.count > 0 ? "#CBD5E1" : "#94A3B8",
                fontSize: {
                  xs: ".72rem",
                  sm: ".8rem",
                  md: ".84rem",
                },
                lineHeight: 1.5,
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                flex: 1,
              }}
            >
              {newMessageAlert?.count > 0
                ? `New messages • ${newMessageAlert.count}`
                : lastMessage || "Say hello 👋"}
            </Typography>
          </Stack>
        </Stack>

        {/* UNREAD BADGE COUNTER */}
        {newMessageAlert?.count > 0 && (
          // ✅ 12. Dynamic Notification Structural Node
          <Box
            sx={{
              minWidth: {
                xs: 18,
                sm: 22,
              },
              height: {
                xs: 18,
                sm: 22,
              },
              px: 1,
              borderRadius: "999px",
              bgcolor: "#22C55E",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: {
                xs: ".55rem",
                sm: ".68rem",
              },
              fontWeight: 700,
              boxShadow: "0 0 12px rgba(34, 197, 94, .35)",
            }}
          >
            {newMessageAlert.count > 99 ? "99+" : newMessageAlert.count}
          </Box>
        )}
      </motion.div>
    </Link>
  );
};

// ✅ 19. React Memo Architecture Optimization Rule implementation
export default React.memo(ChatItem);