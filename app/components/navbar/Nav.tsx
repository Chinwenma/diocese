"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import DonateButton from "../button/DonateButton";
import { cinzel } from "@/font";

interface NavItem {
  id: number;
  label: string;
  href?: string;
}

const navLinks: NavItem[] = [
  { id: 1, label: "Home", href: "/" },
  { id: 2, label: "About", href: "/about" },
  // { id: 3, label: "Bishop", href: "/bishop" },
  { id: 3, label: "Clergy", href: "/clergy" },
  { id: 4, label: "Societies", href: "/people" },
  { id: 5, label: "Catechetical", href: "/catechetical" },
  { id: 6, label: "Blog", href: "/blog" },
  { id: 7, label: "Events", href: "/event" },
  { id: 8, label: "Announcements", href: "/announcement" },
  { id: 9, label: "Gallery", href: "/gallery" },
  { id: 10, label: "Contact", href: "/contact" },
];
const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      {/* Top Bar */}
      <div className="w-full bg-[#000] px-4 sm:px-6 md:px-12 lg:px-16 flex justify-between items-center py-2 text-[#fee907]">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src="/assets/logo.jpg"
            alt="Logo"
            width={300}
            height={300}
            loading="lazy"
            className="object-cover w-10 md:w-20"
          />
        </Link>

        <h1
          className={`${cinzel.className} font-semibold text-base sm:text-sm md:text-4xl lg:text-5xl text-center flex-1 px-2`}
          title="Catholic Diocese of Katsina"
        >
          Catholic Diocese of Katsina
        </h1>

        {/* Social Icons (desktop) */}
        <div className="hidden md:flex items-center gap-4 md:text-lg">
          <Link
            href="https://www.facebook.com/share/1649DPp6zj/"
            aria-label="Facebook"
            target="_blank"
          >
            <FaFacebookF />
          </Link>
          <Link
            href="https://www.instagram.com/cathdiokatcom?igsh=aGtmNzZpZmd5Ynln"
            aria-label="Instagram"
            target="_blank"
          >
            <FaInstagram />
          </Link>
          <Link
            href="https://www.youtube.com/@katsinacatholicdiocese?si=YWujbpQeJGRAAKn4"
            aria-label="YouTube"
            target="_blank"
          >
            <FaYoutube />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <IoMdClose /> : <IoMdMenu />}
        </button>
      </div>

      {/* Bottom Nav: hide on mobile to prevent the “pop out” */}
      <div
        className={`hidden md:block transition-all duration-300 ease-in-out ${
          isSticky ? "bg-white shadow-md" : "bg-[#d0AE55]"
        }`}
      >
        <nav className="flex items-center justify-center px-4 py-3 lg:px-12">
          <ul className="flex items-center gap-6 text-lg font-semibold">
            {navLinks.map((item) => (
              <li key={item.id} className="relative">
                <Link
                  href={item.href || "#"}
                  className={`${cinzel.className} text-md transition text-black duration-300 hover:text-[#800000]`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Menu (drawer under the top bar) */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 bg-white border-t border-gray-200">
          <ul className="flex flex-col gap-4 text-gray-800 text-base font-medium">
            {navLinks.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href || "#"}
                  onClick={() => setMobileOpen(false)}
                  className="block py-1 transition-colors duration-300 hover:text-[#800000]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/support" onClick={() => setMobileOpen(false)}>
                <DonateButton className="w-full mt-2 bg-yellow-600 text-white py-2 rounded text-center font-semibold" />
              </Link>
            </li>
            <div className="flex gap-4 pt-4 border-t border-gray-300">
              <Link
                href="https://www.facebook.com/share/1649DPp6zj/"
                aria-label="Facebook"
                target="_blank"
              >
                <FaFacebookF />
              </Link>
              <Link
                href="https://www.instagram.com/cathdiokatcom?igsh=aGtmNzZpZmd5Ynln"
                aria-label="Instagram"
                target="_blank"
              >
                <FaInstagram />
              </Link>
              <Link
                href="https://youtube.com/@katsinacatholicdiocese?si=YWujbpQeJGRAAKn4"
                aria-label="YouTube"
                target="_blank"
              >
                <FaYoutube />
              </Link>
            </div>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
