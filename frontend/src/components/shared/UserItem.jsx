import {
  Add as AddIcon,
  Remove as RemoveIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { motion } from "framer-motion";
import { transformImage } from "../../lib/features";

const UserItem = ({
  user,
  handler,
  handlerIsLoading,
  isAdded = false,
  styling = {},
}) => {
  const { name, _id, avatar } = user;

  return (
    <ListItem
      disablePadding
      sx={{
        mb: 1,
      }}
    >
      {/* ✅ 10. Smooth Framer Motion Micro-Interactions */}
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.25,
        }}
        whileHover={{
          scale: 1.01,
        }}
        whileTap={{
          scale: 0.98,
        }}
        style={{
          width: "100%",
        }}
      >
        {/* ✅ 2, 3, 4, 9. Flexbox Structural Grid Matrix */}
        <Stack
          direction="row"
          flexWrap="nowrap"
          alignItems="center"
          spacing={{
            xs: 1,
            sm: 1.5,
            md: 2,
          }}
          width="100%"
          sx={{
            background: "linear-gradient(135deg,#1E293B,#0F172A)",
            border: "1px solid #334155",
            borderRadius: {
              xs: "12px",
              sm: "14px",
              md: "16px",
            },
            p: {
              xs: 1,
              sm: 1.2,
              md: 1.5,
            },
            transition: "all .25s ease",
            "&:hover": {
              borderColor: "#6366F1",
              boxShadow: "0 8px 25px rgba(99,102,241,.18)",
            },
          }}
          {...styling}
        >
          {/* Avatar Profile Node */}
          <Box
            sx={{
              position: "relative",
              flexShrink: 0,
            }}
          >
            {/* ✅ 1. Viewport-Aware Avatar Dimension Scaling */}
            <Avatar
              src={transformImage(avatar)}
              sx={{
                width: {
                  xs: 44,
                  sm: 48,
                  md: 52,
                  lg: 56,
                },
                height: {
                  xs: 44,
                  sm: 48,
                  md: 52,
                  lg: 56,
                },
                border: "2px solid rgba(99,102,241,.5)",
                bgcolor: "#6366F1",
                fontWeight: 700,
              }}
            >
              {name?.charAt(0)}
            </Avatar>

            {/* Ambient Presence Ring Indicator */}
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: "#22C55E",
                border: "2px solid #0F172A",
                position: "absolute",
                right: 2,
                bottom: 2,
                boxShadow: "0 0 10px rgba(34,197,94,.8)",
              }}
            />
          </Box>

          {/* User Name Text Column Stack */}
          <Stack
            sx={{
              flex: 1,
              minWidth: 0, // Enforces flex container boundaries for typography ellipsis clips
            }}
          >
            {/* ✅ 5. Responsive Primary Identity Node */}
            <Typography
              sx={{
                color: "#F8FAFC",
                fontWeight: 700,
                fontSize: {
                  xs: ".9rem",
                  sm: "1rem",
                  md: "1.02rem",
                },
                maxWidth: {
                  xs: "120px",
                  sm: "180px",
                  md: "220px",
                },
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {name}
            </Typography>

            {/* ✅ 6. Responsive Subtitle Node */}
            <Typography
              variant="body2"
              sx={{
                color: "#64748B",
                fontSize: {
                  xs: ".72rem",
                  sm: ".8rem",
                  md: ".85rem",
                },
              }}
            >
              Available
            </Typography>
          </Stack>

          {/* Action Button Node */}
          {/* ✅ 7, 8. Device-Targeted Adaptive Control Unit */}
          <IconButton
            onClick={() => handler(_id)}
            disabled={handlerIsLoading}
            sx={{
              flexShrink: 0,
              width: {
                xs: 36,
                sm: 40,
                md: 44,
              },
              height: {
                xs: 36,
                sm: 40,
                md: 44,
              },
              bgcolor: isAdded ? "#EF4444" : "#6366F1",
              color: "white",
              transition: "all .25s ease",
              "&:hover": {
                bgcolor: isAdded ? "#DC2626" : "#4F46E5",
                transform: {
                  xs: "none",
                  md: "scale(1.08)",
                },
                boxShadow: "0 0 18px rgba(99,102,241,.4)",
              },
              "&.Mui-disabled": {
                bgcolor: "#475569",
                color: "#94A3B8",
              },
            }}
          >
            {isAdded ? <RemoveIcon fontSize="small" /> : <AddIcon fontSize="small" />}
          </IconButton>
        </Stack>
      </motion.div>
    </ListItem>
  );
};

export default memo(UserItem);
