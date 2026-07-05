import { Skeleton, keyframes, styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";
import { grayColor, matBlack } from "../../constants/color";

const VisuallyHiddenInput = styled("input")({
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

const Link = styled(LinkComponent)`
  text-decoration: none;
  color: inherit;
  display: block;
  border-radius: 18px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const InputBox = styled("input")`
  width: 100%;
  height: 56px;

  padding: 0 18px;

  border-radius: 30px;

  border: 1px solid rgba(255, 255, 255, 0.08);

  outline: none;

  background: rgba(30, 41, 59, 0.95);

  backdrop-filter: blur(12px);

  color: white;

  font-size: 0.95rem;

  transition: all 0.25s ease;

  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.18);

  &:hover {
    border-color: #475569;
  }

  &:focus {
    border-color: #6366f1;

    box-shadow:
      0 0 0 4px rgba(99, 102, 241, 0.15),
      0 8px 30px rgba(99, 102, 241, 0.18);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #94a3b8;
    opacity: 1;
  }

  &::selection {
    background: #6366f1;
    color: white;
  }

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #1e293b inset;
    -webkit-text-fill-color: white;
  }
`;

const SearchField = styled("input")`
  width: 100%;
  max-width: 340px;

  padding: 14px 18px;

  border: 1px solid rgba(255, 255, 255, 0.08);

  outline: none;

  border-radius: 16px;

  background: #1e293b;

  color: white;

  font-size: 0.95rem;

  transition: all 0.25s ease;

  &:focus {
    border-color: #6366f1;
  }
`;

const CurveButton = styled("button")`
  border: none;

  outline: none;

  cursor: pointer;

  padding: 14px 24px;

  border-radius: 18px;

  background: linear-gradient(
    135deg,
    #6366f1,
    #8b5cf6
  );

  color: white;

  font-weight: 600;

  transition: 0.25s;

  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);

  &:hover {
    transform: translateY(-2px);

    box-shadow: 0 12px 30px rgba(99, 102, 241, 0.4);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const shimmer = keyframes`
  0%{
    opacity:.4;
  }

  50%{
    opacity:1;
  }

  100%{
    opacity:.4;
  }
`;

const BouncingSkeleton = styled(Skeleton)({
  animation: `${shimmer} 1.4s infinite`,
});

export const GlobalScrollbar = {
  "&::-webkit-scrollbar": {
    width: "6px",
  },

  "&::-webkit-scrollbar-thumb": {
    background: "#475569",
    borderRadius: "20px",
  },

  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
};

export const GlassCard = {
  background: "rgba(15,23,42,.75)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,.08)",
  boxShadow: "0 8px 25px rgba(0,0,0,.2)",
  borderRadius: "20px",
};

export const PrimaryGradient =
  "linear-gradient(135deg,#6366F1,#8B5CF6)";

export const AppBackground = {
  minHeight: "100vh",
  background:
    "linear-gradient(180deg,#020617,#0F172A)",
};

export const HoverScale = {
  transition: ".25s",

  "&:hover": {
    transform: "translateY(-2px)",
  },
};

export {
  CurveButton,
  SearchField,
  InputBox,
  Link,
  VisuallyHiddenInput,
  BouncingSkeleton,
};