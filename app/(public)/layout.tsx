import type { Metadata } from "next";

import "../globals.css";
import Nav from "../components/navbar/Nav";
import FaithBanner from "../components/faith/FaithBanner";
import { Footer } from "../components/footer/Footer";
import { roboto } from "@/font";


export const metadata: Metadata = {
  title: "Catholic Diocese of Katsina",
  description: "Catholic Diocese of Katsina",
  keywords: [
    "Catholic Diocese of Katsina",
    "Catholic Church Katsina",
    "Catholic Diocese in Nigeria",
    "Catholic faith",
    "Catholic community",
    "Christian community Katsina",
  ],
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" >
      <body className={`${roboto.className} antialiased bg-[#f0eee9] text-gray-900 `}>
        <Nav />
        <main className="min-h-screen">{children}</main>
        <FaithBanner />
        <Footer  />
      </body>
    </html>
  );
}
