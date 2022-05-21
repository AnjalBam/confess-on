import { Router } from "express"
import * as authControllers from "../../controller/auth-controllers";

const router = Router()

router.post('/signup', authControllers.signUp);

export default router