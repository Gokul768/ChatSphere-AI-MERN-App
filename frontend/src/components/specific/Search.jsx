import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  CircularProgress,
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation } from "../../hooks/hook";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import { setIsSearch } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";

const Search = () => {
  const { isSearch } = useSelector((state) => state.misc);

  const [searchUser] = useLazySearchUserQuery();

  const [sendFriendRequest, isLoadingSendFriendRequest] =
    useAsyncMutation(useSendFriendRequestMutation);

  const dispatch = useDispatch();

  const search = useInputValidation("");

  const [users, setUsers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending friend request...", {
      userId: id,
    });
  };

  const searchCloseHandler = () => {
    dispatch(setIsSearch(false));
  };

  useEffect(() => {
    // ✅ 11. Faster Debounce Interval Timing Tune (500ms down to 350ms)
    const timeOutId = setTimeout(() => {
      if (!search.value.trim()) {
        setUsers([]);
        return;
      }

      setIsSearching(true);

      searchUser(search.value)
        .then(({ data }) => {
          setUsers(data?.users || []);
        })
        .catch((e) => {
          console.log(e);
          setUsers([]);
        })
        .finally(() => {
          setIsSearching(false);
        });
    }, 350);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value, searchUser]);

  return (
    // ✅ 1, 9, 10. Responsive Adaptive Dialog Frame with Full-Width Configuration and Smooth Timeouts
    <Dialog
      fullWidth
      open={isSearch}
      onClose={searchCloseHandler}
      TransitionProps={{
        timeout: 300,
      }}
      PaperProps={{
        sx: {
          width: {
            xs: "96%",
            sm: "85%",
            md: "32rem",
            lg: "36rem",
          },
          maxWidth: "650px",
          maxHeight: {
            xs: "92vh",
            md: "80vh",
          },
          borderRadius: {
            xs: 3,
            sm: 4,
          },
          overflow: "hidden",
          bgcolor: "#0F172A",
          border: "1px solid rgba(99,102,241,.18)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 25px 60px rgba(0,0,0,.45)",
        },
      }}
    >
      {/* ✅ 2. Responsive Inner Layout Spacer Stack Box Grid Frame */}
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
        {/* ✅ 3. Responsive Fluid Typography Header Engine */}
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
          🔍 Find People
        </DialogTitle>

        {/* ✅ 4, 5, 12, 13. Auto-Focus Responsive Input Node with Hardware Accelerations and Safe Form Captures */}
        <TextField
          autoFocus
          label="Search"
          value={search.value}
          onChange={search.changeHandler}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{
                    fontSize: {
                      xs: 22,
                      md: 26,
                    },
                    color: "#6366F1",
                  }}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: {
                xs: 50,
                md: 56,
              },
              fontSize: {
                xs: 14,
                md: 16,
              },
              bgcolor: "#1E293B",
              borderRadius: 4,
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-2px)",
              },
              "& fieldset": {
                borderColor: "#334155",
              },
              "&:hover fieldset": {
                borderColor: "#6366F1",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#6366F1",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#94A3B8",
            },
            "& .MuiInputBase-input": {
              color: "#F8FAFC",
            },
          }}
        />

        {/* ✅ 6, 15. Premium Row-Aligned Spinner State Track Indicator */}
        {isSearching && (
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress
              size={18}
              sx={{
                color: "#6366F1",
              }}
            />
            <Typography
              sx={{
                color: "#6366F1",
                fontSize: {
                  xs: 13,
                  md: 15,
                },
              }}
            >
              Searching users...
            </Typography>
          </Stack>
        )}

        {/* ✅ 15. Responsive Standalone Loader Variant Wrapper */}
        {isLoadingSendFriendRequest && (
          <Typography
            sx={{
              color: "#6366F1",
              textAlign: "center",
              fontSize: {
                xs: 13,
                md: 15,
              },
            }}
          >
            Sending request...
          </Typography>
        )}

        {/* ✅ 7, 14. Responsive List Track Box Framework with Smooth Residual Scroll Physics */}
        <List
          sx={{
            flex: 1,
            minHeight: 250,
            maxHeight: {
              xs: "45vh",
              sm: "50vh",
              md: "55vh",
            },
            overflowY: "auto",
            borderRadius: 4,
            bgcolor: "#0B1220",
            border: "1px solid #1E293B",
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": {
              width: 6,
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#334155",
              borderRadius: 20,
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
          }}
        >
          {users.length > 0 ? (
            users.map((user) => (
              <UserItem
                key={user._id}
                user={user}
                handler={addFriendHandler}
                handlerIsLoading={isLoadingSendFriendRequest}
              />
            ))
          ) : (
            // ✅ 8. Immersive Visual Empty State Notification Framework
            !isSearching && (
              <Stack spacing={2} alignItems="center" py={6}>
                <SearchIcon
                  sx={{
                    fontSize: 55,
                    color: "#475569",
                  }}
                />
                <Typography fontWeight={700} fontSize={18}>
                  No Users Found
                </Typography>
                <Typography color="#64748B" textAlign="center" fontSize={14}>
                  Try another username
                </Typography>
              </Stack>
            )
          )}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;