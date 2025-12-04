"use client";

import { Button } from "@/components/ui/button";
import { logoutUser } from "@/services/auth/logoutUser"

export default function LogoutButton() {
      const handleLogout = async () => {
            await logoutUser();
      };

      return <Button onClick={handleLogout} variant={"outline"}>Logout</Button>
}
