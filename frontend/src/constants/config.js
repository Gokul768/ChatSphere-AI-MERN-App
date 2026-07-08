export const server =
  import.meta.env.VITE_SERVER || "http://localhost:3000";

console.log("SERVER URL:", server);