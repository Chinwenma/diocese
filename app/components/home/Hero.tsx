"use client";

import { cormorant } from "@/font";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import { motion } from "framer-motion";
import { Slider } from "@prisma/client";

export default function HeroCarousel({ slideData }: { slideData: Slider[] }) {
  const progressRef = useRef<HTMLDivElement>(null);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full h-[50vh] md:h-[80vh] overflow-hidden"
    >
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        onAutoplayTimeLeft={(_, time, progress) => {
          if (progressRef.current) {
            progressRef.current.style.width = `${progress * 10}%`;
            progressRef.current.setAttribute("aria-valuenow", time.toFixed(0));
          }
        }}
        className="w-full h-full"
      >
        {slideData.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className="flex flex-col-reverse md:flex-row w-full h-full">
              {/* Text Content */}
              <div className="hidden md:flex-1 md:flex flex-col justify-center items-center text-center px-6 md:px-16 bg-white">
                <motion.h2
                  className={`${cormorant.className} text-4xl md:text-6xl font-extrabold`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {slide.title}
                </motion.h2>

                <motion.h3
                  className="text-3xl font-bold mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {slide.subtitle}
                </motion.h3>

                <motion.p
                  className="mt-4 text-sm md:text-base max-w-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {slide.text}
                </motion.p>
              </div>

              {/* Image Content */}
              <div className="flex-1 relative w-full h-full ">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top w-full"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Arrows */}
        <div className="swiper-button-prev !flex !items-center !justify-center !text-black !text-3xl z-30">
          <ChevronLeft />
        </div>
        <div className="swiper-button-next !flex !items-center !justify-center !text-yellow-500 !text-3xl z-30">
          <ChevronRight />
        </div>

        {/* Progress Bar */}
        <div className="absolute top-0 left-0 h-[4px] w-full bg-gray-300 z-40">
          <div
            ref={progressRef}
            className="h-full bg-yellow-600 ease-linear"
            style={{ transition: "width 0.1s linear" }}
          />
        </div>
      </Swiper>
    </motion.div>
  );
}
