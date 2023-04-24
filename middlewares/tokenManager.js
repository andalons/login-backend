import jwt from "jsonwebtoken";

export const generateToken = (uid) => {
    const expiresIn = 60 * 15;

    try {
        const token = jwt.sign({ uid }, process.env.JWT_KEY, { expiresIn });
        return { token, expiresIn };
    } catch (error) {
        console.log(error);
    }
};

export const generateRefreshToken = (uid, res) => {
    const expiresIn = 60 * 60 * 24 * 30;
    try {
        const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
            expiresIn,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + expiresIn * 1000),
            sameSite: "none",
        });
    } catch (error) {
        console.log(error);
    }
};

export const requireToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization;

        if (!token) throw new Error("No Bearer");

        token = token.split(" ")[1];
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;

        next();
    } catch (error) {
        console.log(error.message);
        return res
            .status(401)
            .send({ error: error.message });
    }
};

export const requireRefreshToken = (req, res, next) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken;

        if (!refreshTokenCookie) 
            throw new Error("Token doesn't exist");

        const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
        req.uid = uid;
        
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: error.message });
    }
};