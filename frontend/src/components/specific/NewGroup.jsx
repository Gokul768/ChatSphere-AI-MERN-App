import { useInputValidation } from "6pp";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Fade,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useAvailableFriendsQuery,
  useNewGroupMutation,
} from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { setIsNewGroup } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";
import toast from "react-hot-toast";

// Explicit Transition configuration to safe-guard the 250ms animation timeout
const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} timeout={250} {...props} />;
});

const NewGroup = () => {
  const { isNewGroup } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();
  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  const groupName = useInputValidation("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  useErrors([{ isError, error }]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required");

    if (selectedMembers.length < 2)
      return toast.error("Please select at least 2 members");

    newGroup("Creating New Group...", {
      name: groupName.value,
      members: selectedMembers,
    });

    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  return (
    <Dialog
      open={isNewGroup}
      onClose={closeHandler}
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          background: "linear-gradient(180deg, #0F172A, #020617)",
          color: "#F8FAFC",
          borderRadius: "20px",
          border: "1px solid #1E293B",
          width: {
            xs: "96%",
            sm: "92%",
            md: "600px",
            lg: "650px",
          },
          maxWidth: "650px",
          mx: "auto",
          boxShadow: "0 20px 40px rgba(0,0,0,.45)",
        },
      }}
      sx={{
        "& .MuiBackdrop-root": {
          backdropFilter: "blur(25px)",
        },
      }}
    >
      {/* Wrapped in DialogContent to cleanly isolate styles within MUI Dialog boundaries */}
      <DialogContent
        sx={{
          p: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >
        <Stack spacing={2.5}>
          <DialogTitle
            sx={{
              textAlign: "center",
              fontWeight: 800,
              fontSize: {
                xs: "1.2rem",
                sm: "1.45rem",
                md: "1.6rem",
              },
              background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              p: 0,
              mb: 1,
            }}
          >
            👥 Create Group
          </DialogTitle>

          <TextField
            label="Group Name"
            value={groupName.value}
            onChange={groupName.changeHandler}
            fullWidth
            size="small"
            InputProps={{
              sx: {
                fontSize: {
                  xs: "0.9rem",
                  sm: "1rem",
                },
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "#1E293B",
                color: "#F8FAFC",
                borderRadius: "14px",
                "& fieldset": { borderColor: "#334155" },
                "&:hover fieldset": { borderColor: "#6366F1" },
                "&.Mui-focused fieldset": { borderColor: "#6366F1" },
              },
              "& .MuiInputLabel-root": { color: "#94A3B8" },
              "& .MuiInputBase-input": { color: "#F8FAFC" },
            }}
          />

          <Stack
            spacing={1.5}
            sx={{
              background: "#162033",
              p: 2,
              borderRadius: 3,
              border: "1px solid #273449",
            }}
          >
            <Typography sx={{ color: "#CBD5E1", fontWeight: 600 }}>
              Select Members
            </Typography>

            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                px: 2,
                py: 0.6,
                borderRadius: "999px",
                bgcolor: "#1E293B",
                border: "1px solid #334155",
                width: "fit-content",
              }}
            >
              <Typography fontWeight={700} color="#818CF8" variant="body2">
                {selectedMembers.length} Selected
              </Typography>
            </Box>
          </Stack>

          <Stack
            spacing={1}
            sx={{
              maxHeight: {
                xs: "45vh",
                sm: "50vh",
                md: "420px",
              },
              overflowY: "auto",
              bgcolor: "#0B1220",
              border: "1px solid #1E293B",
              borderRadius: "14px",
              p: 1,
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#475569",
                borderRadius: "20px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#0F172A",
              },
            }}
          >
            {isLoading ? (
              <Skeleton
                variant="rounded"
                height={80}
                animation="wave"
                sx={{
                  bgcolor: "#1E293B",
                  borderRadius: "12px",
                }}
              />
            ) : (
              <>
                {data?.friends?.map((friend) => (
                  <UserItem
                    key={friend._id}
                    user={friend}
                    handler={selectMemberHandler}
                    isAdded={selectedMembers.includes(friend._id)}
                  />
                ))}

                {data?.friends?.length === 0 && (
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    spacing={1}
                    py={5}
                  >
                    <Typography fontSize="3rem" sx={{ lineHeight: 1 }}>
                      👥
                    </Typography>
                    <Typography fontWeight={700} color="#CBD5E1">
                      No Friends Found
                    </Typography>
                    <Typography variant="body2" color="#64748B">
                      Add friends to create a group.
                    </Typography>
                  </Stack>
                )}
              </>
            )}
          </Stack>

          <Stack
            direction={{
              xs: "column-reverse",
              sm: "row",
            }}
            spacing={2}
            pt={1}
          >
            <Button
              fullWidth
              variant="outlined"
              onClick={closeHandler}
              sx={{
                height: { xs: 48, sm: 52 },
                fontWeight: 700,
                borderRadius: 3,
                textTransform: "none",
                borderColor: "#EF4444",
                color: "#EF4444",
                "&:hover": {
                  borderColor: "#DC2626",
                  bgcolor: "rgba(239,68,68,.08)",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              fullWidth
              variant="contained"
              onClick={submitHandler}
              disabled={isLoadingNewGroup}
              sx={{
                height: { xs: 48, sm: 52 },
                fontWeight: 700,
                borderRadius: 3,
                textTransform: "none",
                bgcolor: "#6366F1",
                "&:hover": {
                  bgcolor: "#4F46E5",
                },
              }}
            >
              {isLoadingNewGroup ? "Creating..." : "Create Group"}
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default NewGroup;