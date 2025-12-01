import Hero from "@/components/modules/Home/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - PH Health Care",
  description: "Health Care Home Page",
};

export default function Home() {
  return (
    <div>
      <Hero />
    </div>
  )
}
