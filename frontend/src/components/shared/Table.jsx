import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Container, Paper, Typography } from "@mui/material";

const Table = ({ rows = [], columns = [], heading, loading = false }) => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        height: "100%",
        minHeight: "calc(100vh - 4.5rem)",
        px: { xs: 1, sm: 2, md: 3 },
        py: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 1.5, sm: 2, md: 3 },
          borderRadius: { xs: 2, md: 3 },
          margin: "auto",
          width: "100%",
          height: "100%",
          background: "#0F172A",
          border: "1px solid #1E293B",
          overflow: "hidden",
        }}
      >
        <Typography
          fontWeight={800}
          textAlign="center"
          sx={{
            fontSize: { xs: "1.3rem", sm: "1.7rem", md: "2rem" },
            mt: 1,
            mb: 4,
            textTransform: "uppercase",
            background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {heading}
        </Typography>

        <Box
          sx={{
            width: "100%",
            height: { xs: "60vh", sm: "68vh", md: "72vh", lg: "78vh" },
            "& ::-webkit-scrollbar": {
              height: "8px",
              width: "8px",
            },
            "& ::-webkit-scrollbar-thumb": {
              background: "#475569",
              borderRadius: "20px",
            },
            "& ::-webkit-scrollbar-track": {
              background: "#0F172A",
            },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            // ✅ Fixes database key clashes safely
            getRowId={(row) => row._id || row.id}
            // ✅ Safely auto-wraps long content text lengths
            getRowHeight={() => "auto"}
            // ✅ Prevent crashing conflict with dynamic heights
            disableColumnVirtualization
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10, 25, 50]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
            }}
            sx={{
              border: "none",
              color: "#F8FAFC",
              fontSize: { xs: "0.72rem", sm: "0.82rem", md: "0.9rem" },
              "& .MuiDataGrid-main": {
                border: "none",
              },
              // Combined modern slot selector targeting to overwrite newer MUI variants safely
              "& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeader": {
                background: "#1E293B !important",
                backgroundColor: "#1E293B !important",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                color: "#F8FAFC",
                fontWeight: 700,
                fontSize: { xs: "0.75rem", sm: "0.82rem", md: "0.9rem" },
              },
              "& .MuiDataGrid-cell": {
                borderColor: "#1E293B",
                color: "#CBD5E1",
                display: "flex",
                alignItems: "center",
                paddingY: "14px", 
              },
              "& .MuiDataGrid-row:hover": {
                background: "#1E293B !important",
              },
              "& .Mui-selected": {
                background: "rgba(99, 102, 241, 0.15) !important",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "1px solid #334155",
                color: "#CBD5E1",
                background: "#0B1220",
              },
              "& .MuiTablePagination-root": {
                color: "#CBD5E1",
              },
              "& .MuiTablePagination-actions": {
                color: "#818CF8",
              },
            }}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default Table;