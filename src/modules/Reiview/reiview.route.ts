import express from "express";
import { ReviewController } from "./reiview.controller";
import auth, { UserRole } from "../../middlewares/auth";


const router = express.Router();

// Student only
router.post(
  "/",
  auth(UserRole.student),
  ReviewController.createReview
);

// Public - view tutor reviews
router.get("/tutor/:tutorId", ReviewController.getTutorReviews);

export const ReviewRoutes= router;
