import express from "express";
import { BookingController } from "./booking.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = express.Router();

// Only STUDENT can book
router.post("/", auth(UserRole.student), BookingController.createBooking);

export const BookingRoutes = router;
