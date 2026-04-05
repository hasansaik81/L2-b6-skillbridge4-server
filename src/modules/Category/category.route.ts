import express from 'express';
import auth, { UserRole } from '../../middlewares/auth';
import { CategoryController } from './category.controller';

const router = express.Router();
router.get("/public",CategoryController.getPublicAllCategory);
router.get("/public/:id",CategoryController.getPublicSingleCategory);


router.post("/",auth(UserRole.tutor),CategoryController.createCategory)
router.get("/",auth(UserRole.tutor),CategoryController.getAllCategory);
router.get("/:id",auth(UserRole.tutor),CategoryController.getSingleCategory);

export const CategoryRoutes = router;
