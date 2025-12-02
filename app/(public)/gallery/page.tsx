import PageBanner from "@/app/components/banner/PageBanner";
import GalleryClient from "@/app/components/gallery/Gallery";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 6;

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const page = parseInt((await searchParams).page || "1", 10);
  const skip = (page - 1) * ITEMS_PER_PAGE;

  const totalItems = await prisma.galleryImage.count();

  const images = await prisma.galleryImage.findMany({
    skip,
    take: ITEMS_PER_PAGE,
    orderBy: { createdAt: "desc" },
  });

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <main>
      <PageBanner
        title="Diocesan Gallery"
        subtitle="Explore photos of our parishes, liturgies, outreaches, and diocesan events."
        backgroundImage="/assets/groto.jpg"
      />

      <GalleryClient images={images} />

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-10 w-full max-w-6xl mx-auto px-4 pb-16">
        <Link
          href={{
            pathname: "/gallery",
            query: { page: Math.max(page - 1, 1) },
          }}
          className={`flex items-center gap-1 px-3 py-2 border rounded ${
            page === 1 ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <ChevronLeft /> Prev
        </Link>

        <p>
          Showing {(page - 1) * ITEMS_PER_PAGE + 1} -{" "}
          {Math.min(page * ITEMS_PER_PAGE, totalItems)} of {totalItems} images
        </p>

        <Link
          href={{
            pathname: "/gallery",
            query: { page: Math.min(page + 1, totalPages) },
          }}
          className={`flex items-center gap-1 px-3 py-2 border rounded ${
            page === totalPages ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          Next <ChevronRight />
        </Link>
      </div>
    </main>
  );
}
