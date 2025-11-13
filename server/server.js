import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./src/routes/userRoutes.js";
import tourRoutes from "./src/routes/tourRoutes.js";
import reviewRoutes from "./src/routes/reviewRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";
import messageRoutes from "./src/routes/messageRoutes.js";
import badgeRequestRoutes from "./src/routes/badgeRequestRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import disputeRoutes from "./src/routes/disputeRoutes.js";
import eventRoutes from "./src/routes/eventRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/badges", badgeRequestRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/disputes", disputeRoutes);
app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

