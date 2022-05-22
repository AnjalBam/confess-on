import { Router } from "express"
import * as authControllers from "../controller/auth-controllers";

const router = Router()

router.post('/signup', authControllers.signUp);

router.post('/login', authControllers.login);

export default router