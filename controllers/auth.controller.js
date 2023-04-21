import { User } from "../models/User.js";
import { generateRefreshToken, generateToken } from "../middlewares/tokenManager.js";

export const register = async (req, res) =>{
    const {email, password} = req.body;
    try {
        const user = new User({ email, password });
        await user.save();

        // Create token with JWT
        const { token, expiresIn } = generateToken(user.id);
        generateRefreshToken(user.id, res);
        return res.status(201).json({ token, expiresIn }); 
    } catch (error) {
        console.log(error);
        // If email is already registered
        if (error.code === 11000) {
            return res.status(400).json({ error: "This user already exists" });
        }
        return res.status(500).json({ error: "Server error" });
    }

}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user)
            return res.status(403).json({ error: "This user doesn't exist" });

        const passwordValidation = await user.comparePassword(password);
        if (!passwordValidation)
            return res.status(403).json({ error: "Incorrect password" });

        // Create token with JWT
        const { token, expiresIn } = generateToken(user.id);
        generateRefreshToken(user.id, res);
        return res.json({ token, expiresIn });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error" });
    }
};

export const infoUser = async (req, res) => {
    try {
        const user = await User.findById(req.uid);
        return res.json({ email: user.email, uid: user.id });
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
};

export const refreshToken = (req, res) => {
    try {
        const { token, expiresIn } = generateToken(req.uid);
        return res.json({ token, expiresIn });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error" });
    }
};

export const logout = (req, res) => {
    res.clearCookie("refreshToken");
    res.json({ ok: true });
};