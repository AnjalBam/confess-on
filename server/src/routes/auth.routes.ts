import { Router } from "express"
import * as authControllers from "../controller/auth-controllers";
import { isAuthenticated } from "../middleware/auth.middleware";

const router = Router()

router.post('/signup', authControllers.signUp);

router.post('/login', authControllers.login);

router.post('/change-password', isAuthenticated, authControllers.changePassword);

export default router