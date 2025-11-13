import express from "express";
import {
  createBooking,
  getBookingById,
  getBookingsByTourist,
  getBookingsByProvider,
  updateBookingStatus,
  getAllBookings,
} from "../controllers/bookingController.js";

const router = express.Router();

// ✅ Create booking
router.post("/", createBooking);

// ✅ Get all bookings (admin or filtered view)
router.get("/", getAllBookings);

// ✅ Get booking by ID
router.get("/:id", getBookingById);

// ✅ Get bookings by tourist
router.get("/tourist/:touristId", getBookingsByTourist);

// ✅ Get bookings by provider
router.get("/provider/:providerId", getBookingsByProvider);

// ✅ Update booking status (accepted, rejected, completed, etc.)
router.put("/:id/status", updateBookingStatus);

export default router;
