import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/api";
import { setIsNotification } from "../../redux/reducers/misc";

const Notifications = () => {
  const { isNotification } = useSelector((state) => state.misc);

  const dispatch = useDispatch();

  const { isLoading, data, error, isError } = useGetNotificationsQuery();

  const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));

    await acceptRequest(accept ? "Accepting..." : "Rejecting...", {
      requestId: _id,
      accept,
    });
  };

  const closeHandler = () => dispatch(setIsNotification(false));

  useErrors([{ error, isError }]);

  return (
    // ✅ 1, 13, 14. Fully Responsive Full-Width Dialog Frame with Micro-interaction Timeouts
    <Dialog
      fullWidth
      open={isNotification}
      onClose={closeHandler}
      TransitionProps={{
        timeout: 300,
      }}
      PaperProps={{
        sx: {
          width: {
            xs: "96%",
            sm: "90%",
            md: "32rem",
            lg: "38rem",
          },
          maxWidth: "700px",
          maxHeight: {
            xs: "92vh",
            md: "80vh",
          },
          borderRadius: {
            xs: 3,
            md: 5,
          },
          overflow: "hidden",
          bgcolor: "#0F172A",
          color: "#F8FAFC",
          backdropFilter: "blur(20px)",
          boxShadow: "0 25px 60px rgba(0,0,0,.45)",
          border: "1px solid rgba(99,102,241,.15)",
        },
      }}
    >
      {/* ✅ 2. Adaptive Padding Container Frame Layout Spacer */}
      <Stack
        spacing={{
          xs: 2,
          sm: 2.5,
          md: 3,
        }}
        p={{
          xs: 2,
          sm: 3,
          md: 4,
        }}
        sx={{
          height: "100%",
        }}
      >
        {/* ✅ 3. Responsive Header Fluid Typography Engine */}
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: 800,
            fontSize: {
              xs: "1.3rem",
              sm: "1.5rem",
              md: "1.8rem",
            },
            background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: 1,
            mb: 1,
            p: 0,
          }}
        >
          🔔 Notifications
        </DialogTitle>

        {/* ✅ 11. Premium Wave Animated Async Loading Placeholder Segment */}
        {isLoading ? (
          <Skeleton
            variant="rounded"
            animation="wave"
            height={100}
            sx={{
              bgcolor: "#1E293B",
              borderRadius: "14px",
            }}
          />
        ) : (
          // ✅ 4, 15. Smooth Internal Scroll Panel Container Grid with Boundary Guards
          <Stack
            spacing={2}
            sx={{
              maxHeight: {
                xs: "65vh",
                md: "60vh",
              },
              overflowY: "auto",
              scrollBehavior: "smooth",
              pr: 1,
              pb: 2,
              "&::-webkit-scrollbar": {
                width: 6,
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#334155",
                borderRadius: 20,
              },
            }}
          >
            {data?.allRequests?.length > 0 ? (
              data.allRequests.map(({ sender, _id }) => (
                <NotificationItem
                  key={_id}
                  sender={sender}
                  _id={_id}
                  handler={friendRequestHandler}
                />
              ))
            ) : (
              // ✅ 12. Immersive Visual Micro-Dashboard Empty State Block
              <Stack spacing={2} alignItems="center" py={6}>
                <Avatar
                  sx={{
                    width: 70,
                    height: 70,
                    bgcolor: "#1E293B",
                    fontSize: 35,
                  }}
                >
                  🔔
                </Avatar>
                <Typography fontWeight={700} fontSize={20}>
                  You're all caught up
                </Typography>
                <Typography color="#64748B" textAlign="center">
                  No new notifications available.
                </Typography>
              </Stack>
            )}
          </Stack>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;

  return (
    <ListItem disableGutters>
      {/* ✅ 5. Fluid Interactive Item Wrapper Card Deck Frame */}
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        alignItems="center"
        spacing={2}
        width="100%"
        sx={{
          background: "linear-gradient(135deg,#1E293B,#0F172A)",
          border: "1px solid #334155",
          borderRadius: {
            xs: 3,
            md: 4,
          },
          p: {
            xs: 1.5,
            sm: 2,
          },
          transition: "0.3s",
          cursor: "pointer",
          "&:hover": {
            transform: "translateY(-3px) scale(1.01)",
            boxShadow: "0 15px 30px rgba(99,102,241,.18)",
            borderColor: "#6366F1",
          },
        }}
      >
        {/* Row Container For Identity Node (Maintains Alignment layout across viewport triggers) */}
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          width="100%"
          sx={{ flexGrow: 1 }}
        >
          {/* ✅ 6. Aspect-Aware Circular Profile Image Mask Matrix */}
          <Avatar
            src={avatar}
            alt={name}
            sx={{
              width: {
                xs: 42,
                sm: 50,
                md: 58,
              },
              height: {
                xs: 42,
                sm: 50,
                md: 58,
              },
              fontSize: {
                xs: 16,
                md: 20,
              },
              border: "2px solid #6366F1",
            }}
          >
            {name?.charAt(0)}
          </Avatar>

          {/* ✅ 7. Multi-line Overflow-Protected Context Text Block */}
          <Typography
            sx={{
              flex: 1,
              fontSize: {
                xs: 13,
                sm: 14,
                md: 15,
              },
              lineHeight: 1.5,
              wordBreak: "break-word",
              color: "#E2E8F0",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {`${name} sent you a friend request.`}
          </Typography>
        </Stack>

        {/* ✅ 8. Adaptive Mobile Column-Collapse Button Hub Group Panel */}
        <Stack
          direction={{
            xs: "row",
            sm: "row",
          }}
          spacing={1}
          width={{
            xs: "100%",
            sm: "auto",
          }}
          alignItems="stretch"
        >
          {/* ✅ 9. Fluid Accent Accept Control Target Node */}
          <Button
            variant="contained"
            onClick={() =>
              handler({
                _id,
                accept: true,
              })
            }
            sx={{
              flex: { xs: 1, sm: "initial" },
              minWidth: {
                xs: "100%",
                sm: 90,
              },
              height: 40,
              fontWeight: 700,
              borderRadius: 3,
              bgcolor: "#6366F1",
              transition: "0.3s",
              "&:hover": {
                bgcolor: "#4F46E5",
                transform: "translateY(-2px)",
              },
            }}
          >
            Accept
          </Button>

          {/* ✅ 10. Destructive Secondary Response Control Node */}
          <Button
            variant="outlined"
            onClick={() =>
              handler({
                _id,
                accept: false,
              })
            }
            sx={{
              flex: { xs: 1, sm: "initial" },
              minWidth: {
                xs: "100%",
                sm: 90,
              },
              height: 40,
              fontWeight: 700,
              borderRadius: 3,
              borderColor: "#EF4444",
              color: "#EF4444",
              transition: "0.3s",
              "&:hover": {
                borderColor: "#DC2626",
                background: "rgba(239,68,68,.08)",
                transform: "translateY(-2px)",
              },
            }}
          >
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;