import express from 'express';
import auth, { UserRole } from '../../middlewares/auth';
import { CategoryController } from './category.controller';

const router = express.Router();

router.post("/",auth(UserRole.tutor),CategoryController.createCategory)
router.get("/",auth(UserRole.tutor),CategoryController.getAllCategory)

export const CategoryRoutes = router;
