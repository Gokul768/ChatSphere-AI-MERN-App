const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
    "https://chat-sphere-ai-mern-app.vercel.app",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const CHATTU_TOKEN = "chattu-token";

export { corsOptions, CHATTU_TOKEN };