import React from "react";
import { transformImage } from "../../lib/features";
import { FileOpen as FileOpenIcon, Download as DownloadIcon } from "@mui/icons-material";

// ✅ Converted from a loose function into a strict standard React component using props
const RenderAttachment = ({ file, url }) => {
  if (!url) return null;

  // Optimized interaction utilities targeting direct instance styling mutations
  const handleMouseOver = (e) => {
    e.currentTarget.style.transform = "scale(1.02)";
    e.currentTarget.style.boxShadow = "0 12px 30px rgba(99, 102, 241, 0.25)";
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.25)";
  };

  const renderContent = () => {
    switch (file) {
      case "video":
        return (
          <video
            src={url}
            preload="metadata"
            controls
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            style={{
              width: "100%",
              maxWidth: "100%",
              height: "auto",
              borderRadius: "14px",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
              objectFit: "cover",
              cursor: "pointer",
              transition: "all .3s ease",
            }}
          />
        );

      case "image":
        return (
          <img
            src={transformImage(url, 600)}
            alt="Attachment"
            loading="lazy"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            style={{
              width: "100%",
              maxWidth: "100%",
              maxHeight: "280px",
              objectFit: "cover",
              borderRadius: "14px",
              border: "1px solid rgba(99, 102, 241, 0.25)",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
              transition: "all .3s ease",
              cursor: "pointer",
            }}
          />
        );

      case "audio":
        return (
          <audio
            src={url}
            preload="none"
            controls
            style={{
              width: "100%",
              maxWidth: "100%",
              borderRadius: "12px",
              outline: "none",
            }}
          />
        );

      default:
        // Safely extract a legible string fallback name from target endpoint paths
        const fileName = url ? url.split("/").pop().split("?")[0] : "file_attachment";
        
        return (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            download
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "18px",
              borderRadius: "16px",
              background: "linear-gradient(180deg, #1E293B, #0F172A)",
              border: "1px solid #334155",
              backdropFilter: "blur(15px)",
              width: "100%",
              maxWidth: "260px",
              textDecoration: "none",
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
              transition: "all .3s ease",
            }}
          >
            <FileOpenIcon
              style={{
                fontSize: "58px",
                color: "#818CF8",
              }}
            />
            
            <p
              style={{
                marginTop: 10,
                marginBottom: 12,
                color: "#CBD5E1",
                fontWeight: 600,
                fontSize: "13px",
                textAlign: "center",
                width: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title={fileName}
            >
              {fileName}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(99, 102, 241, 0.15)",
                border: "1px solid rgba(99, 102, 241, 0.3)",
                padding: "6px 14px",
                borderRadius: "20px",
                color: "#818CF8",
                fontSize: "12px",
                fontWeight: 700,
                transition: "all .2s ease",
              }}
            >
              <DownloadIcon style={{ fontSize: "16px" }} />
              Download
            </div>
          </a>
        );
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {renderContent()}
    </div>
  );
};

export default RenderAttachment;