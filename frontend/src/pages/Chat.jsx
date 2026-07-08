import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import AppLayout from "../components/layout/AppLayout";

import {
  IconButton,
  Skeleton,
  Stack,
  Typography,
  Box,
  Tooltip,
  useMediaQuery,
  useTheme,
  Fade,
} from "@mui/material";

import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
  Mic as MicIcon,
  AccountCircle,
  ArrowBack,
} from "@mui/icons-material";

import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/dialogs/FileMenu";
import MessageComponent from "../components/shared/MessageComponent";

import { getSocket } from "../socket";

import {
  ALERT,
  CHAT_JOINED,
  CHAT_LEAVED,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../constants/events";

import {
  useChatDetailsQuery,
  useGetMessagesQuery,
} from "../redux/api/api";

import {
  useErrors,
  useSocketEvents,
} from "../hooks/hook";

import { useInfiniteScrollTop } from "6pp";

import { useDispatch } from "react-redux";

import { setIsFileMenu } from "../redux/reducers/misc";
import { removeNewMessagesAlert } from "../redux/reducers/chat";

import { TypingLoader } from "../components/layout/Loaders";

import { useNavigate } from "react-router-dom";

/* =====================================================================
   Shared custom-scrollbar styles (Webkit + Firefox) — reused wherever
   a scroll container appears so behaviour stays consistent app-wide.
===================================================================== */
const scrollbarSx = {
  scrollbarWidth: "thin",
  scrollbarColor: "#334155 transparent",
  "&::-webkit-scrollbar": {
    width: { xs: "4px", sm: "6px", md: "8px" },
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#334155",
    borderRadius: "20px",
    "&:hover": { background: "#475569" },
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
};

const Chat = ({
  chatId,
  user,
  toggleProfile,
}) => {
  const socket = getSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleMobileBack = () => {
  navigate("/");
};
  const theme = useTheme();

  // Responsive breakpoint helpers — purely presentational, no logic change.
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const typingTimeout = useRef(null);
  const recognitionRef = useRef(null);
  const previousHeight = useRef(0);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const chatDetails = useChatDetailsQuery({
    chatId,
    skip: !chatId,
  });

  const oldMessagesChunk = useGetMessagesQuery({
    chatId,
    page,
  });

  const {
    data: oldMessages = [],
    setData: setOldMessages,
  } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  const members = chatDetails?.data?.chat?.members;

  useEffect(() => {
    socket.emit("MARK_READ", {
      chatId,
      userId: user._id,
    });
  }, [chatId]);

  /* ================= SPEECH INIT & CLEANUP ================= */
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.interimResults = false;
      recognitionRef.current.maxAlternatives = 1;

      recognitionRef.current.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setMessage((prev) => prev + " " + text);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onspeechend = () => {
        recognitionRef.current.stop();
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleMicClick = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  /* ================= MESSAGE STATUS ================= */
  const messageStatusListener = (data) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg._id === data.messageId
          ? { ...msg, status: "delivered" }
          : msg
      )
    );
  };

  const messageReadListener = (data) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.chat === data.chatId
          ? { ...msg, status: "read" }
          : msg
      )
    );
  };

  /* ================= INPUT CHANGE ================= */
  const messageOnChange = (e) => {
    setMessage(e.target.value);

    if (!isTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIsTyping(true);
    }

    clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIsTyping(false);
    }, 2000);
  };

  /* ================= FILE MENU ================= */
  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  /* ================= SEND MESSAGE ================= */
  const submitHandler = (e) => {
    if (e) e.preventDefault();
    const text = message.trim();
    if (!text) return;

    socket.emit(NEW_MESSAGE, {
      chatId,
      members,
      message: text,
    });

    setMessage("");
  };

  /* ================= SOCKET EVENTS ================= */
  const newMessagesListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId === chatId) {
        setUserTyping(true);
      }
    },
    [chatId]
  );

  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId === chatId) {
        setUserTyping(false);
      }
    },
    [chatId]
  );

  const alertListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setMessages((prev) => [
        ...prev,
        {
          content: data.message,
          sender: {
            _id: "admin",
            name: "Admin",
          },
          chat: chatId,
          createdAt: new Date().toISOString(),
        },
      ]);
    },
    [chatId]
  );

  useSocketEvents(socket, {
    [NEW_MESSAGE]: newMessagesListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
    [ALERT]: alertListener,
  });

  /* ================= CHAT JOIN / LEAVE ================= */
  useEffect(() => {
    socket.emit(CHAT_JOINED, {
      userId: user._id,
      members,
    });

    dispatch(removeNewMessagesAlert(chatId));

    return () => {
      setMessages([]);
      setMessage("");
      setPage(1);

      socket.emit(CHAT_LEAVED, {
        userId: user._id,
        members,
      });
    };
  }, [chatId]);

  /* ================= AUTO SCROLL HELPER & LOGIC ================= */
  const isNearBottom = () => {
    if (!containerRef.current) return false;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    return scrollHeight - scrollTop - clientHeight < 120;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    if (isNearBottom()) {
      requestAnimationFrame(() => {
        containerRef.current.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      });
    }
  }, [messages, userTyping]);

  /* ================= INITIAL CHAT OPENING ================= */
  useEffect(() => {
    if (!containerRef.current) return;

    requestAnimationFrame(() => {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "auto",
      });
    });
  }, [chatId]);

  /* ================= PRESERVE POSITION (OLD MESSAGES) ================= */
  useEffect(() => {
    if (!containerRef.current) return;
    previousHeight.current = containerRef.current.scrollHeight;
  }, [page]);

  useEffect(() => {
    if (!containerRef.current) return;
    const newHeight = containerRef.current.scrollHeight;
    containerRef.current.scrollTop += newHeight - previousHeight.current;
  }, [oldMessages]);


  // Memoized message aggregation
  const allMessages = useMemo(
    () => [...oldMessages, ...messages],
    [oldMessages, messages]
  );

  useEffect(()=>{
 if(chatDetails.isError){
   navigate("/");
 }
},[chatDetails.isError]);

  /* ================= RESPONSIVE LOADING SKELETON ================= */
  if (chatDetails.isLoading)
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "100%",
          height: "100dvh",
          bgcolor: "#020617",
          px: 2,
        }}
      >
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{
            width: { xs: "100%", sm: "90%", md: "80%", lg: "70%", xl: "60%" },
            maxWidth: "1600px",
            height: { xs: "88%", sm: "90%", md: "92%" },
            borderRadius: { xs: 3, md: 4 },
            bgcolor: "rgba(148,163,184,0.08)",
          }}
        />
      </Stack>
    );

  return (
    <Fragment>
      {/* ================= CHAT HEADER ================= */}
      <Stack
        direction="row"
        component="header"
        sx={{
          height: { xs: 56, sm: 60, md: 64 },
          minHeight: { xs: 56, sm: 60, md: 64 },
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 1.5, sm: 2, md: 3 },
          pt: "env(safe-area-inset-top)",
          borderBottom: "1px solid #1E293B",
          background: "#0F172A",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Stack
  direction="row"
  spacing={1}
  alignItems="center"
  sx={{
    minWidth: 0,
  }}
>

  {/* MOBILE BACK BUTTON */}

  <IconButton
    onClick={handleMobileBack}
    sx={{
      display: {
        xs: "flex",
        sm: "none",
      },

      color: "white",

      width: 38,
      height: 38,
    }}
  >
    <ArrowBack />
  </IconButton>


  <Typography
    noWrap
    sx={{
      fontWeight: 700,

      fontSize: {
        xs: "1rem",
        sm: "1.1rem",
        md: "1.2rem",
      },

      color: "white",

      overflow: "hidden",

      textOverflow: "ellipsis",
    }}
  >
    {chatDetails?.data?.chat?.name}
  </Typography>


</Stack>

        <Tooltip title="Profile">
          <IconButton
            onClick={toggleProfile}
            aria-label="Toggle profile panel"
            sx={{
              width: { xs: 38, sm: 42, md: 46 },
              height: { xs: 38, sm: 42, md: 46 },
              color: "#fff",
              background: "#1E293B",
              flexShrink: 0,
              transition: "background-color .2s ease, transform .2s ease",
              "&:hover": {
                background: "#6366F1",
                transform: "scale(1.06)",
              },
              "&:active": { transform: "scale(0.96)" },
            }}
          >
            <AccountCircle sx={{ fontSize: { xs: 22, sm: 24, md: 26 } }} />
          </IconButton>
        </Tooltip>
      </Stack>

      {/* ================= RESPONSIVE MESSAGES BOX ================= */}
      <Stack
        ref={containerRef}
        component="main"
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          overflowX: "hidden",
          position: "relative",
          px: { xs: 1, sm: 2, md: 3, lg: 4, xl: 6 },
          py: { xs: 2, sm: 2.5, md: 3 },
          gap: { xs: 0.25, sm: 0.5 },
          background: "linear-gradient(180deg,#020617,#0F172A)",
          scrollBehavior: prefersReducedMotion ? "auto" : "smooth",
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
          maxWidth: "100%",
          mx: "auto",
          width: "100%",
          "@media (min-width:2560px)": {
            maxWidth: "1800px",
          },
          ...scrollbarSx,
        }}
      >
        {/* Glow Effects */}
        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            top: { xs: 20, md: 50 },
            left: { xs: -20, md: 50 },
            width: { xs: 140, sm: 180, md: 250 },
            height: { xs: 140, sm: 180, md: 250 },
            bgcolor: "#6366F1",
            opacity: 0.08,
            filter: "blur(120px)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            bottom: { xs: 20, md: 50 },
            right: { xs: -20, md: 50 },
            width: { xs: 180, sm: 220, md: 320 },
            height: { xs: 180, sm: 220, md: 320 },
            bgcolor: "#8B5CF6",
            opacity: 0.08,
            filter: "blur(140px)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        {/* Loading indicator while fetching older messages (pagination) */}
        {oldMessagesChunk.isFetching && (
          <Fade in>
            <Stack alignItems="center" sx={{ py: 1 }}>
              <Typography sx={{ color: "#64748B", fontSize: "0.8rem" }}>
                Loading earlier messages…
              </Typography>
            </Stack>
          </Fade>
        )}

        {/* Empty Chat Handling */}
        {allMessages.length === 0 ? (
          <Stack
            sx={{
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              px: 2,
              gap: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                lineHeight: 1,
              }}
            >
              💬
            </Typography>
            <Typography
              sx={{
                color: "#64748B",
                fontWeight: 600,
                fontSize: { xs: "1rem", sm: "1.15rem", md: "1.35rem" },
              }}
            >
              Start a conversation
            </Typography>
          </Stack>
        ) : (
          allMessages.map((m, index) => (
            <Box
              key={m._id || index}
              sx={{
                width: "100%",
                overflowWrap: "break-word",
                wordBreak: "break-word",
              }}
            >
              <MessageComponent message={m} user={user} />
            </Box>
          ))
        )}

        {/* Typing Indicator */}
        {userTyping && (
          <Fade in>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mt: 1, mb: 2, ml: { xs: 0.5, md: 1 } }}
            >
              <Typography
                sx={{
                  color: "#94A3B8",
                  fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" },
                }}
              >
                🤖 Typing...
              </Typography>
              <TypingLoader />
            </Stack>
          </Fade>
        )}

        {/* Smooth Bottom Spacer */}
        <Box ref={bottomRef} sx={{ height: 2 }} />
      </Stack>

      {/* ================= RESPONSIVE INPUT BAR ================= */}
      <Box
        component="form"
        onSubmit={submitHandler}
        sx={{
          background: "#0F172A",
          borderTop: "1px solid #1E293B",
          flexShrink: 0,
          width: "100%",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.6, sm: 1, md: 1.5 }}
          sx={{
            px: { xs: 1, sm: 2, md: 2.5, lg: 4, xl: 6 },
            py: { xs: 1, sm: 1.5, md: 2 },
            pb: "max(env(safe-area-inset-bottom), 12px)",
            maxWidth: "100%",
            mx: "auto",
            "@media (min-width:2560px)": {
              maxWidth: "1800px",
            },
          }}
        >
          <Tooltip title="Attach file">
            <IconButton
              onClick={handleFileOpen}
              aria-label="Attach file"
              sx={{
                width: { xs: 40, sm: 46, md: 50 },
                height: { xs: 40, sm: 46, md: 50 },
                flexShrink: 0,
                color: "#CBD5E1",
                transition: "background-color .25s ease, color .25s ease, transform .2s ease",
                "&:hover": {
                  bgcolor: "#1E293B",
                  color: "#8B5CF6",
                  transform: "scale(1.05)",
                },
                "&:active": { transform: "scale(0.95)" },
              }}
            >
              <AttachFileIcon fontSize={isXs ? "small" : "medium"} />
            </IconButton>
          </Tooltip>

          <Tooltip title={isListening ? "Stop listening" : "Voice input"}>
            <IconButton
              onClick={handleMicClick}
              aria-label={isListening ? "Stop voice input" : "Start voice input"}
              aria-pressed={isListening}
              sx={{
                width: { xs: 40, sm: 46, md: 50 },
                height: { xs: 40, sm: 46, md: 50 },
                flexShrink: 0,
                color: isListening ? "#EF4444" : "#CBD5E1",
                transition: "background-color .25s ease, color .25s ease, transform .2s ease",
                "&:hover": {
                  bgcolor: "#1E293B",
                  transform: "scale(1.05)",
                },
                "&:active": { transform: "scale(0.95)" },
                animation: isListening ? "pulse 1.5s infinite" : "none",
                "@keyframes pulse": {
                  "0%": { boxShadow: "0 0 0 0 rgba(239,68,68,0.45)" },
                  "70%": { boxShadow: "0 0 0 10px rgba(239,68,68,0)" },
                  "100%": { boxShadow: "0 0 0 0 rgba(239,68,68,0)" },
                },
              }}
            >
              <MicIcon fontSize={isXs ? "small" : "medium"} />
            </IconButton>
          </Tooltip>

          <InputBox
            fullWidth
            autoComplete="off"
            autoFocus={false}
            value={message}
            onChange={messageOnChange}
            placeholder={isXs ? "Message…" : "Type a message…"}
            inputProps={{
              "aria-label": "Type a message",
              style: { fontSize: 16 }, // 16px prevents iOS auto-zoom on focus
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submitHandler(e);
              }
            }}
            sx={{
              flex: 1,
              minWidth: 0,
              background: "#1E293B",
              border: "1px solid #334155",
              borderRadius: "30px",
              transition: "border-color .2s ease, box-shadow .2s ease",
              "& input": {
                color: "#F8FAFC",
                fontSize: { xs: "0.92rem", sm: "1rem", md: "1.05rem" },
                padding: { xs: "10px 6px", sm: "13px 8px", md: "16px 8px" },
              },
              "& input::placeholder": {
                color: "#94A3B8",
                opacity: 1,
              },
              "& fieldset": { border: "none" },
              "&:hover fieldset": { border: "none" },
              "&.Mui-focused": {
                boxShadow: "0 0 0 2px rgba(99,102,241,0.35)",
              },
              "&.Mui-focused fieldset": {
                border: "2px solid #6366F1",
              },
            }}
          />

          <Tooltip title="Send message">
            <span>
              <IconButton
                type="submit"
                disabled={!message.trim()}
                aria-label="Send message"
                sx={{
                  width: { xs: 42, sm: 52, md: 56 },
                  height: { xs: 42, sm: 52, md: 56 },
                  minWidth: { xs: 42, sm: 52, md: 56 },
                  flexShrink: 0,
                  background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
                  color: "white",
                  boxShadow: "0 10px 25px rgba(99,102,241,.4)",
                  transition: "transform .2s ease, background .25s ease, box-shadow .25s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    background: "linear-gradient(135deg,#4F46E5,#7C3AED)",
                  },
                  "&:active": { transform: "scale(0.95)" },
                  "&.Mui-disabled": {
                    background: "#334155",
                    color: "#64748B",
                    boxShadow: "none",
                  },
                }}
              >
                <SendIcon fontSize={isXs ? "small" : "medium"} />
              </IconButton>
            </span>
          </Tooltip>
        </Stack>
      </Box>

      <FileMenu anchorEl={fileMenuAnchor} chatId={chatId} />
    </Fragment>
  );
};

export default AppLayout()(Chat);