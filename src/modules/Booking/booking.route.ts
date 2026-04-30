import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { BookingController } from "./booking.controller";


const router = express.Router();

// Student only
router.post(
  "/",
  auth(UserRole.student),
  BookingController.createBooking
);




export const BookingRoutes= router;
