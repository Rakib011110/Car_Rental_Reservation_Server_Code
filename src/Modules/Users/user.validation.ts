import { object, string } from "zod";

export const SignUpSchema = object({
  name: string(),
  email: string().email(),
  password: string().min(6),
});

export const SignInSchema = object({
  email: string().email(),
  password: string().min(6),
});
