'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { piousOrganizations } from '@/lib/organ';

export default function PiousOrganizationsSection() {
  return (
    <section className="py-10 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {piousOrganizations.map((org, i) => (
            <motion.div
              key={org.id}
              className="bg-white rounded-xl shadow hover:shadow-2xl hover:cursor-pointer text-center transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              {/* Fixed aspect ratio container */}
              <div className="mx-auto mb-4 w-full aspect-[4/3] relative">
                <Image
                  src={org.image}
                  alt={org.title}
                  fill
                  className="object-cover rounded-t-lg object-top"
                  quality={90}
                  loading="lazy"
                  decoding="async"
                  priority={false}
                  draggable={false}
                />
              </div>

              <div className='px-2 py-2'><h3 className="text-xl font-semibold mb-2">{org.title}</h3>
              <p className="text-sm text-gray-700 mb-2">{org.description}</p>
              <p className="text-sm font-medium text-[#228B22]">
                Chaplain: {org.chaplain}
              </p></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
