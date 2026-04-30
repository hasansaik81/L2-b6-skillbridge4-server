import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { TutorController } from "./tutor.controller";

const router= express.Router()

router.get("/",auth(UserRole.tutor),TutorController.getAllTutor);
router.patch("/booking/:id",auth(UserRole.tutor),TutorController.updateBookingStatus);
router.put("/subjucts",auth(UserRole.tutor),TutorController.updateTutorSubjects);
router.post("/",auth(UserRole.tutor),TutorController.createTutor);

router.get("/:id",auth(UserRole.student),TutorController.getSingleTutor);




export const TutorRoutes= router;