import React from "react";
import {
  Avatar,
  AvatarGroup,
  Tooltip,
  Box,
  Badge,
} from "@mui/material";

import { transformImage } from "../../lib/features";

const AvatarCard = ({
  // ✅ 1. Responsive Avatar Size Mapping Defaults
  avatar = [],
  max = 3,
  size = {
    xs: 42,
    sm: 46,
    md: 50,
    lg: 54,
  },
  online = false,
}) => {
  // Helper to extract responsive values safely for pure JS style injectors if needed,
  // or passing the theme-aware object directly to MUI's sx prop.
  const responsiveSize = typeof size === "object" ? size : { xs: size };

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
      }}
    >
      <Badge
        overlap="circular"
        invisible={!online}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        badgeContent={
          // ✅ 2. Responsive Online Badge with CSS Keyframe Ambient Glow Pulse Animation
          <Box
            sx={{
              width: {
                xs: 8,
                sm: 10,
                md: 12,
              },
              height: {
                xs: 8,
                sm: 10,
                md: 12,
              },
              borderRadius: "50%",
              bgcolor: "#22C55E",
              border: {
                xs: "1.5px solid #0F172A",
                md: "2px solid #0F172A",
              },
              boxShadow: "0 0 12px rgba(34,197,94,.8)",
              animation: "onlinePulse 2s infinite",
              "@keyframes onlinePulse": {
                "0%": {
                  transform: "scale(1)",
                  boxShadow: "0 0 4px rgba(34,197,94,.6)",
                },
                "50%": {
                  transform: "scale(1.12)",
                  boxShadow: "0 0 14px rgba(34,197,94, 1)",
                },
                "100%": {
                  transform: "scale(1)",
                  boxShadow: "0 0 4px rgba(34,197,94,.6)",
                },
              },
            }}
          />
        }
      >
        {avatar.length === 0 ? (
          <Avatar
            sx={{
              width: responsiveSize,
              height: responsiveSize,
              bgcolor: "#4F46E5",
              fontWeight: 700,
            }}
          >
            👤
          </Avatar>
        ) : (
          <AvatarGroup
            max={max}
            sx={{
              transition: "all .25s ease",

              "& .MuiAvatar-root": {
                width: responsiveSize,
                height: responsiveSize,

                border: "2px solid rgba(30,41,59,.95)",

                bgcolor: "#4F46E5",

                fontWeight: 700,

                boxShadow: "0 8px 18px rgba(0,0,0,.28)",

                transition: "all .25s ease",

                "&:hover": {
                  transform: "translateY(-2px) scale(1.06)",

                  boxShadow: "0 10px 25px rgba(99,102,241,.35)",
                },
              },

              "& .MuiAvatarGroup-avatar": {
                fontWeight: 700,
                fontSize: ".85rem",
                background: "#312E81",
                color: "#fff",
              },
            }}
          >
            {avatar.map((img, index) => (
              <Tooltip
                key={index}
                title={`Member ${index + 1}`}
                placement="top"
                arrow
              >
                <Avatar
                  src={img ? transformImage(img) : ""}
                  alt={`Avatar ${index + 1}`}
                >
                  👤
                </Avatar>
              </Tooltip>
            ))}
          </AvatarGroup>
        )}
      </Badge>
    </Box>
  );
};

export default React.memo(AvatarCard);