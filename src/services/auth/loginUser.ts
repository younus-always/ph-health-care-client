/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import z from "zod";
import { parse } from "cookie";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getDefaultDashboardRoutes, isValidRedirectForRole, UserRole } from "@/lib/auth-utils";
import { setCookie } from "./tokenHandlers";

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
            const redirectTo = formData.get("redirect");

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
            };

            if (!accessTokenObject) {
                  throw new Error("Tokens not found in cookies")
            };
            if (!refreshTokenObject) {
                  throw new Error("Tokens not found in cookies")
            };

            await setCookie("accessToken", accessTokenObject.accessToken, {
                  httpOnly: true,
                  secure: true,
                  maxAge: parseInt(accessTokenObject.maxAge),
                  path: accessTokenObject.Path || "/",
            });
            await setCookie("refreshToken", refreshTokenObject.refreshToken, {
                  httpOnly: true,
                  secure: true,
                  maxAge: parseInt(refreshTokenObject.maxAge),
                  path: refreshTokenObject.Path || "/",
            });

            const verifiedToken: string | JwtPayload = jwt.verify(accessTokenObject.accessToken, process.env.JWT_SECRET as string);

            if (typeof verifiedToken === "string") {
                  throw new Error("Invalid token")
            };
            const userRole: UserRole = verifiedToken.role;

            if (!result.success) {
                  throw new Error(result.message || "Login failed")
            };

            if (redirectTo) {
                  const requestedPath = redirectTo.toString();
                  if (isValidRedirectForRole(requestedPath, userRole)) {
                        redirect(`${requestedPath}?loggedIn=true`);
                  } else {
                        redirect(`${getDefaultDashboardRoutes(userRole)}?loggedIn=true`);
                  }
            } else {
                  redirect(`${getDefaultDashboardRoutes(userRole)}?loggedIn=true`);
            };

      } catch (error: any) {
            // Re-throw NEXT_REDIRECT errors so Next.js can handle them
            if (error?.digest?.startsWith('NEXT_REDIRECT')) {
                  throw error;
            };
            console.log(error);
            return {
                  success: false,
                  message: `${process.env.NODE_ENV === "development" ? error.message : "Login failed"}`
            }
      }
};