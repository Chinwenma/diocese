import prisma from "@/lib/prisma";
import EventGrid from "./EventGrid";
import { Suspense } from "react";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

export const metadata = { title: "Events" };

export default async function EventsPage({ searchParams }: { searchParams: Promise<{ search?: string; page?: string }> }) {
  const params = await searchParams;
  const search = params?.search || "";
  const page = Number(params?.page) || 1;
  const pageSize = 4;

  const where: Prisma.EventWhereInput = search
    ? {
      title: {
        contains: search,
        mode: "insensitive" as Prisma.QueryMode,
      },
    }
    : {};

  const [events, totalEvents] = await Promise.all([
    prisma.event.findMany({
      where,
      orderBy: { date: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.event.count({ where }),
  ]);

  const totalPages = Math.ceil(totalEvents / pageSize);

  if (page < 1 || (page > totalPages && totalEvents > 0)) {
    redirect("/event");
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">All Events</h1>
      <p className="mt-2 text-slate-600">
        Browse reflections, stories, and special celebrations.
      </p>

      {/* Search Form */}
      <form className="mt-6 flex gap-4" method="GET" action="/event">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search events..."
          className="w-full max-w-md rounded-md border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D6A739] focus:border-transparent cursor-pointer" 
        />
        <button
          type="submit"
          className="rounded-md bg-[#D6A739] px-4 py-2 text-white hover:opacity-90"
        >
          Search
        </button>
      </form>

      {/* Event Grid */}
      <Suspense fallback={<div>Loading events...</div>}>
        <div className="mt-10">
          <EventGrid items={events} />
        </div>
      </Suspense>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-4">
          <a
            href={`/event?page=${Math.max(1, page - 1)}${search ? `&search=${encodeURIComponent(search)}` : ""}`}
            className={`px-4 py-2 rounded-md ${
              page === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-[#D6A739] text-white hover:opacity-90"
            }`}
            aria-disabled={page === 1}
          >
            Previous
          </a>
          <span className="px-4 py-2 text-slate-600">
            Page {page} of {totalPages}
          </span>
          <a
            href={`/event?page=${Math.min(totalPages, page + 1)}${search ? `&search=${encodeURIComponent(search)}` : ""}`}
            className={`px-4 py-2 rounded-md ${
              page === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-[#D6A739] text-white hover:bg-blue-700"
            }`}
            aria-disabled={page === totalPages}
          >
            Next
          </a>
        </div>
      )}
    </main>
  );
}