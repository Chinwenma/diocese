"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedButton from "../button/Button";
import { cormorant } from "@/font";

const BishopSection = () => {
  return (
    <section className="w-full py-16 px-4 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Text Section with Animation */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={`${cormorant.className} text-3xl md:5xl lg:text-6xl text-center font-extrabold mb-4`}>
            Welcome Address
          </h2>
          <p className="mb-6 text-justify leading-relaxed">
            On behalf of the Diocese, we warmly welcome you to our online home.
            Under the spiritual guidance of our beloved Bishop, we remain
            committed to nurturing faith, fostering unity, and serving our
            communities with love and compassion. May this space be a source of
            inspiration, connection, and renewal for all who visit. Whether
            you are seeking spiritual growth, community engagement, or simply a
            place to belong—know that you are welcome here. <b>“Let all that you do
            be done in love.” — 1 Corinthians 16:14</b>
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <AnimatedButton href="/about" label="READ MORE" />
          </div>
        </motion.div>

        <motion.div
          className="relative w-full h-64 md:h-[500px]"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/assets/bishop.png"
            alt="Bishop Image"
            fill
            className=" object-scale-down"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
};

export default BishopSection;
