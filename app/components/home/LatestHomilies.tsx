"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Homily } from "@prisma/client";
import AnimatedBtutton from "../button/Button";
import SectionHeading from "../heading/SectionHeading";

export default function LatestHomilies({
  homilies,
}: {
  homilies: Partial<Homily>[];
}) {
  const router = useRouter();

  return (
    <main>
      <section className="py-16 px-4 bg-gray-100">
        <SectionHeading
          title="Latest Bishop's Reflections"
          subtitle="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {homilies.length === 0 ? (
              <div className="bg-gray-50 rounded-lg shadow hover:shadow-md transition overflow-hidden mx-auto lg:col-span-3 w-full max-w-xl">
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-2">No reflections</h3>
                  <p className="text-gray-600">
                    There are no reflections at the moment.
                  </p>
                </div>
              </div>
            ) : (
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
                {homilies.map((item, i) => {
                  const slug = item.slug as string | undefined;
                  const title = item.title ?? "Untitled";
                  const image = (item.image as string) ?? "/placeholder.jpg";

                  // Safely parse date (strings from JSON) before formatting
                  const dateStr =
                    item.date
                      ? new Date(item.date as unknown as string).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "long", day: "numeric" }
                        )
                      : "";

                  return (
                    <motion.div
                      key={(item as any).id ?? slug ?? i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
                      onClick={() => slug && router.push(`/homily/${slug}`)}
                      aria-disabled={!slug}
                    >
                      <div className="relative h-48 w-full">
                        <Image
                          src={image}
                          alt={title}
                          fill
                          className="object-cover"
                          sizes="(min-width: 768px) 33vw, 100vw"
                          priority={i < 3}
                        />
                      </div>
                      <div className="p-5">
                        {dateStr && (
                          <p className="text-sm text-gray-500 mb-2">{dateStr}</p>
                        )}
                        <h3 className="text-xl font-semibold text-[#0C1A2B] mb-2">
                          {title}
                        </h3>
                        {item.summary && (
                          <p className="text-sm text-gray-600 line-clamp-3">
                            {item.summary}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* View All Button */}
          <div className="mt-12 text-center">
            <AnimatedBtutton
              href="/homily"
              variant="secondary"
              label="View All Reflections"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
