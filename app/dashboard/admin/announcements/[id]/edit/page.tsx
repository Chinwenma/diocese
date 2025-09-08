
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { updateAnnouncementAction } from "@/app/dashboard/actions/update";
import { deleteAnnouncement } from "@/app/dashboard/actions/delete";

type Props = { params: Promise<{ id: string }> };

export default async function EditAnnouncementPage({ params }: Props) {
  const { id } = await params;
  const item = await prisma.announcement.findUnique({ where: { slug: id } });
  if (!item) return notFound();

  const isoDate = new Date(item.date).toISOString().slice(0, 10);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Edit Announcement</h1>
        <Link
          href="/dashboard/announcements"
          className="rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50"
        >
          ← Back
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr,16rem]">
        {/* Form */}
        <form
          action={updateAnnouncementAction.bind(null, id)}
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
              <p className="mt-1 text-xs text-slate-500">
                Changing the slug updates the URL (e.g. /announcements/your-slug).
              </p>
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
            <Image src={item.image} alt={item.title} width={100} height={100} />
            <label className="block text-sm font-medium">Image</label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="w-full border rounded p-2 mt-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Short description</label>
            <textarea
              name="description"
              rows={3}
              defaultValue={item.description ?? ""}
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Details</label>
            <textarea
              name="details"
              rows={8}
              defaultValue={item.details ?? ""}
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
              href="/dashboard/announcements"
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

          <form action={deleteAnnouncement.bind(null, id)}>
            <button
              type="submit"
              className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-red-700 hover:bg-red-100"
            >
              Delete announcement
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
