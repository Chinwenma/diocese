"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const CoatOfArmsSection = () => {
  return (
    <section className="relative w-full text-white py-12 px-4 md:px-16 overflow-hidden bg-green-700">
      <div className="max-w-6xl mx-auto flex flex-col my-28 gap-36 md:flex-row items-center md:gap-10 relative z-10">
        {/* Left Image */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link href="/coat">
            <Image
              src="/assets/logo.jpg"
              alt="Archdiocese Coat of Arms"
              width={400}
              height={400}
              className="w-full max-w-sm h-auto object-contain scale-250"
            />
          </Link>
        </motion.div>

        {/* Right Text */}
        <motion.div
          className="flex-1 text-white"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Catholic Diocese of Katsina Coat of Arm
          </h2>
          <p className="text-gray-100 mb-4 text-justify leading-relaxed tracking-wider">
            Coat of arms, originating in Europe during the late 11th century,
            were initially employed on the battlefield for warriors to
            distinguish their comrades. These same symbols were later utilised
            on seals to verify the authenticity of documents. The Catholic
            Church also used seals to establish legitimacy and ownership. These
            seals evolved from personal likenesses to impersonal shields
            representing dioceses. Martial helmets and coronets were replaced
            with ecclesiastical hats, retaining the shield.
          </p>

          <Link
            href="/coat"
            className="text-yellow-400 hover:underline font-semibold"
          >
            READ MORE
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CoatOfArmsSection;
