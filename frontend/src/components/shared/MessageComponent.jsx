import React, { memo } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import {
  Done,
  DoneAll,
} from "@mui/icons-material";
import moment from "moment";
import { motion } from "framer-motion";

import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";

const MessageComponent = ({ message, user }) => {
  const {
    sender,
    content,
    attachments = [],
    createdAt,
  } = message;

  const sameSender = sender?._id === user?._id;
  const status = message.status || "sent";
  const messageTime = moment(createdAt).format("hh:mm A");
  const isAI = sender?.name === "AI";

  return (
    // ✅ 1, 2. Optimized Motion Wrapper with Vertical Fluid Entry and Micro-Responsive Padding
    <motion.div
      initial={{
        opacity: 0,
        y: 8,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.22,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        display: "flex",
        justifyContent: sameSender ? "flex-end" : "flex-start",
        width: "100%",
      }}
    >
      <Box
        sx={{
          marginBottom: {
            xs: "8px",
            sm: "10px",
            md: "12px",
          },
          paddingInline: {
            xs: "6px",
            sm: "12px",
            md: "18px",
          },
          display: "flex",
          width: "100%",
          justifyContent: sameSender ? "flex-end" : "flex-start",
        }}
      >
        <Box
          sx={{
            // ✅ 3, 17. Upgraded Flexible Chat-bubble Width Rules and Fluid Outer Grid Gaps
            maxWidth: {
              xs: "92%",
              sm: "82%",
              md: "72%",
              lg: "66%",
              xl: "58%",
            },
            minWidth: {
              xs: "70px",
              sm: "90px",
            },
            display: "flex",
            gap: {
              xs: 0.6,
              sm: 0.8,
              md: 1,
            },
            alignItems: "flex-end",
            flexDirection: sameSender ? "row-reverse" : "row",
          }}
        >
          {/* ✅ 4. Fluid Responsive Avatar Element Grid sizing */}
          
          {/* ✅ 5, 6, 7, 8, 9, 18, 19, 20. Advanced Glassmorphic Context Bubble Node */}
          <Box
            sx={{
              position: "relative",
              px: {
                xs: 1.2,
                sm: 1.7,
                md: 2,
              },
              py: {
                xs: 0.9,
                sm: 1.2,
                md: 1.3,
              },
              borderRadius: {
                xs: "16px",
                sm: "18px",
                md: "20px",
                lg: "22px",
              },
              background: isAI
                ? "linear-gradient(135deg,#22C55E,#16A34A)"
                : sameSender
                ? "linear-gradient(135deg,#6366F1,#4F46E5)"
                : "#1E293B",
              color: "white",
              boxShadow: "0 10px 30px rgba(2,6,23,.28)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              touchAction: "manipulation",
              transition: "all .25s cubic-bezier(.4,0,.2,1)",
              "&:hover": {
                transform: {
                  md: "translateY(-2px)",
                },
                boxShadow: "0 12px 35px rgba(99,102,241,.25)",
              },
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: 8,
                // ✅ 10. Multi-viewport Adaptive Bubble Tail Alignment Rules
                ...(sameSender
                  ? {
                      right: {
                        xs: -6,
                        md: -8,
                      },
                      borderLeft: isAI
                        ? "10px solid #16A34A"
                        : "10px solid #4F46E5",
                      borderTop: "10px solid transparent",
                    }
                  : {
                      left: {
                        xs: -6,
                        md: -8,
                      },
                      borderRight: "10px solid #1E293B",
                      borderTop: "10px solid transparent",
                    }),
              },
            }}
          >
            {/* ✅ 11. Responsive Sender Meta Text Node */}
            {!sameSender && (
              <Typography
                sx={{
                  fontSize: {
                    xs: ".62rem",
                    sm: ".7rem",
                    md: ".75rem",
                  },
                  letterSpacing: ".4px",
                  fontWeight: 700,
                  color: isAI ? "#D1FAE5" : "#A5B4FC",
                  mb: 0.5,
                }}
              >
                {isAI ? "🤖 AI Assistant" : sender?.name}
              </Typography>
            )}

            {/* ✅ 12, 13. Enhanced Formatting Frame and Dynamic Word-Breaking Guards */}
            {content && (
  <Typography
    component="div"
    sx={{
      fontSize: {
        xs: ".84rem",
        sm: ".9rem",
        md: ".95rem",
        lg: "1rem",
      },
      lineHeight: 1.6,
      wordBreak: "break-word",
      overflowWrap: "anywhere",
      whiteSpace: "pre-wrap",
    }}
  >
    {content}

    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.3,
        ml: 1,
        float: "right",
        mt: 0.5,
      }}
    >
      <Typography
        component="span"
        sx={{
          fontSize: "11px",
          color: "#CBD5E1",
        }}
      >
        {messageTime}
      </Typography>

      {sameSender &&
        (status === "read" ? (
          <DoneAll
            sx={{
              fontSize: 15,
              color: "#38BDF8",
            }}
          />
        ) : status === "delivered" ? (
          <DoneAll
            sx={{
              fontSize: 15,
              color: "#CBD5E1",
            }}
          />
        ) : (
          <Done
            sx={{
              fontSize: 14,
              color: "#CBD5E1",
            }}
          />
        ))}
    </Box>
  </Typography>
)}

            {/* Attachments Layout Block */}
            {attachments.length > 0 &&
              attachments.map((attachment, index) => {
                const url = attachment.url;
                const file = fileFormat(url);

                return (
                  // ✅ 14. Responsive Adaptive Layout Grid Padding & Border Custom Styles
                  <Box
                    key={index}
                    sx={{
                      mt: 1,
                      p: {
                        xs: 0.6,
                        sm: 0.8,
                        md: 1,
                      },
                      bgcolor: "rgba(255,255,255,.06)",
                      border: "1px solid rgba(255,255,255,.1)",
                      borderRadius: {
                        xs: "10px",
                        sm: "12px",
                        md: "14px",
                      },
                      overflow: "hidden",
                    }}
                  >
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "#93C5FD",
                        textDecoration: "none",
                      }}
                    >
                      <RenderAttachment file={file} url={url} />
                    </a>
                  </Box>
                );
              })}

            {/* Time & Status Vector Tray */}
            
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default memo(MessageComponent);