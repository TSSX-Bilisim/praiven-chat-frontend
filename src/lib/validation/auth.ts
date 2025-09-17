import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required." })
    .email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .nonempty({ message: "Password is required." })
    .min(6, { message: "Password must be at least 6 characters." }),
  firstName: z
    .string()
    .nonempty({ message: "First name is required." })
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .nonempty({ message: "Last name is required." })
    .min(2, { message: "Last name must be at least 2 characters." }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required." })
    .email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .nonempty({ message: "Password is required." })
});
