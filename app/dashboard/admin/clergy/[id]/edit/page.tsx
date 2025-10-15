import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updateClergyAction } from "@/app/dashboard/actions/update";
import Image from "next/image";
import Link from "next/link";

type Props = { params: Promise<{ id: string }> };

export default async function EditClergyPage({ params }: Props) {
  const { id } = await params;

  const item = await prisma.clergy.findUnique({
    where: { id },
  });

  if (!item) return notFound();

  return (
    <div className="max-w-2xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Edit Clergy</h1>
        <a
          href="/dashboard/admin/clergy"
          className="rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50"
        >
          ← Back
        </a>
      </div>

      <form
        action={updateClergyAction.bind(null, id)}
        className="space-y-5 rounded-2xl border bg-white p-5"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              name="name"
              defaultValue={item.name}
              required
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />
            ,
            <input type="hidden" name="id" defaultValue={item.id} />
          </div>

          <div>
            <label className="block text-sm font-medium">Role</label>
            <input
              name="role"
              defaultValue={item.role}
              required
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Parish</label>
            <input
              name="parish"
              defaultValue={item.parish}
              required
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Phone (optional)
            </label>
            <input
              name="phone"
              defaultValue={item.phone ?? ""}
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            name="address"
            defaultValue={item.address}
            required
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Image</label>
          <input
            name="image"
            type="file"
            accept="image/*"
            id="image"
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <p className="mt-1 text-sm text-slate-500">Current:</p>

          {item.image ? (
            <Image
              src={item.image}
              alt="Current clergy image"
              width={100}
              height={100}
              loading="lazy"
              className="mt-2 rounded object-cover border"
            />
          ) : (
            <div className="mt-2 flex h-[100px] w-[100px] items-center justify-center rounded border bg-gray-100 text-xs text-gray-500">
              No image uploaded
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Extra (optional)</label>
          <textarea
            name="extra"
            rows={4}
            defaultValue={item.extra ?? ""}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Last updated{" "}
            {item.updatedAt.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-xl bg-amber-500 px-4 py-2 text-white hover:bg-amber-600"
            >
              Save changes
            </button>
            <Link
              href="/dashboard/admin/clergy"
              className="rounded-xl border px-4 py-2 hover:bg-slate-50"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
