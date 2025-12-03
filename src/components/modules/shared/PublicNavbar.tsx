import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
      Sheet,
      SheetContent,
      SheetTitle,
      SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ModeToggle } from "../DarkMode/ModeToggle";

export default function PublicNavbar() {
      const navlinks = [
            { id: 1, name: "Home", href: "/" },
            { id: 2, name: "Consultation", href: "/consultation" },
            { id: 3, name: "Health Plans", href: "/healthplans" },
            { id: 4, name: "Diagnostics", href: "/diagnostics" },
            { id: 5, name: "NGOs", href: "/ngos" },
      ];

      return (
            <header className="bg-background/95 backdrop-blur sticky top-0 z-50 border-b">
                  <div className="container mx-auto h-16 px-4 flex items-center justify-between">
                        <div className="w-full flex items-center justify-between">
                              <h3 className="text-lg font-semibold text-primary">
                                    <Link href={"/"}>PH Health Care</Link>
                              </h3>

                              <nav className="hidden lg:block">
                                    <ul className="flex items-center gap-4">
                                          {
                                                navlinks.map((item) => (
                                                      <li key={item.id}>
                                                            <Link href={item.href} className="font-medium">{item.name}</Link>
                                                      </li>
                                                ))
                                          }
                                    </ul>
                              </nav>

                              <div className="hidden lg:flex items-center gap-3">
                                    <ModeToggle />
                                    <Link href={"/login"}>
                                          <Button>Login</Button>
                                    </Link>
                              </div>
                        </div>

                        {/* mobile theme toggle */}
                        <div className="lg:hidden mr-3">
                              <ModeToggle />
                        </div>
                        {/* mobile menu */}
                        <div className="lg:hidden">
                              <Sheet>
                                    <SheetTrigger asChild>
                                          <Button variant="outline"><Menu /></Button>
                                    </SheetTrigger>
                                    <SheetContent>
                                          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                          <nav className="flex flex-col space-y-4 mt-8">
                                                <ul>
                                                      {
                                                            navlinks.map((item) => (
                                                                  <li key={item.id}>
                                                                        <Link href={item.href} className="text-lg font-medium">{item.name}</Link>
                                                                  </li>
                                                            ))
                                                      }
                                                </ul>
                                                <div className="flex flex-col space-y-4 pt-4 border-t">
                                                      <div className="flex justify-center"></div>
                                                      <Link href={"/login"} className="text-lg font-medium">
                                                            <Button>Login</Button>
                                                      </Link>
                                                </div>
                                          </nav>
                                    </SheetContent>
                              </Sheet>
                        </div>
                  </div>
            </header >
      )
}
