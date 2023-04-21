import { validationResult, body, param } from "express-validator";
import axios from "axios";

export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};

export const bodyRegisterValidator = [
    body("email", "Incorrect email format")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Minimum of 8 characters")
        .trim()
        .isLength({ min: 8 }),
    body("password", "Incorrect email format")
    .custom((value, { req }) => {
            if (value !== req.body.repassword) {
                throw new Error("Passwords do not coincide");
            }
            return value;
        }
    ),
    validationResultExpress,
];

export const bodyLoginValidator = [
    body("email", "Incorrect email format")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Minimum of 8 characters")
        .trim()
        .isLength({ min: 8 }),
    validationResultExpress,
];
