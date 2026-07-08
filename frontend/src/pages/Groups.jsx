import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Suspense, lazy, memo, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LayoutLoader } from "../components/layout/Loaders";
import AvatarCard from "../components/shared/AvatarCard";
import { Link } from "../components/styles/StyledComponents";
import { useDispatch, useSelector } from "react-redux";
import UserItem from "../components/shared/UserItem";
import { useAsyncMutation, useErrors } from "../hooks/hook";
import {
  useChatDetailsQuery,
  useDeleteChatMutation,
  useMyGroupsQuery,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation,
} from "../redux/api/api";
import { setIsAddMember } from "../redux/reducers/misc";

const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialogs/ConfirmDeleteDialog")
);
const AddMemberDialog = lazy(() =>
  import("../components/dialogs/AddMemberDialog")
);

const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAddMember } = useSelector((state) => state.misc);

  const myGroups = useMyGroupsQuery("");

  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );

  const [updateGroup] = useAsyncMutation(useRenameGroupMutation);
  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(
    useRemoveGroupMemberMutation
  );
  const [deleteGroup] = useAsyncMutation(useDeleteChatMutation);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [members, setMembers] = useState([]);

  useErrors([
    { isError: myGroups.isError, error: myGroups.error },
    { isError: groupDetails.isError, error: groupDetails.error },
  ]);

  useEffect(() => {
    const data = groupDetails.data;
    if (data) {
      setGroupName(data.chat.name);
      setGroupNameUpdatedValue(data.chat.name);
      setMembers(data.chat.members);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setMembers([]);
      setIsEdit(false);
    };
  }, [groupDetails.data]);

  const chatIdEffect = chatId;

  useEffect(() => {
    if (chatIdEffect) {
      setGroupName(`Group Name ${chatIdEffect}`);
      setGroupNameUpdatedValue(`Group Name ${chatIdEffect}`);
    }
  }, [chatIdEffect]);

  const navigateBack = () => navigate("/");

  const updateGroupName = () => {
    setIsEdit(false);
    updateGroup("Updating Group Name...", {
      chatId,
      name: groupNameUpdatedValue,
    });
  };

  const deleteHandler = () => {
    deleteGroup("Deleting Group...", chatId);
    setConfirmDeleteDialog(false);
    navigate("/groups");
  };

  const removeMemberHandler = (userId) => {
    removeMember("Removing Member...", { chatId, userId });
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      bgcolor: "#1E293B",
      color: "#F8FAFC",
      borderRadius: "14px",
      "& fieldset": { borderColor: "#334155" },
      "&:hover fieldset": { borderColor: "#6366F1" },
      "&.Mui-focused fieldset": { borderColor: "#6366F1" },
    },
    "& .MuiInputLabel-root": { color: "#94A3B8" },
  };

  const IconBtns = (
    <>
      <Box sx={{ display: { xs: "block", sm: "none" }, position: "fixed", right: "1rem", top: "1rem", zIndex: 10 }}>
        <IconButton onClick={() => setIsMobileMenuOpen((p) => !p)} sx={{ color: "white" }}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Stack
  direction="row"
  alignItems="center"
  spacing={2}
  sx={{
    width: "100%",
    mb: 3,
  }}
>
  <Tooltip title="Back">
    <IconButton
      onClick={navigateBack}
      sx={{
        bgcolor: "#1E293B",
        color: "white",
        width: {
          xs: 40,
          sm: 44,
          md: 48,
        },
        height: {
          xs: 40,
          sm: 44,
          md: 48,
        },
        flexShrink: 0,
        "&:hover": {
          bgcolor: "#6366F1",
        },
      }}
    >
      <KeyboardBackspaceIcon />
    </IconButton>
  </Tooltip>

  <Typography
    variant="h5"
    fontWeight={700}
    color="white"
  >
    Manage Group
  </Typography>
</Stack>
    </>
  );

  const GroupName = (
    <Box
      sx={{
        mt: 4,
        p: 3,
        borderRadius: "20px",
        background: "rgba(15,23,42,.8)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,.08)",
        width: "100%",
        maxWidth: {
          xs: "100%",
          sm: "700px",
          md: "750px",
          lg: "850px",
        },
      }}
    >
      <Stack direction="row" justifyContent="center" spacing={2}>
        {isEdit ? (
          <>
            <TextField
              value={groupNameUpdatedValue}
              onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
              sx={inputSx}
            />
            <IconButton onClick={updateGroupName}>
              <DoneIcon sx={{ color: "#6366F1" }} />
            </IconButton>
          </>
        ) : (
          <>
            <Typography variant="h4">{groupName}</Typography>
            <IconButton onClick={() => setIsEdit(true)}>
              <EditIcon sx={{ color: "#6366F1" }} />
            </IconButton>
          </>
        )}
      </Stack>
    </Box>
  );

  const ButtonGroup = (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} p={2}>
      <Button
        startIcon={<DeleteIcon />}
        onClick={() => setConfirmDeleteDialog(true)}
        sx={{ color: "#F87171" }}
      >
        Delete Group
      </Button>

      <Button
        startIcon={<AddIcon />}
        onClick={() => dispatch(setIsAddMember(true))}
        sx={{
          background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
          color: "white",
          "&:hover": {
            background: "linear-gradient(135deg,#4F46E5,#7C3AED)",
          },
        }}
      >
        Add Member
      </Button>
    </Stack>
  );

  return myGroups.isLoading ? (
    <LayoutLoader />
  ) : (
    <Grid
      container
      sx={{
        minHeight: "100dvh",
        background: "linear-gradient(180deg,#020617,#0F172A)",
        color: "#F8FAFC",
      }}
    >
      {/* Sidebar */}
      <Grid
        item
        xs={12}
        sm={4}
        md={3}
        lg={3}
        xl={2.8}
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
      >
        <GroupsList myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Grid>

      {/* Main */}
      <Grid
        item
        xs={12}
        sm={8}
        md={9}
        lg={9}
        xl={9.2}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: {
            xs: 2,
            sm: 3,
            md: 4,
            lg: 5,
          },
        }}
      >
        {IconBtns}

        {groupName && (
          <>
            {GroupName}

            <Typography
              sx={{
                mt: 3,
                alignSelf: "flex-start",
                fontWeight: 700,
                color: "#CBD5E1",
                fontSize: {
                  xs: "1rem",
                  sm: "1.1rem",
                  md: "1.2rem",
                },
              }}
            >
              Group Members
            </Typography>

            <Stack
              sx={{
                width: "100%",
                maxWidth: {
                  xs: "100%",
                  sm: "700px",
                  md: "750px",
                  lg: "850px",
                },
                height: {
                  xs: "50vh",
                  sm: "55vh",
                  md: "60vh",
                  lg: "65vh",
                },
                overflow: "auto",
                mt: 2,
                p: 2,
                borderRadius: "20px",
                background: "rgba(15,23,42,.6)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,.08)",
              }}
            >
              {isLoadingRemoveMember ? (
                <CircularProgress />
              ) : (
                members.map((i) => (
                  <UserItem
                    key={i._id}
                    user={i}
                    isAdded
                    handler={removeMemberHandler}
                  />
                ))
              )}
            </Stack>

            {ButtonGroup}
          </>
        )}
      </Grid>

      {/* Dialogs */}
      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog chatId={chatId} />
        </Suspense>
      )}

      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            handleClose={() => setConfirmDeleteDialog(false)}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}

      {/* Mobile Drawer */}
      <Drawer
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            background: "#0F172A",
            color: "white",
            width: {
              xs: "85vw",
              sm: "360px",
            },
          },
        }}
      >
        <GroupsList myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Drawer>
    </Grid>
  );
};

