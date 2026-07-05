import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Suspense, lazy } from "react";
import {
  darkSurface,
  borderColor,
  primary,
} from "../../constants/color";

import {
  Add as AddIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  SmartToy as AiIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../constants/config";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { userNotExists } from "../../redux/reducers/auth";

import {
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from "../../redux/reducers/misc";

import { resetNotificationCount } from "../../redux/reducers/chat";

const SearchDialog = lazy(() => import("../specific/Search"));
const NotifcationDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  );

  const { notificationCount } = useSelector((state) => state.chat);

  const handleMobile = () => dispatch(setIsMobile(true));
  const openSearch = () => dispatch(setIsSearch(true));
  const openNewGroup = () => dispatch(setIsNewGroup(true));

  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
  };

  const navigateToGroup = () => navigate("/groups");

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });

      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      {/* ✅ 1. Responsive Header Wrapper Container */}
      <Box
        sx={{
          flexGrow: 0,
          height: {
            xs: "3.8rem",
            sm: "4.2rem",
            md: "4.5rem",
            lg: "5rem",
          },
          minWidth: 0,
        }}
      >
        {/* ✅ 2. Premium Fixed AppBar with Glassmorphism styles */}
        <AppBar
          position="fixed"
          sx={{
            bgcolor: "rgba(15,23,42,.82)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            borderBottom: `1px solid ${borderColor}`,
            boxShadow: "0 8px 30px rgba(0,0,0,.25)",
            zIndex: 1200,
          }}
        >
          {/* ✅ 3. Responsive Toolbar & Spacing Layout */}
          <Toolbar
            sx={{
              height: {
                xs: "3.8rem",
                sm: "4.2rem",
                md: "4.5rem",
                lg: "5rem",
              },
              px: {
                xs: 1,
                sm: 2,
                md: 3,
                lg: 4,
              },
              minHeight: "unset",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: {
                xs: 0.5,
                sm: 1,
                md: 2,
              },
            }}
          >
            {/* ✅ 4. Mobile Menu Button Enhancements */}
            <Box
              sx={{
                display: { xs: "block", sm: "none" },
                mr: { xs: 0.5, sm: 1 },
              }}
            >
              <IconButton
                color="inherit"
                aria-label="Open Navigation Menu"
                onClick={handleMobile}
                sx={{
                  color: "#F8FAFC",
                  width: { xs: 38, sm: 42 },
                  height: { xs: 38, sm: 42 },
                  borderRadius: 2,
                  transition: "all .25s cubic-bezier(.4,0,.2,1)",
                  "&:hover": {
                    background: "rgba(255,255,255,.08)",
                    transform: "scale(1.05)",
                  },
                  "&:focus-visible": {
                    outline: "2px solid #6366F1",
                    outlineOffset: 2,
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* ✅ 5 & 24. Semantic Logo Node with Selection Guards */}
            <Typography
              component="h1"
              sx={{
                fontWeight: 800,
                letterSpacing: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontSize: {
                  xs: "1rem",
                  sm: "1.15rem",
                  md: "1.35rem",
                  lg: "1.5rem",
                },
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: {
                  xs: "140px",
                  sm: "220px",
                  md: "unset"
                },
                userSelect: "none",
                background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {/* ✅ 6. Cleaner Mobile Screen Typography Fragment */}
              🤖
              <Box
                component="span"
                sx={{
                  display: { xs: "none", sm: "inline" },
                }}
              >
                Gokul AI
              </Box>
            </Typography>

            {/* ✅ 7. Responsive Tablet/Desktop Viewport Guard */}
            <Box
              sx={{
                display: { xs: "none", lg: "flex" },
                alignItems: "center",
                gap: 1,
                ml: 3,
              }}
            >
              {/* ✅ 8. Pulsing Status Indicator Keyframes */}
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "#22C55E",
                  boxShadow: "0 0 10px #22C55E",
                  animation: "pulse 2s infinite",
                  "@keyframes pulse": {
                    "0%": {
                      transform: "scale(0.95)",
                      boxShadow: "0 0 0 0 rgba(34, 197, 94, 0.7)",
                    },
                    "70%": {
                      transform: "scale(1)",
                      boxShadow: "0 0 0 6px rgba(34, 197, 94, 0)",
                    },
                    "100%": {
                      transform: "scale(0.95)",
                      boxShadow: "0 0 0 0 rgba(34, 197, 94, 0)",
                    },
                  },
                }}
              />

              <Typography
                variant="body2"
                sx={{
                  color: "#94A3B8",
                }}
              >
                Online
              </Typography>
            </Box>

            {/* ✅ 19 & 25. High Elastic Flexible Spacer */}
            <Box sx={{ flexGrow: 1, minWidth: 0 }} />

            {/* ✅ 9. Fluid Right Icons Container with Overflow Safety */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: {
                  xs: .4,
                  sm: .8,
                  md: 1,
                  lg: 1.2,
                },
                flexWrap: "nowrap",
                overflowX: "auto",
                minWidth: 0,
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {/* ✅ 10, 11 & 18. Premium AI Assistant Layout Toggle Button */}
              <Tooltip title="AI Assistant" arrow enterDelay={300}>
                <IconButton
                  onClick={() => navigate("/ai")}
                  aria-label="AI Assistant"
                  sx={{
                    width: {
                      xs: 36,
                      sm: 40,
                      md: 42,
                      lg: 46,
                    },
                    height: {
                      xs: 36,
                      sm: 40,
                      md: 42,
                      lg: 46,
                    },
                    bgcolor: primary,
                    color: "white",
                    borderRadius: 3,
                    boxShadow: "0 5px 20px rgba(99,102,241,.35)",
                    cursor: "pointer",
                    transition: "all .25s cubic-bezier(.4,0,.2,1)",
                    "&:hover": {
                      bgcolor: "#4F46E5",
                      transform: "translateY(-3px) scale(1.05)",
                      boxShadow: "0 12px 25px rgba(99,102,241,.45)",
                    },
                    "&:focus-visible": {
                      outline: "2px solid #6366F1",
                      outlineOffset: 2,
                    },
                  }}
                >
                  <AiIcon />
                </IconButton>
              </Tooltip>

              <IconBtn
                title="Search"
                icon={<SearchIcon />}
                onClick={openSearch}
              />

              <IconBtn
                title="New Group"
                icon={<AddIcon />}
                onClick={openNewGroup}
              />

              <IconBtn
                title="Manage Groups"
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              />

              <IconBtn
                title="Notifications"
                icon={<NotificationsIcon />}
                onClick={openNotification}
                value={notificationCount}
              />

              <IconBtn
                title="Logout"
                icon={<LogoutIcon />}
                onClick={logoutHandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open sx={{ zIndex: 1300 }} />}>
          <SearchDialog />
        </Suspense>
      )}

      {isNotification && (
        <Suspense fallback={<Backdrop open sx={{ zIndex: 1300 }} />}>
          <NotifcationDialog />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<Backdrop open sx={{ zIndex: 1300 }} />}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};

{/* ✅ 12, 13, 14, 15, 16, 17, 18, 21, 22, 23. Upgraded Custom Global Icon Template Module */}
const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title} arrow enterDelay={300}>
      <IconButton
        onClick={onClick}
        aria-label={title}
        sx={{
          width: {
            xs: 36,
            sm: 40,
            md: 42,
            lg: 46,
          },
          height: {
            xs: 36,
            sm: 40,
            md: 42,
            lg: 46,
          },
          color: "#F8FAFC",
          background: "rgba(30,41,59,.9)",
          borderRadius: 3,
          cursor: "pointer",
          transition: "all .25s cubic-bezier(.4,0,.2,1)",
          "&:hover": {
            background: "#6366F1",
            transform: "translateY(-3px) scale(1.05)",
            boxShadow: "0 10px 22px rgba(99,102,241,.35)",
          },
          "&:focus-visible": {
            outline: "2px solid #6366F1",
            outlineOffset: 2,
          },
        }}
      >
        {value ? (
          <Badge badgeContent={value} color="error" max={99} overlap="circular">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Header;

