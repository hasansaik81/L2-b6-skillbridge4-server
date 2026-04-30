import express from 'express';
import auth, { UserRole } from '../../middlewares/auth';
import { CategoryController } from './category.controller';

const router = express.Router();
router.get("/public",CategoryController.getPublicAllCategory);

router.get("/public/:id",CategoryController.getPublicSingleCategory);

router.get("/",auth(UserRole.tutor),CategoryController.getAllCategory);

router.post("/",auth(UserRole.tutor,UserRole.student),CategoryController.createCategory)

router.get("/:id",auth(UserRole.student),CategoryController.getSingleCategory);




export const CategoryRoutes = router;