/* ================= GROUP LIST ================= */

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack
    width={w}
    sx={{
      background: "#0F172A",
      height: "100dvh",
      overflow: "auto",
      borderRight: "1px solid #1E293B",
      "&::-webkit-scrollbar": { width: "6px" },
      "&::-webkit-scrollbar-thumb": {
        background: "#334155",
        borderRadius: "10px",
      },
    }}
  >
    <Box sx={{ p: 2, borderBottom: "1px solid #1E293B" }}>
      <Typography fontWeight={700}>👥 My Groups</Typography>
      <Typography fontSize="0.8rem" color="#94A3B8">
        {myGroups.length} Groups
      </Typography>
    </Box>

    {myGroups.length ? (
      myGroups.map((group) => (
        <GroupListItem key={group._id} group={group} chatId={chatId} />
      ))
    ) : (
      <Typography textAlign="center" p={2}>
        No groups
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => chatId === _id && e.preventDefault()}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{
          p: {
            xs: 1.5,
            sm: 2,
          },
          m: {
            xs: 0.5,
            sm: 1,
          },
          borderRadius: "14px",
          background:
            chatId === _id
              ? "linear-gradient(135deg,#6366F1,#8B5CF6)"
              : "#0F172A",
          border: chatId === _id ? "none" : "1px solid #1E293B",
          transition: "0.2s",
          "&:hover": { 
            transform: "translateY(-2px)",
            boxShadow: "0 8px 25px rgba(99,102,241,.25)",
          },
        }}
      >
        <AvatarCard avatar={avatar} />
        <Typography
          noWrap
          sx={{
            fontWeight: 600,
            fontSize: {
              xs: ".9rem",
              sm: "1rem",
              md: "1.05rem",
            },
          }}
        >
          {name}
        </Typography>
      </Stack>
    </Link>
  );
});

export default Groups;