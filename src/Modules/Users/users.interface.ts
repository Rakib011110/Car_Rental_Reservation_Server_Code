import { Document } from "mongoose";

export type UserRole = "user" | "admin";

export interface TUser extends Document {
  name: string;
  email: string;
  role: UserRole;
  password: string;
  phone: string;
  address: string;
}
