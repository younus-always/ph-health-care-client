/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import z from "zod";
import { parse } from "cookie";
import { cookies } from "next/headers";

const loginValidationZodSchema = z.object({
      email: z.email({ error: "Invalid email address" }),
      password: z
            .string({ error: "Password is required" })
            .min(8, { error: "Password must be at least 8 characters long" })
            .max(14, { error: "Password must be at most 14 characters long" })
});

export const loginUser = async (_currentState: any, formData: any) => {
      try {
            let accessTokenObject: null | any = null;
            let refreshTokenObject: null | any = null;

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

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_ULR}/auth/login`, {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json"
                  },
                  body: JSON.stringify(loginData)
            });

            const result = await res.json();
            const setCookieHeaders = res.headers.getSetCookie();

            if (setCookieHeaders && setCookieHeaders.length > 0) {
                  setCookieHeaders.forEach((cookie: string) => {
                        const parsedCookie = parse(cookie);

                        if (parsedCookie["accessToken"]) {
                              accessTokenObject = parsedCookie;
                        };
                        if (parsedCookie["refreshToken"]) {
                              refreshTokenObject = parsedCookie;
                        };
                  });
            } else {
                  throw new Error("No set-cookie header found")
            }

            if (!accessTokenObject) {
                  throw new Error("Tokens not found in cookies")
            };
            if (!refreshTokenObject) {
                  throw new Error("Tokens not found in cookies")
            };

            const cookieStore = await cookies();
            cookieStore.set("accessToken", accessTokenObject.accessToken, {
                  httpOnly: true,
                  secure: true,
                  maxAge: parseInt(accessTokenObject.maxAge),
                  path: accessTokenObject.Path || "/",
            });
            cookieStore.set("refreshToken", refreshTokenObject.refreshToken, {
                  httpOnly: true,
                  secure: true,
                  maxAge: parseInt(refreshTokenObject.maxAge),
                  path: refreshTokenObject.Path || "/",
            });

            return result;
      } catch (error) {
            console.log(error);
            return { error: "Login failed" }
      }
};