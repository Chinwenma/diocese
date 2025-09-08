
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { updateSliderAction } from "@/app/dashboard/actions/update";

type Props = { params: Promise<{ id: string }> }; // `id` is the current slug

async function deleteSliderAction(id: string) {
  "use server";
  await prisma.slider.delete({ where: { id } });
  revalidatePath("/dashboard/admin/sliders");
  redirect("/dashboard/admin/sliders");
}

export default async function EditSliderPage({ params }: Props) {
  const { id } = await params;
  const item = await prisma.slider.findUnique({ where: { id } });
  if (!item) return notFound();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Edit Slider</h1>
        <Link
          href="/dashboard/sliders"
          className="rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50"
        >
          ← Back
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr,16rem]">
        {/* Form */}
        <form
          action={updateSliderAction.bind(null, id)}
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
            <input type="hidden" name="id" defaultValue={item.id} />
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
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Sub Title</label>
            <textarea
              name="subtitle"
              rows={3}
              defaultValue={item.subtitle ?? ""}
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Text</label>
            <textarea
              name="text"
              rows={8}
              defaultValue={item.text ?? ""}
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
              href="/dashboard/admin/sliders"
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

          <form action={deleteSliderAction.bind(null, id)}>
            <button
              type="submit"
              className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-red-700 hover:bg-red-100"
            >
              Delete slider
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
