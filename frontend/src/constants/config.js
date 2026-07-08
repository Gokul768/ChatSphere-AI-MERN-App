export const server =
  import.meta.env.VITE_SERVER || "http://localhost:3000";

export const geminiServer =
  import.meta.env.VITE_GEMINI_URL || "http://localhost:5001";

console.log("Backend:", server);
console.log("Gemini:", geminiServer);