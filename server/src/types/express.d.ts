import { UserDocument } from '../models/userModel.ts';

declare module 'express' {
    interface Request {
        user?: UserDocument;
    }
}
