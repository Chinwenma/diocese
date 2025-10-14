import ConfirmDelete from "@/app/components/button/confirmDeleteButton";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function ClergyPage() {
  const clergy = await prisma.clergy.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Clergy List</h1>
        <Link
          href="/dashboard/admin/clergy/new"
          className="rounded-lg border px-4 py-2 text-sm hover:bg-slate-50"
        >
          + Add New Clergy
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Parish</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Created</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clergy.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-slate-500"
                >
                  No clergy added yet.
                </td>
              </tr>
            ) : (
              clergy.map((c) => (
                <tr key={c.id} className="border-t hover:bg-slate-50">
                  <td className="px-4 py-2 font-medium">{c.name}</td>
                  <td className="px-4 py-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-slate-100">
                      {c.image ? (
                        <Image
                          src={c.image}
                          alt={c.name}
                          fill
                          loading="lazy"
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                  </td>

                  <td className="px-4 py-2">{c.role}</td>
                  <td className="px-4 py-2">{c.parish}</td>
                  <td className="px-4 py-2">{c.phone || "-"}</td>
                  <td className="px-4 py-2">
                    {c.createdAt.toLocaleDateString("en-US")}
                  </td>
                  <td className="px-4 py-2 text-right space-x-3">
                    <Link
                      href={`/dashboard/admin/clergy/${c.id}/view`}
                      className="text-emerald-700 hover:underline"
                    >
                      View
                    </Link>
                    <Link
                      href={`/dashboard/admin/clergy/${c.id}/edit`}
                      className="text-blue-700 hover:underline"
                    >
                      Edit
                    </Link>

                    <div>
                      <ConfirmDelete
                        title="Delete Priest"
                        message={`This will permanently delete “${c.name}”.`}
                        busyText="Deleting..."
                        id={c.id}
                        module="clergy"
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
