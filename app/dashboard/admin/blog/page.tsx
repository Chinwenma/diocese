import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import ConfirmDelete from "@/app/components/button/confirmDeleteButton";

export const dynamic = "force-dynamic";

type Props = {
  params?: Promise<{
    page?: string;
    pageSize?: string;
  }>;
};

export default async function BlogList({ params }: Props) {
  // 1) Read & normalize query param
  const searchParams = await params;
  const page = Math.max(1, Number((await searchParams?.page) ?? 1) || 1);
  const pageSize = Math.min(
    50,
    Math.max(1, Number(searchParams?.pageSize ?? 5) || 10)
  );
  const skip = (page - 1) * pageSize;

  // 2) Query DB
  const [total, items] = await Promise.all([
    prisma.blog.count(),
    prisma.blog.findMany({
      orderBy: { date: "desc" },
      select: { title: true, slug: true, image: true, id: true },
      skip,
      take: pageSize,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // 3) Helper to build page links
  const q = (p: number) => {
    const params = new URLSearchParams();
    params.set("page", String(p));
    params.set("pageSize", String(pageSize));
    return `/dashboard/blog?${params.toString()}`;
  };

  return (
    <div className="p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">News</h2>
          <p className="text-sm text-slate-500">
            Create, edit and manage News Artcles, newsletters .
          </p>
        </div>

        <Link
          href="/dashboard/admin/blog/new"
          className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
        >
          <span>+ Add New</span>
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
                      {a.image ? (
                        <Image
                          src={a.image}
                          alt={a.title}
                          fill
                          loading="lazy"
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{a.title}</td>
                  <td className="px-4 py-3 text-slate-500">{a.slug}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-3">
                      <Link
                        className="text-blue-700 hover:underline"
                        href={`/dashboard/admin/blog/${a.slug}/view`}
                      >
                        View
                      </Link>
                      <Link
                        className="text-emerald-700 hover:underline"
                        href={`/dashboard/admin/blog/${a.slug}/edit`}
                      >
                        Edit
                      </Link>
                     
                      <div>
                        <ConfirmDelete
                          title="Delete news"
                          message={`This will permanently delete “${a.title}”.`}
                          busyText="Deleting..."
                          id={a.id}
                          module="blog"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}

              {items.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-slate-500" colSpan={4}>
                    No news yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 4) Pagination controls */}
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

            {/* simple numbered pages (max 5) */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // center the window around current page when possible
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
