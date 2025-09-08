import { Blog } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function BlogDetails({ blog }: { blog: Blog }) {
  return (
    <article className="max-w-3xl mx-auto  p-6 pt-28 md:pt-32">
      {/* Back Button */}
      <Link
        href="/blog"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to Blogs
      </Link>

      {/* Blog Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 font-serif">
        {blog.title}
      </h1>

      {/* Blog Image */}
      <div className="relative w-full h-96 rounded-lg overflow-hidden mb-6">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Blog Date */}
      <p className="text-sm text-gray-500 mb-6">{blog.date.toDateString()}</p>

      {/* Blog Content */}
      <div className="prose prose-lg text-gray-700 leading-relaxed max-w-lg text-wrap">
        {blog.content}
      </div>
    </article>
  );
}
