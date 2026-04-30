import express from 'express';
import { SubjectsController } from './subjects.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = express.Router();


router.get("/subject",SubjectsController. getAllSubjects);

router.post("/subject",auth(UserRole.admin),SubjectsController.createSubject);


router.put("/subject/:id",auth(UserRole.admin),SubjectsController.updateSubject);
router.delete("/subject/:id",auth(UserRole.admin),SubjectsController.deleteSubject);

export const SubjectsRoutes = router;
