import { Router } from "express";
import {
    checkAuthHandler,
    signupHandler,
    loginHandler,
    logoutHandler,
} from "../controllers/authController.ts";
import { validateSignup } from "../middlewares/validations/signUpValidation.ts";
import { validateLogin } from "../middlewares/validations/loginValidation.ts";

const router = Router();

router.get("/checkauth", checkAuthHandler);
router.post("/signup", validateSignup, signupHandler);
router.post("/login", validateLogin, loginHandler);
router.post("/logout", logoutHandler);

export default router;
