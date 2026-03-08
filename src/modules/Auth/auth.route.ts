import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();
router.post('/register',AuthController.createUser)
router.post('/login',AuthController.loginUser)
// current user
// router.get("/me", auth(), UserController.getMe);

export const AuthRoutes = router;
