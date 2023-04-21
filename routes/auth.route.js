import { Router } from "express";
import { body } from "express-validator";
import {
    infoUser,
    login,
    logout,
    refreshToken,
    register,
} from "../controllers/auth.controller.js";
import { requireToken, requireRefreshToken } from "../middlewares/tokenManager.js";
import {
    registrationValidation,
    loginValidation
} from "../middlewares/validationManager.js";

const router = Router();

router.post("/register", registrationValidation, register);
router.post("/login", loginValidation, login);

router.get("/protected", requireToken, infoUser);
router.get("/refresh", requireRefreshToken, refreshToken);
router.get("/logout", logout);

export default router;