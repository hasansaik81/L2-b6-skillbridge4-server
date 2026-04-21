import express from 'express';
import auth, { UserRole } from '../../middlewares/auth';
import { CategoryController } from './category.controller';

const router = express.Router();
router.get("/public",CategoryController.getPublicAllCategory);
router.get("/public/:id",CategoryController.getPublicSingleCategory);


router.post("/",auth(UserRole.tutor),CategoryController.createCategory)
router.get("/",auth(UserRole.tutor),CategoryController.getAllCategory);
router.get("/:id",auth(UserRole.student),CategoryController.getSingleCategory);

router.get("/subject",auth(UserRole.admin,UserRole.student,UserRole.tutor), CategoryController.getAllSubjects);
router.post("/subject",auth(UserRole.admin),CategoryController.createSubject);
router.put("/subject/:id",auth(UserRole.admin),CategoryController.updateSubject);
router.delete("/subject/:id",auth(UserRole.admin),CategoryController.deleteSubject);

export const CategoryRoutes = router;
