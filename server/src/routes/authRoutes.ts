import { Router } from "express";
import {
    checkAuthHandler,
    signupHandler,
    loginHandler,
    logoutHandler,
} from "../controllers/authController.js";
import { validateSignup } from "../middlewares/validations/signUpValidation.js";
import { validateLogin } from "../middlewares/validations/loginValidation.js";

const router = Router();

router.get("/checkauth", checkAuthHandler);
router.post("/signup", validateSignup, signupHandler);
router.post("/login", validateLogin, loginHandler);
router.get("/logout", logoutHandler);

export default router;
