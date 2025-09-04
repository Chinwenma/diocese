import BlogCard from "./BlogCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

import PageBanner from "../../components/banner/PageBanner";
import prisma from "@/lib/prisma";
import Link from "next/link";
const ITEMS_PER_PAGE = 3;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const query = (await searchParams).q?.trim() || "";
  const page = parseInt((await searchParams).page || "1", 10);
  const skip = (page - 1) * ITEMS_PER_PAGE;

  const where = query
    ? {
        OR: [
          { title: { contains: query, mode: "insensitive" as const } },
          { slug: { contains: query, mode: "insensitive" as const } },
          { excerpt: { contains: query, mode: "insensitive" as const } },
          { content: { contains: query, mode: "insensitive" as const } },
        ],
      }
    : {};

  const totalItems = await prisma.blog.count({ where });

  const blogs = await prisma.blog.findMany({
    where,
    skip,
    take: ITEMS_PER_PAGE,
    orderBy: { date: "asc" },
  });
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <div>
      <PageBanner
        title="Blog Posts"
        subtitle="Learn more about our mission and values"
        backgroundImage="/assets/popeleo.jpeg"
      />{" "}
      <section className="w-full py-12 px-4 flex flex-col items-center gap-10 max-w-6xl mx-auto">
      
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
          {blogs.map((post, i) => (
            <BlogCard key={post.id} {...post} index={i} />
          ))}
        </div>
         <div className="flex justify-between items-center mt-10 w-full max-w-6xl mx-auto">
        <Link
          href={{
            pathname: "/blog",
            query: { q: query, page: Math.max(page - 1, 1) },
          }}
          className={`flex items-center gap-1 px-3 py-2 border rounded ${
            page === 1 ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <ChevronLeft /> Prev
        </Link>

        <p>
          Showing {(page - 1) * ITEMS_PER_PAGE + 1} -{" "}
          {Math.min(page * ITEMS_PER_PAGE, totalItems)} of {totalItems} results
        </p>

        <Link
          href={{
            pathname: "/blog",
            query: { q: query, page: Math.min(page + 1, totalPages) },
          }}
          className={`flex items-center gap-1 px-3 py-2 border rounded ${
            page === totalPages ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          Next <ChevronRight />
        </Link>
      </div>
      </section>
     
    </div>
  );
}
