/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const loginUser = async (_currentState: any, formData: any) => {
      try {
            const loginData = {
                  email: formData.get("email"),
                  password: formData.get("password")
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