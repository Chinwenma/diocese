"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { team } from "@/lib/team";

export default function TeamSection() {
  return (
    <section className="py-16 bg-white">
      <div className="w-full flex flex-wrap justify-center gap-8 px-4">
        {team.map((member, index) => (
          <motion.div
            key={member.id}
            className=" group w-[90%] sm:w-[45%] lg:w-[30%] flex flex-col items-center p-4 hover:shadow-md rounded-lg transition-all duration-300 bg-gray-50 cursor-pointer hover:bg-[#800000] hover:text-white hover:scale-105 text-justify leading-relaxed"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="relative w-40 h-40 mb-4">
              <Image
                src={member.image || "/assets/default.jpg"}
                alt={member.name}
                fill
                className="rounded-full object-cover object-top border-2 border-red-700 group-hover:border-yellow-400"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-white">
              {member.name}
            </h3>
            <p className="text-sm text-gray-800 group-hover:text-white my-6">
              {member.role}
            </p>
            <p className="text-sm text-gray-800 mb-1 group-hover:text-white">
              <span className="font-semibold">History:</span> {member.history}
            </p>
            <p className="text-sm text-gray-800 mb-3 group-hover:text-white">
              <span className="font-semibold">Function:</span> {member.function}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
