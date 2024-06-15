import { Router } from "express";
import { createUsersTable } from "../controllers/userController.ts";

const router = Router();

router.get("/users/create-table", createUsersTable);

export default router;
