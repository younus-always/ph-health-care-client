import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - PH Health Care",
  description: "Health Care Home Page",
};

export default function Home() {
  return (
    <div>
      <h1>Welcome to ph health care</h1>
      <Button>Click Me</Button>
    </div>
  )
}
