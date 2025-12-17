import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./src/routes/userRoutes.js";
import tourRoutes from "./src/routes/tourRoutes.js";
import reviewRoutes from "./src/routes/reviewRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";
import messageRoutes from "./src/routes/messageRoutes.js";
import badgeRequestRoutes from "./src/routes/badgeRequestRoutes.js";
import uploadRoutes from "./src/routes/uploadRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import disputeRoutes from "./src/routes/disputeRoutes.js";
import eventRoutes from "./src/routes/eventRoutes.js";
import pusherRoutes from "./src/routes/pusherRoutes.js";
import aiRoutes from "./src/routes/aiRoutes.js";
import notificationRoutes from "./src/routes/notificationRoutes.js";

import { protect } from "./middleware/authMiddleware.js";
import { getMe } from "./src/controllers/userController.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:4173",
  "http://localhost:4174",
  "http://localhost:4175",
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin || allowedOrigins[0]);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.get("/api/users/me", protect, getMe);
app.use("/api/users", userRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/pusher", pusherRoutes);
app.use("/api/badge-requests", badgeRequestRoutes);
app.use("/api/badges", badgeRequestRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/disputes", disputeRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/notifications", notificationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
