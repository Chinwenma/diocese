"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ButtonLink from "../../components/button/Button";
import { cormorant } from "@/font";

const counters = [
  { label: "CATHOLICS", value: 19000, suffix: "k", display: 19 },
  { label: "RELIGIOUS", value: 10, suffix: "", display: 10 },
  { label: "PRIESTS", value: 33, suffix: "", display: 33 },
  { label: "PARISHES", value: 20, suffix: "", display: 20 },
];

const HistorySection = () => {
  const [animatedValues, setAnimatedValues] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const duration = 1000;
    const frameRate = 60;
    const totalFrames = Math.round((duration / 1000) * frameRate);

    counters.forEach((counter, i) => {
      const step = counter.display / totalFrames;
      let current = 0;
      const interval = setInterval(() => {
        current += step;
        if (current >= counter.display) {
          current = counter.display;
          clearInterval(interval);
        }
        setAnimatedValues((prev) => {
          const updated = [...prev];
          updated[i] = parseFloat(current.toFixed(0));
          return updated;
        });
      }, duration / totalFrames);
    });
  }, []);

  return (
    <>
      {/* MAIN HISTORY SECTION */}
      <section className="bg-gray-100 py-16 px-4 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* MAP IMAGE */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src="/assets/pic2.jpg"
              alt="Map of Archdiocese"
              width={600}
              height={400}
              className="w-full h-auto object-contain"
            />
          </motion.div>

          {/* TEXT CONTENT */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className={`${cormorant.className} text-3xl md:text-4xl font-bold mb-4`}>
              A BRIEF HISTORY OF THE DIOCESE.
            </h2>
            <p className="text-gray-700 mb-4 text-justify leading-relaxed">
              The announcement of the creation of the new Ecclesiastical
              jurisdiction known as Catholic Diocese of Katsina was conveyed to
              the world on Monday, 16th October 2023 from the Vatican. In doing
              so, His Holiness Pope Benedict announced the appointment of
              Reverend Monsignor Gerald Mamman Musa as its first Bishop,
              hitherto, an Associate Professor of Communications at the Catholic
              Institute of West Africa, CIWA, PortHarcourt.
            </p>
            <p className="text-gray-700 mb-6 text-justify leading-relaxed">
              By this decision, the former Diocese of Sokoto which comprised
              Katsina, Kebbi, Sokoto and Zamfara has now been split. The new
              Diocese of Katsina now covers Katsina state and Kaura Namoda (a
              part of Zamfara State) which is about 25, 060 km2 (9,676 sa mi) -
              located in the North-West region of northern Nigeria. The history
              of the new Diocese of Katsina is interwoven with that of the
              Catholic Diocese of Sokoto. It stretches back peripherally in
              1870.
            </p>
          <ButtonLink href="/history" label="Find Out More" variant="secondary" />

          </motion.div>
        </div>
      </section>
      

      {/* COUNTER SECTION */}
      <section className="bg-neutral-900 py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-between text-center text-white">
          {counters.map((counter, i) => (
            <div key={counter.label} className="w-1/2 md:w-1/4 mb-6">
              <h3 className="text-4xl font-bold">
                {animatedValues[i]}
                {counter.suffix}
              </h3>
              <p className="uppercase tracking-widest text-sm mt-2">
                {counter.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HistorySection;
