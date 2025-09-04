"use client";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
export const Footer = () => {
  return (
    <footer className="bg-[#000] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-justify">
        <div >
          <h2 className="text-white text-lg font-bold mb-2">
            Catholic Diocese of katsina
          </h2>
          <p className="text-sm mb-4">
            The Catholic Diocese of Katsina was officially established on
            Monday, 16th October 2023, as announced from the Vatican. His
            Holiness Pope Benedict appointed Reverend Monsignor Gerald Mamman
            Musa as its first Bishop.
          </p>
        </div>
        {/* <div>
          <h3 className="text-white font-semibold mb-3">Cathedral</h3>
          <ul className="space-y-2 text-sm">
            <li>Parishes</li>
            <li>Schools</li>
            <li>Chaplaincies</li>
            <li></li>
            <li>Volunteer</li>
          </ul>
        </div> */}

        <div className=" text-center">
          <h3 className="text-white font-semibold mb-3">Useful Links</h3>
          <ul className="space-y-2 text-sm ">
            <Link href="/about" className="hover:text-[#d0AE55] transition-all 300">
              <li>About</li>
            </Link>
            <Link href="/bishop">
              <li className="hover:text-[#d0AE55] transition-all 300">Bishop</li>
            </Link>
            <Link href="/clergy" className="hover:text-[#d0AE55] transition-all 300">
              <li>Clergy</li>
            </Link>
            <Link href="/ history" className="hover:text-[#d0AE55] transition-all 300">
              <li>History</li>
            </Link>
            <Link href="/people" className="hover:text-[#d0AE55] transition-all 300">
              <li>Socities</li>
            </Link>
            <Link href="/clergy" className="hover:text-[#d0AE55] transition-all 300">
              <li>Offices</li>
            </Link>
            <Link href="/coat" className="hover:text-[#d0AE55] transition-all 300">
              <li>Coat Of Arm</li>
            </Link>

            <Link href="/cathecatical" className="hover:text-[#d0AE55] transition-all 300">
              <li>Cathecatical</li>
            </Link>
          </ul>
        </div>
        <div className="text-center">
          <h3 className="text-white font-semibold mb-3 ">Useful Links</h3>
          <ul className="space-y-2 text-sm">
            <Link href="/blog" className="hover:text-[#fee907] transition-all 300">
              <li>Blog</li>
            </Link>
            <Link href="/homily" className="hover:text-[#fee907] transition-all 300">
              <li>Homily</li>
            </Link>
            <Link href="/event" className="hover:text-[#fee907] transition-all 300">
              <li>Events</li>
            </Link>
            <Link href="/gallery" className="hover:text-[#fee907] transition-all 300" >
              <li>Gallery</li>
            </Link>
            <Link href="/support" className="hover:text-[#fee907] transition-all 300">
              <li>Support</li>
            </Link>
            <Link href="/contact" className="hover:text-[#fee907] transition-all 300">
              <li>Contact</li>
            </Link>
            <Link href="/announcement" className="hover:text-[#fee907] transition-all 300">
              <li>Announcements</li>
            </Link>
          </ul>
        </div>
        <div className="md:text-justify text-center">
          <h3 className="text-white font-semibold mb-3">
            Get in Touch with Us
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Nagogo Road, Opposite NITEL Exchange GRA</li>
            <li>P.O. BOX 55, Katsina State, Nigeria</li>
            <li>+234 810 646 4244</li>
            <li>cathdiokatcomm@gmail.com</li>
          </ul>
          <div className="flex gap-4 mt-2 items-center md:justify-items-start text-center">
            <Link
              href="https://www.facebook.com/share/1649DPp6zj/"
              aria-label="Facebook" target="_blank" className="hover:text-[#fee907] transition-all 300"
            >
              <FaFacebookF />
            </Link>
            <Link
              href="https://www.instagram.com/cathdiokatcom?igsh=aGtmNzZpZmd5Ynln"
              aria-label="Instagram" target="_blank" className="hover:text-[#fee907] transition-all 300"
            >
              <FaInstagram />
            </Link>
            <Link
              href="https://www.youtube.com/@katsinacatholicdiocese?si=YWujbpQeJGRAAKn4"
              aria-label="YouTube" target="_blank" className="hover:text-[#fee907] transition-all 300"
            >
              <FaYoutube />
            </Link>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-gray-300 mt-12">
        &copy; {new Date().getFullYear()} Catholic Diocese Of Katsina. All
        Rights Reserved — Website Developed by
        <Link
          href="https://verbumnetworksenugu.com"
          target="_blank"
          className="text-red-100 italic text-xs font-extralight hover:underline"
        >
          {" "}
          Verbum Networks Limited Enugu.
        </Link>
      </p>
    </footer>
  );
};
