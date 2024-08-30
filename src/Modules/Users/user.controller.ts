/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { UserService } from "./user.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../../app/config";
import { TUser } from "./users.interface";

export const signUp = async (req: Request, res: Response) => {
  const { name, email, role, password, phone, address } =
    req.body as Partial<TUser>;

  try {
    const newUser = await UserService.createUserIntoDB({
      name,
      email,
      role,
      password,
      phone,
      address,
    });
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Error registering user",
      error: error.message,
    });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body as Partial<TUser>;

  try {
    const user = await UserService.findUserByEmail(email as string);
    if (!user || !(await bcrypt.compare(password as string, user.password))) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.jwt_access_secret as string,
      { expiresIn: "1d" }
    );

    if (user.role === "admin") {
      // Additional logic for admin login can be added here
      console.log("Admin has logged in");
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User logged in successfully",
      data: user,
      token,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Error logging in",
      error: error.message,
    });
  }
};

export const findUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.params;

  try {
    const user = await UserService.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const updateData = req.body;

  try {
    const updatedUser = await UserService.updateUserInDB(userId, updateData);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const isDeleted = await UserService.deleteUserInDB(userId);
    if (!isDeleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const UserController = {
  signUp,
  signIn,
  updateUser,
  getAllUsers,
  deleteUser,
  findUserByEmail,
};
