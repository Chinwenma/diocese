import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

type PageProps = { params: Promise<{ id: string }> };

function opt(v: unknown) {
  const s = String(v ?? "").trim();
  return s.length ? s : null; // convert empty strings -> null for optional fields
}

async function updateClergy(id: string, formData: FormData) {
  "use server";

  const name = String(formData.get("name") || "").trim();
  const role = String(formData.get("role") || "").trim();
  const parish = String(formData.get("parish") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const phone = opt(formData.get("phone"));
  const extra = opt(formData.get("extra"));

  if (!name || !role || !parish || !address) {
    throw new Error("Name, role, parish, and address are required.");
  }

  await prisma.clergy.update({
    where: { id },
    data: { name, role, parish, address, phone, extra },
  });

  revalidatePath("/dashboard/clergy");
  revalidatePath("/");
  revalidatePath("/clergy");
  revalidatePath(`/clergy/${id}`);
  redirect("/dashboard/clergy");
}

export default async function EditClergyPage({ params }: PageProps) {
  const { id } = await params;

  const item = await prisma.clergy.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      role: true,
      parish: true,
      address: true,
      phone: true,
      extra: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!item) return notFound();

  return (
    <div className="max-w-2xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Edit Clergy</h1>
        <a href="/dashboard/clergy" className="rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50">
          ← Back
        </a>
      </div>

      <form action={updateClergy.bind(null, id)} className="space-y-5 rounded-2xl border bg-white p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              name="name"
              defaultValue={item.name}
              required
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />
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
            <label className="block text-sm font-medium">Phone (optional)</label>
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
            Last updated {item.updatedAt.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
          </p>
          <div className="flex gap-3">
            <button type="submit" className="rounded-xl bg-amber-500 px-4 py-2 text-white hover:bg-amber-600">
              Save changes
            </button>
            <a href="/dashboard/clergy" className="rounded-xl border px-4 py-2 hover:bg-slate-50">
              Cancel
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
