import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import ChatItem from "../shared/ChatItem";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [],
  handleDeleteChat,
}) => {
  const [search, setSearch] = React.useState("");

  const filteredChats = React.useMemo(() => {
    return chats.filter((chat) =>
      (chat.name || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, chats]);

  // Fix 10: Convert onlineUsers array to a Set for O(1) lightning-fast lookups
  const onlineSet = React.useMemo(
    () => new Set(onlineUsers),
    [onlineUsers]
  );

  return (
    <Stack
      width={w}
      height="100%"
      minHeight={0}
      sx={{
        bgcolor: "#0F172A",
        borderRight: "1px solid #1E293B",
        overflowY: "auto",
        overflowX: "hidden",
        scrollBehavior: "smooth",
        overscrollBehavior: "contain", // Fix 8: Isolates scroll chains from parent containers
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#334155",
          borderRadius: "10px",
        },
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          p: {
            xs: 1.5,
            sm: 2,
            md: 2.5,
          }, // Fix 1: Microfluid header spacing
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "rgba(15, 23, 42, 0.92)",
          backdropFilter: "blur(30px)",
          boxShadow: "0 5px 20px rgba(0, 0, 0, 0.15)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        {/* TITLE */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography
            sx={{
              fontSize: {
                xs: "1.1rem",
                sm: "1.3rem",
                md: "1.5rem",
              }, // Fix 2: Dynamic typography scales down clean on tiny mobile frames
              fontWeight: 800,
              background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            💬 Messages
          </Typography>

          <Box
            sx={{
              px: 1.3,
              py: 0.5,
              borderRadius: 10,
              bgcolor: "#312E81",
              color: "#C7D2FE",
              fontSize: ".75rem",
              fontWeight: 700,
            }}
          >
            {chats.length}
          </Box>
        </Stack>

        <Typography
          variant="body2"
          sx={{
            color: "#94A3B8",
          }}
        >
          {chats.length} Conversations
        </Typography>

        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: "#22C55E",
              boxShadow: "0 0 10px #22C55E",
            }}
          />

          <Typography fontSize=".8rem" color="#94A3B8">
            {onlineUsers.length} Online
          </Typography>
        </Box>

        {/* SEARCH */}
        <TextField
          size="small"
          placeholder="Search chats..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{
                    color: "#94A3B8",
                  }}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            mt: 2,
            maxWidth: {
              xs: "100%",
              sm: 350,
              md: "100%",
            }, // Fix 6: Normalizes visual balance on tablet screens
            "& .MuiOutlinedInput-root": {
              bgcolor: "#1E293B",
              color: "white",
              borderRadius: {
                xs: "12px",
                sm: "14px",
                md: "16px",
              }, // Fix 3: Responsive structural corner bevels
              transition: "all .25s ease",
              "& fieldset": {
                borderColor: "#334155",
              },
              "&:hover": {
                transform: "translateY(-1px)",
              },
              "&:hover fieldset": {
                borderColor: "#475569",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#6366F1",
              },
              "& input::placeholder": {
                color: "#94A3B8",
                opacity: 1,
              },
            },
          }}
        />

        {/* RECENT LABEL */}
        <Typography
          sx={{
            mt: 2,
            color: "#64748B",
            fontWeight: 700,
            fontSize: {
              xs: ".68rem",
              sm: ".72rem",
            }, // Fix 7: Scaled text sizes to fit smaller viewpoint screens
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Recent Conversations
        </Typography>
      </Box>

      {/* CHAT LIST CONTAINMENT */}
      <Box
        sx={{
          px: 1,
          pb: {
            xs: 8,
            sm: 2,
          }, // Fix 9: Defends layouts against bottom navbar occlusion issues on mobile browsers
        }}
      >
        {filteredChats.length > 0 ? (
          filteredChats.map((data, index) => {
            const { avatar, _id, name, groupChat, members } = data;

            const newMessageAlert = newMessagesAlert.find(
              (c) => c.chatId === _id
            );

            // Fix 10 optimization lookup check inside Set structure
            const isOnline = members?.some((m) => onlineSet.has(m));

            return (
              <motion.div
                key={_id}
                initial={{
                  opacity: 0,
                  x: -35,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.28,
                  type: "spring",
                  stiffness: 120,
                  delay: Math.min(index * 0.03, 0.3), // Fix 5: Caps animation build-up stall times on mass data arrays
                }}
              >
                <ChatItem
                  index={index}
                  newMessageAlert={newMessageAlert}
                  isOnline={isOnline}
                  avatar={avatar}
                  name={name}
                  _id={_id}
                  groupChat={groupChat}
                  sameSender={chatId === _id}
                  handleDeleteChat={handleDeleteChat}
                />
              </motion.div>
            );
          })
        ) : (
          <Box
            sx={{
              minHeight: {
                xs: "45vh",
                sm: "55vh",
                md: "60vh",
              }, // Fix 4: Prevents screen layout gaps on short screens
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 1,
              textAlign: "center",
              color: "#94A3B8",
            }}
          >
            <Typography fontSize="4rem">🤝</Typography>

            <Typography variant="h6" fontWeight={700}>
              No conversations found
            </Typography>

            <Typography color="#64748B">Start a new chat 🚀</Typography>
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default ChatList;