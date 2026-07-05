import {
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  ExitToApp as ExitToAppIcon,
  Groups as GroupsIcon,
  ManageAccounts as ManageAccountsIcon,
  Menu as MenuIcon,
  Message as MessageIcon,
} from "@mui/icons-material";

import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";

import React, { useState } from "react";

import {
  Link as LinkComponent,
  Navigate,
  useLocation,
} from "react-router-dom";

import {
  darkBg,
  darkSurface,
  borderColor,
  textPrimary,
  textSecondary,
  primary,
} from "../../constants/color";

import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../../redux/thunks/admin";

const Link = styled(LinkComponent)`
  text-decoration: none;
  border-radius: 14px;
  padding: 1rem 1.2rem;
  color: #f8fafc;
  transition: all 0.25s ease;

  &:hover {
    background: #1e293b;
    color: white;
    transform: translateX(4px);
  }
`;

const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <ManageAccountsIcon />,
  },
  {
    name: "Chats",
    path: "/admin/chats",
    icon: <GroupsIcon />,
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: <MessageIcon />,
  },
];

const Sidebar = ({ w = "100%" }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(adminLogout());
  };

  return (
    <Stack
      width={w}
      direction={"column"}
      p={"2rem"}
      spacing={"2rem"}
      sx={{
        height: "100%",
        background: darkSurface,
        borderRight: `1px solid ${borderColor}`,
      }}
    >
      {/* Logo */}
      <Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            background:
              "linear-gradient(135deg,#6366F1,#8B5CF6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          🤖 Gokul Admin
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#94A3B8",
            mt: -0.5,
          }}
        >
          Administration Panel
        </Typography>
      </Box>

      {/* Menu Items */}
      <Stack spacing={"0.8rem"} flex={1}>
        {adminTabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            sx={
              location.pathname === tab.path
                ? {
                    bgcolor: primary,
                    color: "white",
                    boxShadow:
                      "0 8px 20px rgba(99,102,241,.4)",

                    ":hover": {
                      color: "white",
                      bgcolor: primary,
                    },
                  }
                : {}
            }
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={"1rem"}
            >
              {tab.icon}

              <Typography fontWeight={500}>
                {tab.name}
              </Typography>
            </Stack>
          </Link>
        ))}
      </Stack>

      {/* Logout */}
      <Link
        onClick={logoutHandler}
        style={{
          marginTop: "auto",
        }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={"1rem"}
        >
          <ExitToAppIcon />

          <Typography fontWeight={600}>
            Logout
          </Typography>
        </Stack>
      </Link>
    </Stack>
  );
};

const AdminLayout = ({ children }) => {
  const { isAdmin } = useSelector((state) => state.auth);

  const [isMobile, setIsMobile] = useState(false);

  const handleMobile = () => setIsMobile(!isMobile);

  const handleClose = () => setIsMobile(false);

  if (!isAdmin) return <Navigate to="/admin" />;

  return (
    <Grid
      container
      minHeight={"100vh"}
      sx={{
        background:
          "linear-gradient(180deg,#020617,#0F172A)",
      }}
    >
      {/* Mobile Menu Button */}
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
          zIndex: 1500,
        }}
      >
        <IconButton
          onClick={handleMobile}
          sx={{
            bgcolor: "#1E293B",
            color: "white",

            "&:hover": {
              bgcolor: primary,
            },
          }}
        >
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      {/* Desktop Sidebar */}
      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <Sidebar />
      </Grid>

      {/* Main Content */}
      <Grid
        item
        xs={12}
        md={8}
        lg={9}
        sx={{
          bgcolor: darkBg,
          color: textPrimary,
          p: 2,
        }}
      >
        {children}
      </Grid>

      {/* Mobile Drawer */}
      <Drawer
        open={isMobile}
        onClose={handleClose}
        PaperProps={{
          sx: {
            background: darkSurface,
            color: "white",
            width: "80vw",
          },
        }}
      >
        <Sidebar w="100%" />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;