import React, { memo, useCallback, useEffect, useRef, useState } from "react";

import axios from "axios";

import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  Tooltip,
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import CircleIcon from "@mui/icons-material/Circle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";

import { useNavigate } from "react-router-dom";

/* ==========================================================
   MESSAGE BUBBLE (Optimized using React.memo)
========================================================== */

const MessageBubble = memo(
  ({ item, index, copiedIndex, copyMessage }) => {
    const isUser = item.sender === "user";

    return (
      <Stack
        direction="row"
        justifyContent={isUser ? "flex-end" : "flex-start"}
      >
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="flex-end"
          flexDirection={isUser ? "row-reverse" : "row"}
        >
          <Avatar
            sx={{
              bgcolor: isUser ? "#2563EB" : "#7C3AED",
              width: {
                xs: 36,
                sm: 40,
                md: 42,
              },
              height: {
                xs: 36,
                sm: 40,
                md: 42,
              },
              fontSize: {
                xs: 14,
                md: 16,
              },
              flexShrink: 0,
            }}
          >
            {isUser ? "U" : <SmartToyIcon fontSize="small" />}
          </Avatar>

          <Paper
            elevation={5}
            sx={{
              p: 2,

              maxWidth: {
                xs: "95%",
                sm: "88%",
                md: "72%",
                lg: "65%",
                xl: "60%",
              },

              bgcolor: isUser ? "#5B21B6" : "#16213E",

              color: "white",

              borderRadius: 4,

              position: "relative",

              whiteSpace: "pre-wrap",

              wordBreak: "break-word",

              overflowWrap: "break-word",

              transition: ".25s",

              "&:hover": {
                transform: "translateY(-2px)",
              },
            }}
          >
            <Typography
              sx={{
                whiteSpace: "pre-wrap",

                lineHeight: 1.8,

                fontSize: {
                  xs: 14,
                  sm: 15,
                  md: 16,
                },
              }}
            >
              {item.text}
            </Typography>

            <Typography
              sx={{
                mt: 1,

                textAlign: "right",

                color: "#CBD5E1",

                fontSize: {
                  xs: 10,
                  md: 11,
                },
              }}
            >
              {item.time}
            </Typography>

            {!isUser && (
              <Tooltip
                title={
                  copiedIndex === index
                    ? "Copied!"
                    : "Copy"
                }
              >
                <IconButton
                  size="small"
                  onClick={() =>
                    copyMessage(item.text, index)
                  }
                  sx={{
                    position: "absolute",

                    top: 6,

                    right: 6,

                    color: "#CBD5E1",

                    "&:hover": {
                      color: "#fff",
                    },
                  }}
                >
                  {copiedIndex === index ? (
                    <DoneIcon fontSize="small" />
                  ) : (
                    <ContentCopyIcon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
            )}
          </Paper>
        </Stack>
      </Stack>
    );
  }
);

/* ==========================================================
   MAIN COMPONENT
========================================================== */

const AIChat = () => {
  const navigate = useNavigate();

  const bottomRef = useRef(null);

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [copiedIndex, setCopiedIndex] = useState(null);

  const [messages, setMessages] = useState([
    {
      id: Date.now(),

      sender: "ai",

      text:
        "👋 Hello! I'm Gemini AI.\n\nAsk me anything about React, MERN Stack, JavaScript, Coding or General Knowledge.",

      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
    /* ==========================================================
     AUTO SCROLL
  ========================================================== */

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  /* ==========================================================
     COPY MESSAGE (Optimized)
  ========================================================== */

  const copyMessage = useCallback(async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);

      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  }, []);

  /* ==========================================================
     CLEAR CHAT
  ========================================================== */

  const handleNewChat = useCallback(() => {
    setMessages([]);
  }, []);

  /* ==========================================================
     SEND MESSAGE (Optimized)
  ========================================================== */

  const handleSend = useCallback(async () => {
    if (!message.trim() || loading) return;

    const currentMessage = message.trim();

    const userMessage = {
      id: Date.now(),

      sender: "user",

      text: currentMessage,

      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);

    setMessage("");

    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:5001/chat",
        {
          message: currentMessage,
        }
      );

      const aiMessage = {
        id: Date.now() + 1,

        sender: "ai",

        text: data.reply,

        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,

          sender: "ai",

          text: "❌ Unable to connect to Gemini.",

          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [message, loading]);

  /* ==========================================================
     RETURN
  ========================================================== */

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        width: "100%",
        overflow: "hidden",

        background:
          "linear-gradient(135deg,#020617,#0F172A,#1E1B4B)",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        p: {
          xs: 0,
          sm: 1,
          md: 3,
        },
      }}
    >
      <Paper
        elevation={12}
        sx={{
          width: "100%",

          maxWidth: {
            xs: "100%",
            sm: "100%",
            md: "950px",
            lg: "1200px",
            xl: "1450px",
          },

          height: {
            xs: "100dvh",
            sm: "100dvh",
            md: "96vh",
          },

          borderRadius: {
            xs: 0,
            sm: 0,
            md: 5,
          },

          display: "flex",

          flexDirection: "column",

          overflow: "hidden",

          bgcolor: "#0F172A",

          border: "1px solid #1E293B",
        }}
      >
              {/* ==========================================================
            HEADER
        ========================================================== */}

        <Box
          sx={{
            px: {
              xs: 2,
              md: 3,
            },

            py: {
              xs: 1.5,
              sm: 2,
              md: 2.2,
            },

            bgcolor: "#111827",

            borderBottom: "1px solid #1E293B",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* Left Side */}
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <IconButton
                onClick={() => navigate(-1)}
                sx={{
                  color: "white",

                  bgcolor: "#1E293B",

                  "&:hover": {
                    bgcolor: "#334155",
                  },
                }}
              >
                <ArrowBackIcon />
              </IconButton>

              <Avatar
                sx={{
                  bgcolor: "#7C3AED",

                  width: {
                    xs: 40,
                    md: 50,
                  },

                  height: {
                    xs: 40,
                    md: 50,
                  },
                }}
              >
                <SmartToyIcon />
              </Avatar>

              <Box>
                <Typography
                  color="white"
                  fontWeight={700}
                  fontSize={{
                    xs: 18,
                    sm: 20,
                    md: 22,
                  }}
                >
                  Gemini AI Assistant
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  <CircleIcon
                    sx={{
                      color: "#22C55E",
                      fontSize: 10,
                    }}
                  />

                  <Typography
                    color="#94A3B8"
                    fontSize={{
                      xs: 12,
                      sm: 14,
                    }}
                  >
                    Online
                  </Typography>
                </Stack>
              </Box>
            </Stack>

            {/* Right Side */}
            <Tooltip title="New Chat">
              <IconButton
                onClick={handleNewChat}
                sx={{
                  bgcolor: "#7C3AED",

                  color: "white",

                  transition: "0.25s",

                  "&:hover": {
                    bgcolor: "#6D28D9",
                    transform: "scale(1.05)",
                  },
                }}
              >
                <DeleteSweepIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        {/* ==========================================================
            CHAT AREA
        ========================================================== */}

        <Box
          sx={{
            flex: 1,

            minHeight: 0,

            overflowY: "auto",

            overflowX: "hidden",

            px: {
              xs: 1.5,
              sm: 2,
              md: 5,
            },

            py: 4,

            "&::-webkit-scrollbar": {
              width: "6px",
            },

            "&::-webkit-scrollbar-thumb": {
              background: "#475569",
              borderRadius: "20px",
            },

            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
          }}
        >
                  {messages.length === 0 ? (
            <Stack
              spacing={4}
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <Avatar
                sx={{
                  width: {
                    xs: 70,
                    sm: 90,
                  },

                  height: {
                    xs: 70,
                    sm: 90,
                  },

                  bgcolor: "#7C3AED",
                }}
              >
                <SmartToyIcon
                  sx={{
                    fontSize: {
                      xs: 36,
                      sm: 45,
                    },
                  }}
                />
              </Avatar>

              <Typography
                variant="h5"
                color="white"
                fontWeight={700}
                textAlign="center"
                fontSize={{
                  xs: 20,
                  sm: 24,
                  md: 28,
                }}
              >
                Welcome to Gemini AI
              </Typography>

              <Typography
                color="#94A3B8"
                textAlign="center"
                maxWidth={600}
                lineHeight={1.8}
                sx={{
                  px: {
                    xs: 2,
                    sm: 0,
                  },

                  fontSize: {
                    xs: 14,
                    sm: 15,
                    md: 16,
                  },
                }}
              >
                Ask coding questions, generate content,
                solve problems, explain concepts,
                debug code, or simply chat naturally
                with your AI assistant.
              </Typography>
            </Stack>
          ) : (
            <Stack spacing={3}>
              {messages.map((item, index) => (
                <MessageBubble
                  key={item.id}
                  item={item}
                  index={index}
                  copiedIndex={copiedIndex}
                  copyMessage={copyMessage}
                />
              ))}

              {loading && (
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >
                  <Avatar
                    sx={{
                      bgcolor: "#7C3AED",

                      width: {
                        xs: 36,
                        sm: 40,
                      },

                      height: {
                        xs: 36,
                        sm: 40,
                      },
                    }}
                  >
                    <SmartToyIcon fontSize="small" />
                  </Avatar>

                  <Paper
                    sx={{
                      px: 3,
                      py: 2,
                      bgcolor: "#1E293B",
                      borderRadius: 3,
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                    >
                      <CircularProgress
                        size={20}
                        sx={{
                          color: "#A855F7",
                        }}
                      />

                      <Typography
                        sx={{
                          display: "flex",
                          gap: 0.5,
                          color: "white",
                          fontWeight: 500,

                          fontSize: {
                            xs: 14,
                            sm: 15,
                          },
                        }}
                      >
                        Gemini is typing
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                      </Typography>
                    </Stack>
                  </Paper>
                </Stack>
              )}

              <div ref={bottomRef} />
            </Stack>
          )}
        </Box>
                {/* ==========================================================
            INPUT AREA
        ========================================================== */}

        <Box
          sx={{
            borderTop: "1px solid #1E293B",
            bgcolor: "#111827",

            pt: 2,

            px: {
              xs: 1,
              sm: 2,
              md: 2.5,
            },

            pb: {
              xs: "calc(env(safe-area-inset-bottom) + 12px)",
              sm: 2,
            },
          }}
        >
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
          >
            <TextField
              fullWidth
              disabled={loading}
              placeholder="Ask Gemini anything..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey
                ) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#1E293B",
                  color: "white",
                  borderRadius: "30px",

                  "& fieldset": {
                    border: "none",
                  },

                  "&:hover": {
                    bgcolor: "#273549",
                  },

                  "&.Mui-focused": {
                    bgcolor: "#273549",
                  },
                },

                input: {
                  color: "white",

                  px: 2,

                  py: {
                    xs: 1.4,
                    sm: 1.6,
                    md: 1.8,
                  },
                },
              }}
            />

            <IconButton
              onClick={handleSend}
              disabled={loading || !message.trim()}
              sx={{
                width: {
                  xs: 55,
                  sm: 58,
                  md: 60,
                },

                minWidth: 55,

                height: 58,

                bgcolor: "#7C3AED",

                color: "white",

                borderRadius: "50%",

                flexShrink: 0,

                transition: "0.25s",

                "&:hover": {
                  bgcolor: "#6D28D9",
                  transform: "scale(1.05)",
                },

                "&.Mui-disabled": {
                  bgcolor: "#374151",
                  color: "#94A3B8",
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default AIChat;