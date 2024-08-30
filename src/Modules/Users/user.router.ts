import { Router } from "express";
import { UserController } from "./user.controller";
import { isAuthenticated } from "../../app/auth/auth";

const router = Router();

router.post("/signup", UserController.signUp);
router.post("/signin", UserController.signIn);
router.put("/:id", isAuthenticated, UserController.updateUser); // Update user
router.get("/", UserController.getAllUsers); // Get all users
router.delete("/:id", UserController.deleteUser); // Delete user
router.get("/find/:email", UserController.findUserByEmail); // Find user by email

export const UserRoutes = router;
