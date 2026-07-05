
import { Grid, Skeleton, Stack } from "@mui/material";
import React from "react";
import { BouncingSkeleton } from "../styles/StyledComponents";

// Common style to keep skeleton background colors uniform and premium
const skeletonBg = {
  bgcolor: "#1E293B",
};

const LayoutLoader = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        minHeight: "calc(100vh - 4.5rem)",
        p: {
          xs: 1,
          sm: 2,
          md: 2,
        },
      }}
    >
      {/* Left Sidebar Skeleton */}
      <Grid
        item
        xs={false}
        sm={4}
        md={3}
        lg={3}
        xl={2.5}
        sx={{
          display: { xs: "none", sm: "block" },
        }}
        height={"100%"}
      >
        <Skeleton 
          variant="rectangular" 
          animation="wave" 
          height={"100%"} 
          sx={skeletonBg} 
        />
      </Grid>

      {/* Main Content (Chat List) Skeleton */}
      <Grid item xs={12} sm={8} md={6} lg={6} xl={7} height={"100%"}>
        <Stack spacing={"1rem"}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              animation="wave"
              height={{
                xs: 70,
                sm: 76,
                md: 82,
              }}
              sx={{
                ...skeletonBg,
                borderRadius: 3,
              }}
            />
          ))}
        </Stack>
      </Grid>

      {/* Right Sidebar (Profile) Skeleton */}
      <Grid
        item
        xs={false}
        md={3}
        lg={3}
        xl={2.5}
        height={"100%"}
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <Skeleton 
          variant="rectangular" 
          animation="wave" 
          height={"100%"} 
          sx={skeletonBg} 
        />
      </Grid>
    </Grid>
  );
};

const TypingLoader = () => {
  // Shared responsive dimensions for the typing indicator dots
  const dotDimensions = {
    xs: 8,
    sm: 10,
    md: 12,
  };

  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      alignItems={"center"}
      spacing={{
        xs: 0.4,
        sm: 0.6,
        md: 0.8,
      }}
      sx={{
        py: 1,
        px: {
          xs: 1,
          sm: 2,
          // Explicitly fallback to 2 for md if keeping consistent
          md: 2, 
        },
      }}
    >
      <BouncingSkeleton
        variant="circular"
        width={dotDimensions}
        height={dotDimensions}
        sx={skeletonBg}
        style={{
          animationDelay: "0.1s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={dotDimensions}
        height={dotDimensions}
        sx={skeletonBg}
        style={{
          animationDelay: "0.2s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={dotDimensions}
        height={dotDimensions}
        sx={skeletonBg}
        style={{
          animationDelay: "0.4s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={dotDimensions}
        height={dotDimensions}
        sx={skeletonBg}
        style={{
          animationDelay: "0.6s",
        }}
      />
    </Stack>
  );
};

export { TypingLoader, LayoutLoader };

