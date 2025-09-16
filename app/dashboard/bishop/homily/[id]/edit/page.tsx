
import { updateHomilyAction } from "@/app/dashboard/actions/update";
import prisma from "@/lib/prisma";
import { isObjectId } from "@/lib/slugify";
import Image from "next/image";

import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> }; 



export default async function EditHomilyPage({ params }: Props) {
  const { id: slug } = await params;
  if (!slug) return notFound();
  const where = isObjectId(slug) ? { id: slug } : { slug};
  const item = await prisma.homily.findUnique({ where});
  if (!item) return notFound();

  const isoDate = new Date(item.date).toISOString().slice(0, 10);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Edit Homily</h1>
        <Link
          href="/dashboard/homily"
          className="rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50"
        >
          ← Back
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr,16rem]">
        {/* Form */}
        <form
          action={updateHomilyAction.bind(null, slug)}
          className="space-y-4 rounded-2xl border bg-white p-5"
        >
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              name="title"
              defaultValue={item.title}
              required
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">Slug</label>
              <input
                name="slug"
                defaultValue={item.slug}
                required
                className="mt-1 w-full rounded-lg border px-3 py-2"
                placeholder="ordination-rev-john-doe"
              />
             
            </div>
            <div>
              <label className="block text-sm font-medium">Date</label>
              <input
                name="date"
                type="date"
                defaultValue={isoDate}
                required
                className="mt-1 w-full rounded-lg border px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Image URL (optional)</label>
            <input
              name="image"
              type="file"
              // defaultValue={item.image ?? ""}
              accept="image/*"
              id="image"
              className="mt-1 w-full rounded-lg border px-3 py-2"
             
            />
          </div>

          <div>
            <p className="mt-1 text-sm text-slate-500">
                          Current:{""}
                        <Image src={item.image} alt="image" width={100} height={100} loading="lazy"/>
                        </p>
            <label className="block text-sm font-medium">Short description</label>
            <textarea
              name="description"
              rows={3}
              defaultValue={item.summary ?? ""}
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Details</label>
            <textarea
              name="details"
              rows={8}
              defaultValue={item.content ?? ""}
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-xl bg-amber-500 px-4 py-2 text-white hover:bg-amber-600"
            >
              Save changes
            </button>
            <Link
              href="/dashboard/bishop/homily"
              className="rounded-xl border px-4 py-2 hover:bg-slate-50"
            >
              Cancel
            </Link>
          </div>
        </form>

        {/* Current thumbnail & delete */}
        <div className="space-y-4">
          <div className="rounded-2xl border bg-white p-4">
            <div className="text-sm font-medium mb-3">Current image</div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-slate-100">
              {item.image ? (
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-xs text-slate-500">
                  No image
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
