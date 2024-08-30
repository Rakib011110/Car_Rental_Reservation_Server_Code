/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "./user.model";
import { TUser } from "./users.interface";
import bcrypt from "bcrypt";

const createUserIntoDB = async (payload: Partial<TUser>) => {
  const { password, ...rest } = payload;
  const hashedPassword = await bcrypt.hash(password as string, 10);
  const userData = {
    ...rest,
    password: hashedPassword,
    role: payload.role || "user",
  };

  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (err: any) {
    throw new Error(`Error creating user: ${err.message}`);
  }
};

const findUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (err: any) {
    throw new Error(`Error finding user: ${err.message}`);
  }
};

const updateUserInDB = async (userId: string, updateData: Partial<TUser>) => {
  try {
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    return user;
  } catch (err: any) {
    throw new Error(`Error updating user: ${err.message}`);
  }
};

// Get all users
const getAllUsersFromDB = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (err: any) {
    throw new Error(`Error retrieving users: ${err.message}`);
  }
};

// Delete user
const deleteUserInDB = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    if (user) {
      await User.findByIdAndDelete(userId);
      return true;
    }
    return false;
  } catch (err: any) {
    throw new Error(`Error deleting user: ${err.message}`);
  }
};

export const UserService = {
  createUserIntoDB,
  findUserByEmail,
  updateUserInDB,
  getAllUsersFromDB,
  deleteUserInDB,
};
