import jwt from "jsonwebtoken";
import { Types } from "mongoose";

async function generateToken(userId: string, email: string) {
    return await jwt.sign(
        { userId, email },
        process.env.JWT_SECRET_KEY!,
        { expiresIn: "7d" },
    );
}

export default generateToken;
