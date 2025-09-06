import type { Metadata } from "next";

import "../globals.css";
import { roboto } from "@/font";



export const metadata: Metadata = {
  title: "Catholic Diocese of Katsina| Sign In",
  description: "Catholic Diocese of Katsina",
};

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" >
      <body className={`${roboto.className} antialiased bg-[#f0eee9] text-gray-900 `}>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
