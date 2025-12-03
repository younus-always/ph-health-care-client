/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import z from "zod";

const registerValidationZodSchema = z.object({
      name: z.string().min(1, { error: "Name is required" }),
      email: z.email({ error: "Invalid email address" }),
      address: z.string().optional(),
      password: z
            .string()
            .min(8, { error: "Password must be at least 8 characters long" })
            .max(14, { error: "Password must be at most 14 characters long" }),
      confirmPassword: z
            .string()
            .min(8, { error: "Confirm password must be at least 8 characters long" })
            .max(14, { error: "Confirm password must be at most 14 characters long" })
}).refine((data: any) => data.password === data.confirmPassword, {
      error: "Password does not match"
});

export const registerPatient = async (_currentState: any, formData: any): Promise<any> => {
      try {
            const validationData = {
                  name: formData.get('name'),
                  address: formData.get('address'),
                  email: formData.get('email'),
                  password: formData.get('password'),
                  confirmPassword: formData.get('confirmPassword'),
            }
            const validatedFields = registerValidationZodSchema.safeParse(validationData);

            if (!validatedFields.success) {
                  return {
                        success: false,
                        errors: validatedFields.error.issues.map(issue => {
                              return {
                                    field: issue.path[0],
                                    message: issue.message,
                              }
                        }
                        )
                  }
            };

            const registerData = {
                  password: formData.get("password"),
                  patient: {
                        name: formData.get("name"),
                        email: formData.get("email"),
                        address: formData.get("address")
                  }
            };

            const newFormData = new FormData();
            newFormData.append("data", JSON.stringify(registerData));

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/create-patient`, {
                  method: "POST",
                  body: JSON.stringify(registerData)
            }).then(res => res.json());

            return res;
      } catch (error) {
            console.log(error);
            return { error: "Registration failed" }
      }
};