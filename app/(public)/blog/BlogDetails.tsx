import { Blog } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function BlogDetails({ blog }: { blog: Blog }) {
  return (
    <article
      className="max-w-3xl mx-auto p-6 pt-28 md:pt-32"
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      <meta itemProp="author" content="Verbum Networks" />
      <meta itemProp="datePublished" content={blog.date.toISOString()} />
      <meta itemProp="image" content={blog.image} />

      <Link
        href="/blog"
        className="text-green-600 hover:underline mb-4 inline-block"
      >
        ← Back to Blogs
      </Link>

      <h1
        itemProp="headline"
        className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 font-serif"
      >
        {blog.title}
      </h1>
      <div className="relative mt-6 h-96 w-full overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-contain"
          priority
        />
      </div>
      {/* <div className="relative w-full h-96 rounded-lg overflow-hidden mb-6">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
      </div> */}

      <p className="text-sm text-gray-500 mb-6" itemProp="datePublished">
        {blog.date.toDateString()}
      </p>

      <div
        className="prose prose-lg text-gray-700 tracking-wider  text-justify leading-relaxed"
        itemProp="articleBody"
      >
        {blog.content}
      </div>
    </article>
  );
}
