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

// router.get("/:id",auth(UserRole.student,UserRole.tutor),BookingController.getSingleBooking);
router.get("/",auth(UserRole.student),BookingController.getSingleBooking);



export const BookingRoutes= router;
