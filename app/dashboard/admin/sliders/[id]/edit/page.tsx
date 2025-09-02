
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

type Props = { params: Promise<{ id: string }> }; // `id` is the current slug

function normalizeImage(input: string | null | undefined) {
  if (!input) return undefined;
  const s = String(input).trim();
  if (!s) return undefined;
  if (s.startsWith("/")) return s; // public/ path (e.g. /assets/pic.jpg)
  if (s.startsWith("http://") || s.startsWith("https://")) return s; // absolute URL
  throw new Error("Image must start with / (public path) or https:// (remote URL).");
}

async function updateAnnouncementAction(oldSlug: string, formData: FormData) {
  "use server";

  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const dateStr = String(formData.get("date") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const details = String(formData.get("details") ?? "").trim();
  const image = normalizeImage(formData.get("image")?.toString());

  if (!title || !slug || !dateStr) {
    throw new Error("Title, slug, and date are required.");
  }

  await prisma.announcement.update({
    where: { slug: oldSlug },
    data: {
      title,
      slug,
      date: new Date(dateStr),
      image,
      description,
      details,
    },
  });

  // Refresh admin list and public detail
  revalidatePath("/dashboard/announcements");
  revalidatePath(`/announcements/${slug}`);

  redirect("/dashboard/announcements");
}

async function deleteAnnouncementAction(slug: string) {
  "use server";
  await prisma.announcement.delete({ where: { slug } });
  revalidatePath("/dashboard/announcements");
  redirect("/dashboard/announcements");
}

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
            <label className="block text-sm font-medium">Image URL (optional)</label>
            <input
              name="image"
              defaultValue={item.image ?? ""}
              className="mt-1 w-full rounded-lg border px-3 py-2"
              placeholder="/assets/building1.jpg or https://example.com/image.jpg"
            />
            <p className="mt-1 text-xs text-slate-500">
              Use a path from <code>public/</code> starting with <code>/</code> or a full <code>https://</code> URL.
            </p>
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

          <form action={deleteAnnouncementAction.bind(null, id)}>
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
