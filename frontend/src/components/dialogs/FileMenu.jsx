import React, { useRef } from "react";
import {
  Box,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AudioFile as AudioFileIcon,
  Image as ImageIcon,
  UploadFile as UploadFileIcon,
  VideoFile as VideoFileIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  setIsFileMenu,
  setUploadingLoader,
} from "../../redux/reducers/misc";

import {
  useSendAttachmentsMutation,
} from "../../redux/api/api";

const menuItemStyles = {
  py: 1.2,
  px: 2,
  transition: ".25s",

  "&:hover": {
    bgcolor: "#1E293B",
    transform: "translateX(4px)",
  },
};

const FileMenu = ({ anchorE1, chatId }) => {
  const { isFileMenu } = useSelector(
    (state) => state.misc
  );

  const dispatch = useDispatch();

  const imageRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const fileRef = useRef(null);

  const [sendAttachments] =
    useSendAttachmentsMutation();

  const closeFileMenu = () =>
    dispatch(setIsFileMenu(false));

  const selectImage = () =>
    imageRef.current?.click();

  const selectAudio = () =>
    audioRef.current?.click();

  const selectVideo = () =>
    videoRef.current?.click();

  const selectFile = () =>
    fileRef.current?.click();

  const fileChangeHandler = async (
    e,
    key
  ) => {
    const files = Array.from(
      e.target.files
    );

    if (files.length <= 0) return;

    if (files.length > 5)
      return toast.error(
        `You can only send 5 ${key} at a time`
      );

    dispatch(setUploadingLoader(true));

    const toastId = toast.loading(
      `Sending ${key}...`
    );

    closeFileMenu();

    try {
      const myForm = new FormData();

      myForm.append("chatId", chatId);

      files.forEach((file) =>
        myForm.append("files", file)
      );

      const res =
        await sendAttachments(myForm);

      if (res.data) {
        toast.success(
          `${files.length} ${key} uploaded successfully 🚀`,
          {
            id: toastId,
          }
        );
      } else {
        toast.error(
          `Failed to send ${key}`,
          {
            id: toastId,
          }
        );
      }
    } catch (error) {
      toast.error(
        error?.data?.message ||
          error?.message ||
          "Upload failed",
        {
          id: toastId,
        }
      );
    } finally {
      dispatch(
        setUploadingLoader(false)
      );
    }
  };

  return (
    <Menu
      anchorEl={anchorE1}
      open={isFileMenu}
      onClose={closeFileMenu}
      PaperProps={{
        sx: {
          bgcolor: "#0F172A",
          color: "#F8FAFC",
          border: "1px solid #1E293B",
          borderRadius: "16px",
          minWidth: "220px",
          boxShadow:
            "0 20px 40px rgba(0,0,0,.35)",
          overflow: "hidden",
        },
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 1.5,
          borderBottom:
            "1px solid #1E293B",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            color: "#F8FAFC",
          }}
        >
          Send Attachment
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#94A3B8",
          }}
        >
          Choose file type
        </Typography>
      </Box>

      <MenuList sx={{ py: 1 }}>
        {/* Photos */}
        <MenuItem
          onClick={selectImage}
          sx={menuItemStyles}
        >
          <Tooltip title="Photos">
            <ImageIcon
              sx={{
                color: "#10B981",
              }}
            />
          </Tooltip>

          <ListItemText
            sx={{ ml: 1 }}
          >
            Photos
          </ListItemText>

          <input
            ref={imageRef}
            type="file"
            multiple
            accept="image/png,image/jpeg,image/gif"
            style={{
              display: "none",
            }}
            onChange={(e) =>
              fileChangeHandler(
                e,
                "Photos"
              )
            }
          />
        </MenuItem>

        {/* Audio */}
        <MenuItem
          onClick={selectAudio}
          sx={menuItemStyles}
        >
          <Tooltip title="Voice / Audio">
            <AudioFileIcon
              sx={{
                color: "#F59E0B",
              }}
            />
          </Tooltip>

          <ListItemText
            sx={{ ml: 1 }}
          >
            Voice / Audio
          </ListItemText>

          <input
            ref={audioRef}
            type="file"
            multiple
            accept="audio/mpeg,audio/wav"
            style={{
              display: "none",
            }}
            onChange={(e) =>
              fileChangeHandler(
                e,
                "Audios"
              )
            }
          />
        </MenuItem>

        {/* Videos */}
        <MenuItem
          onClick={selectVideo}
          sx={menuItemStyles}
        >
          <Tooltip title="Videos">
            <VideoFileIcon
              sx={{
                color: "#8B5CF6",
              }}
            />
          </Tooltip>

          <ListItemText
            sx={{ ml: 1 }}
          >
            Videos
          </ListItemText>

          <input
            ref={videoRef}
            type="file"
            multiple
            accept="video/mp4,video/webm,video/ogg"
            style={{
              display: "none",
            }}
            onChange={(e) =>
              fileChangeHandler(
                e,
                "Videos"
              )
            }
          />
        </MenuItem>

        {/* Documents */}
        <MenuItem
          onClick={selectFile}
          sx={menuItemStyles}
        >
          <Tooltip title="Documents">
            <UploadFileIcon
              sx={{
                color: "#3B82F6",
              }}
            />
          </Tooltip>

          <ListItemText
            sx={{ ml: 1 }}
          >
            Documents
          </ListItemText>

          <input
            ref={fileRef}
            type="file"
            multiple
            accept="*"
            style={{
              display: "none",
            }}
            onChange={(e) =>
              fileChangeHandler(
                e,
                "Files"
              )
            }
          />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default FileMenu;