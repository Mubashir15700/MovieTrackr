import jwt from "jsonwebtoken";

async function generateToken(userId: string, email: string) {
    return await jwt.sign(
        { userId, email },
        process.env.JWT_SECRET_KEY || "default_secret",
        { expiresIn: "7d" },
    );
}

export default generateToken;
