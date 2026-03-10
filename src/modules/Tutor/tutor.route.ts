import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { TutorController } from "./tutor.controller";

const router= express.Router()

router.post("/",auth(UserRole.tutor),TutorController.createTutor);
router.get("/",auth(UserRole.tutor),TutorController.getAllTutor)


export const TutorRoutes= router;