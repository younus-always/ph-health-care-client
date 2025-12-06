"use server";

import { IUserInfo } from "@/types/user.interface";
import { getCookie } from "./tokenHandlers";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getUserInfo = async (): Promise<IUserInfo | null> => {
      try {
            const accessToken = await getCookie("accessToken");

            if (!accessToken) {
                  return null
            };
            const verifiedToken = jwt.verify(accessToken, process.env.JWT_SECRET as string) as JwtPayload;

            if (!verifiedToken) {
                  return null
            };

            const userInfo: IUserInfo = {
                  name: verifiedToken.name || "Unknown User",
                  email: verifiedToken.email,
                  role: verifiedToken.role
            };
            return userInfo;

      } catch (error) {
            console.log(error);
            return null
      }
}