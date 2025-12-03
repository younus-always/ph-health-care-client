/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const registerPatient = async (_currentState: any, formData: any): Promise<any> => {
      try {
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