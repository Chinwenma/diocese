import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import ConfirmDelete from "@/app/components/button/confirmDeleteButton";

export const dynamic = "force-dynamic";

type Props = {
  searchParams?: Promise<{
    page?: string;
    pageSize?: string;
  }>;
};

export default async function AnnouncementsList({ searchParams }: Props) {
  // ✅ Await searchParams (required in Next.js 15+)
  const params = await searchParams;

  // ✅ Safely read and normalize query params
  const page = Math.max(1, Number(params?.page) || 1);
  const pageSize = Math.min(50, Math.max(1, Number(params?.pageSize) || 10));
  const skip = (page - 1) * pageSize;

  // ✅ Query database
  const [total, items] = await Promise.all([
    prisma.announcement.count(),
    prisma.announcement.findMany({
      orderBy: { date: "desc" },
      select: { title: true, slug: true, image: true, id: true },
      skip,
      take: pageSize,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // ✅ Helper for pagination URLs
  const q = (p: number) => {
    const query = new URLSearchParams();
    query.set("page", String(p));
    query.set("pageSize", String(pageSize));
    return `/dashboard/admin/announcements?${query.toString()}`;
  };

  return (
    <div className="p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Announcements</h2>
          <p className="text-sm text-slate-500">
            Create, edit and manage announcements.
          </p>
        </div>

        <Link
          href="/dashboard/admin/announcements/new"
          className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
        >
          + Add New
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr className="text-left text-slate-600">
                <th className="px-4 py-3 font-medium">Image</th>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Slug</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((a) => (
                <tr key={a.slug} className="border-t">
                  <td className="px-4 py-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-slate-100">
                      {a.image && (
                        <Image
                          src={a.image}
                          alt={a.title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{a.title}</td>
                  <td className="px-4 py-3 text-slate-500">{a.slug}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-3">
                      <Link
                        className="text-blue-700 hover:underline"
                        href={`/dashboard/admin/announcements/${a.slug}/view`}
                      >
                        View
                      </Link>
                      <Link
                        className="text-emerald-700 hover:underline"
                        href={`/dashboard/admin/announcements/${a.slug}/edit`}
                      >
                        Edit
                      </Link>
                      <ConfirmDelete
                        title="Delete announcement"
                        message={`This will permanently delete “${a.title}”.`}
                        busyText="Deleting..."
                        id={a.id}
                        module="announcement"
                      />
                    </div>
                  </td>
                </tr>
              ))}

              {items.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-slate-500" colSpan={4}>
                    No announcements yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ✅ Pagination controls */}
        <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-slate-500">
            Page <span className="font-medium text-slate-700">{page}</span> of{" "}
            <span className="font-medium text-slate-700">{totalPages}</span> ·{" "}
            {total} total
          </div>

          <div className="flex items-center gap-2">
            <Link
              aria-disabled={page <= 1}
              className={`rounded-lg border px-3 py-1.5 text-sm ${
                page <= 1
                  ? "pointer-events-none opacity-40"
                  : "hover:bg-slate-50"
              }`}
              href={q(Math.max(1, page - 1))}
            >
              ← Prev
            </Link>

            {/* Numbered pages (max 5) */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const start = Math.max(1, Math.min(page - 2, totalPages - 4));
              const p = start + i;
              if (p > totalPages) return null;
              const isActive = p === page;
              return (
                <Link
                  key={p}
                  href={q(p)}
                  className={`rounded-lg px-3 py-1.5 text-sm ${
                    isActive
                      ? "bg-amber-500 text-white"
                      : "border hover:bg-slate-50"
                  }`}
                >
                  {p}
                </Link>
              );
            })}

            <Link
              aria-disabled={page >= totalPages}
              className={`rounded-lg border px-3 py-1.5 text-sm ${
                page >= totalPages
                  ? "pointer-events-none opacity-40"
                  : "hover:bg-slate-50"
              }`}
              href={q(Math.min(totalPages, page + 1))}
            >
              Next →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
