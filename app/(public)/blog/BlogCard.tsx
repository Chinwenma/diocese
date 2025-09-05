'use client';

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  index: number;
}

const BlogCard: FC<BlogCardProps> = ({ title, excerpt, image,  id, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
    >
      <div className="relative w-full h-48">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{excerpt}</p>
        <Link
          href={`/blog/${id}`} 
          className="inline-block text-emerald-700 font-medium text-sm hover:underline"
        >
          Read More →
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCard;
