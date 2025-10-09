
import { updateEvent } from "@/app/dashboard/actions/update";
import prisma from "@/lib/prisma";
import { isObjectId } from "@/lib/slugify";
import Image from "next/image";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditEventPage({ params }: PageProps) {
  const { id: slug } = await params;
  if (!slug) return notFound();
  const where = isObjectId(slug) ? { id: slug } : { slug };
  const ev = await prisma.event.findUnique({ where });
  if (!ev) return notFound();
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Edit Event</h2>
      <form action={updateEvent.bind(null, slug)} className="space-y-4" encType="multipart/form-data">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700">
            Title
          </label>
          <input
            id="title"
            name="title"
            defaultValue={ev.title}
            placeholder="Event Title"
            className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
         
          <input
            type="hidden"
            id="slug"
            name="slug"
            defaultValue={ev.slug}
            placeholder="event-slug"
            className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-slate-700">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={ev.date.toISOString().split("T")[0]}
            className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <p className="mt-1 text-sm text-slate-500">
            Current: <Image src={ev.cover} alt="cover" width={100} height={100} loading="lazy" />
          </p>
          {/* <label htmlFor="cover" className="block text-sm font-medium text-slate-700">
            Cover Image
          </label>
          <input
            id="cover"
            name="cover"
            type="file"
            accept="image/*"
            width={400}
            height={300}
            className="w-full border rounded p-2 mt-1"
          /> */}
        </div>

        <div>
          <div className="mt-1 text-sm text-slate-500">
            Current: {ev.images.length > 0 ? (
              <div className="flex flex-wrap gap-3 ">
                {ev.images.map((img, index) => (
                <Image key={index} src={img} alt="additional" width={100} height={100} />
              ))}
              </div>
              
            ) : (
              "None"
            )}
          </div>
          {/* <label htmlFor="images" className="block text-sm font-medium text-slate-700">
            Additional Images
          </label>
          <input
            id="images"
            name="images"
            type="file"
            accept="image/*"
            multiple
            width={400}
            height={300}
            className="w-full border rounded p-2 mt-1"
          /> */}
        
        </div>

        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-slate-700">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            defaultValue={ev.excerpt}
            placeholder="Short description"
            className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-slate-700">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            defaultValue={ev.content}
            placeholder="One paragraph per line"
            className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={6}
          />
         
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Update
          </button>
          <a
            href="/dashboard/admin/events"
            className="px-4 py-2 border rounded hover:bg-slate-50"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}