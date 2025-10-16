'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { piousOrganizations } from '@/lib/organ';

export default function PiousOrganizationsSection() {
  return (
    <section className="py-10 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Catholic Pious Societies & Organizations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {piousOrganizations.map((org, i) => (
            <motion.div
              key={org.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:cursor-pointer text-left overflow-hidden transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={org.image}
                  alt={org.title}
                  fill
                  className="object-cover rounded-t-2xl"
                  quality={90}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {org.title}
                </h3>

                <p className="text-sm text-gray-700 mb-2">
                  {org.description}
                </p>

                {org.founded && (
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold text-gray-800">Founded:</span>{" "}
                    {org.founded}
                  </p>
                )}

                {org.origin && (
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold text-gray-800">Origin:</span>{" "}
                    {org.origin}
                  </p>
                )}

                {org.mission && (
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-semibold text-gray-800">Mission:</span>{" "}
                    {org.mission}
                  </p>
                )}

                <p className="text-sm font-medium text-[#228B22]">
                  Chaplain: {org.chaplain}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

