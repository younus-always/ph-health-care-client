import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme.provider";
import { Toaster } from "sonner";
import LoginSuccessToast from "@/components/modules/shared/LoginSuccessToast";
import LogoutSuccessToast from "@/components/modules/shared/LogoutSuccessToast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PH Health Care",
  description: "A healthcare application built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.className}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
          <Toaster position="top-right" richColors />
          <LoginSuccessToast />
          <LogoutSuccessToast />
        </ThemeProvider>
      </body>
    </html>
  );
}
