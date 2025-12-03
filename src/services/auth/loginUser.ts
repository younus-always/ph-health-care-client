/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import z from "zod";

const loginValidationZodSchema = z.object({
      email: z.email({ error: "Invalid email address" }),
      password: z
            .string({ error: "Password is required" })
            .min(8, { error: "Password must be at least 8 characters long" })
            .max(14, { error: "Password must be at most 14 characters long" })
});

export const loginUser = async (_currentState: any, formData: any) => {
      try {
            const loginData = {
                  email: formData.get("email"),
                  password: formData.get("password")
            };
            const validatedFields = loginValidationZodSchema.safeParse(loginData);

            if (!validatedFields.success) {
                  return {
                        success: false,
                        errors: validatedFields.error.issues.map(issue => {
                              return {
                                    field: issue.path[0],
                                    message: issue.message
                              }
                        })
                  };
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_ULR}/auth/login`, {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json"
                  },
                  body: JSON.stringify(loginData)
            }).then(res => res.json());

            return response;
      } catch (error) {
            console.log(error);
            return { error: "Login failed" }
      }
};