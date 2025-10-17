"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { IKUpload, ImageKitProvider } from "imagekitio-next";
import { toast } from "react-toastify";
import Image from "next/image";
import { getImageAuth } from "@/lib/imageKit";
import slugifyWithUniqueSuffix from "@/lib/slugify";
import { useRouter } from "next/navigation";
import { createClergy } from "@/app/dashboard/actions/create";
import { FormEvent, useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

export interface ClergyFormData {
  name: string;
  role: string;
  parish: string;
  image?: string;
  address: string;
  phone?: string;
  extra?: string;
  slug?: string;
}

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

export default function NewClergyPage() {
  const [formData, setFormData] = useState<ClergyFormData>({
    name: "",
    image: "",
    role: "",
    parish: "",
    phone: "",
    address: "",
    extra: "",
    slug: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [errors, setErrors] = useState<Partial<ClergyFormData>>({});
  const router = useRouter();

  // Auto-generate slug from name
  useEffect(() => {
    if (formData.name) {
      setFormData((prev) => ({
        ...prev,
        slug: slugifyWithUniqueSuffix(formData.name),
      }));
    }
  }, [formData.name]);

  /** ✅ Form validation */
  const validateForm = () => {
    const newErrors: Partial<ClergyFormData> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.role.trim()) newErrors.role = "Role is required";
    if (!formData.parish.trim()) newErrors.parish = "Parish is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    return newErrors;
  };

  /** ✅ Handle input change */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ClergyFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  /** ✅ Handle form submit */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error("Please fill in all required fields");
      return;
    }

    if (isImageUploading) {
      toast.error("Please wait for image upload to finish");
      return;
    }

    setIsSubmitting(true);

    try {
      await createClergy(formData);
      toast.success("Clergy created successfully");

      setFormData({
        name: "",
        image: "",
        role: "",
        parish: "",
        phone: "",
        address: "",
        extra: "",
        slug: "",
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  /** ✅ Handle image upload events */
  const onImageUploadStart = () => setIsImageUploading(true);

  const onImageUploadSuccess = (res: any) => {
    setFormData((prev) => ({ ...prev, image: res.url }));
    toast.success("Image uploaded successfully");
    setIsImageUploading(false);
  };

  const onImageUploadError = (err: any) => {
    console.error(err);
    toast.error("Image upload failed");
    setIsImageUploading(false);
  };

  /** ✅ Enable submit button only when form is valid */
  const canSave =
    !isSubmitting &&
    !isImageUploading &&
    formData.name.trim() &&
    formData.role.trim() &&
    formData.parish.trim() &&
    formData.address.trim() &&
    formData.image;

  return (
    <div className="max-w-2xl p-6">
      <ArrowLeft
        className="cursor-pointer my-4"
        onClick={() => router.back()}
      />
      <div className="mb-4">
        <h1 className="text-xl font-semibold">Add New Clergy</h1>
        <p className="text-sm text-slate-500">
          Fill the form to create a new clergy record.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border bg-white p-5"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border px-3 py-2"
              placeholder="e.g. Rev. John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Role</label>
            <input
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border px-3 py-2"
              placeholder="e.g. Parish Priest"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Parish</label>
            <input
              name="parish"
              required
              value={formData.parish}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border px-3 py-2"
              placeholder="e.g. St. Mary’s Parish"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
              className="mt-1 w-full rounded-lg border px-3 py-2"
              placeholder="+234 801 234 5678"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="Parish house address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Image</label>
          <ImageKitProvider
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={getImageAuth}
          >
            <IKUpload
              folder={"/katsina/clergy"}
              onSuccess={onImageUploadSuccess}
              onUploadStart={onImageUploadStart}
              onError={onImageUploadError}
              className="mt-1 w-full"
            />
          </ImageKitProvider>

          {isImageUploading && (
            <p className="text-amber-600 text-sm mt-1">
              Uploading image, please wait...
            </p>
          )}

          {formData.image && (
            <div className="mt-2">
              <Image
                src={formData.image}
                alt="Preview"
                width={100}
                height={100}
                className="h-20 w-20 object-cover rounded"
                loading="lazy"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Extra (optional)</label>
          <textarea
            name="extra"
            rows={4}
            value={formData.extra}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="Any additional notes or responsibilities"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={!canSave}
            className={`rounded-xl bg-amber-500 px-4 py-2 cursor-pointer text-white transition ${
              canSave
                ? "hover:bg-amber-600"
                : "cursor-not-allowed hover:bg-amber-500 opacity-50"
            }`}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
