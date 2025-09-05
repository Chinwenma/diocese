import prisma from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import ConfirmDelete from "@/app/components/button/confirmDeleteButton";

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const params = await searchParams;
  const search = params?.search || "";
  const page = Number(params?.page) || 1;
  const pageSize = 10;

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
    redirect("/dashboard/admin/events");
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Events</h1>
        <Link
          href="/dashboard/admin/events/new"
          className="bg-[#D6A739] text-white px-4 py-2 rounded-lg"
        >
          + New Event
        </Link>
      </div>

      {/* Search Form */}
      <form action="/dashboard/admin/events" method="GET" className="mb-6">
        <input
          type="text"
          name="search"
          placeholder="Search events by title..."
          defaultValue={search}
          className="w-full max-w-md p-2 border rounded-lg"
        />
        <button
          type="submit"
          className="ml-2 bg-[#D6A739] text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </form>

      {/* Events Table */}
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Title</th>
            <th className="p-2">Date</th>
            <th className="p-2">Excerpt</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-2 text-center">
                No events found
              </td>
            </tr>
          ) : (
            events.map((ev) => (
              <tr key={ev.id} className="border-t">
                <td className="p-2">{ev.title}</td>
                <td className="p-2">
                  {new Date(ev.date).toLocaleDateString()}
                </td>
                <td className="p-2">{ev.excerpt}</td>
                <td className="p-2 flex gap-3">
                  <Link
                    href={`/dashboard/admin/events/${ev.slug}/view`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                  <Link
                    href={`/dashboard/admin/events/${ev.slug}/edit`}
                    className="text-green-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <div>
                    <ConfirmDelete
                      title="Delete announcement"
                      message={`This will permanently delete “${ev.title}”.`}
                      busyText="Deleting..."
                      id={ev.id}
                      module="event"
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 0 && (
        <div className="mt-6 flex justify-between items-center">
          <div>
            Showing {(page - 1) * pageSize + 1} to{" "}
            {Math.min(page * pageSize, totalEvents)} of {totalEvents} events
          </div>
          <div className="flex gap-2">
            <Link
              href={{
                pathname: "/dashboard/admin/events",
                query: {
                  ...(search && { search }),
                  ...(page > 1 && { page: page - 1 }),
                },
              }}
              className={`px-4 py-2 rounded-lg ${
                page === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#D6A739] text-white"
              }`}
            >
              Previous
            </Link>
            <Link
              href={{
                pathname: "/dashboard/admin/events",
                query: {
                  ...(search && { search }),
                  ...(page < totalPages && { page: page + 1 }),
                },
              }}
              className={`px-4 py-2 rounded-lg ${
                page === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#D6A739] text-white"
              }`}
            >
              Next
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
