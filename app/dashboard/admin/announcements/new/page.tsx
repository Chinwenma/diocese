"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { IKUpload, ImageKitProvider } from "imagekitio-next";
import { toast } from "react-toastify";
import Image from "next/image";
import { getImageAuth } from "@/lib/imageKit";
import slugifyWithUniqueSuffix from "@/lib/slugify";
import { createAnnouncement } from "@/app/dashboard/actions/create";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export interface AnnouncementFormData {
  title: string;
  slug: string;
  date: string;
  image: string;
  description: string;
  details: string;
}

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

export default function NewAnnouncementPage() {
  const [formData, setFormData] = useState<AnnouncementFormData>({
    title: "",
    slug: "",
    date: "",
    image: "",
    description: "",
    details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [errors, setErrors] = useState<Partial<AnnouncementFormData>>({});
  const router = useRouter();

  // Auto-generate slug with unique suffix
  useEffect(() => {
    if (formData.title) {
      setFormData((prev) => ({
        ...prev,
        slug: slugifyWithUniqueSuffix(formData.title),
      }));
    }
  }, [formData.title]);

  // ✅ Validation function
  const validateForm = () => {
    const newErrors: Partial<AnnouncementFormData> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.slug.trim()) newErrors.slug = "Slug is required";
    if (!formData.details.trim()) newErrors.details = "Details are required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.date.trim()) newErrors.date = "Date is required";
    if (!formData.image.trim()) newErrors.image = "Image is required";
    return newErrors;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof AnnouncementFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await createAnnouncement(formData);
      toast.success("Announcement created successfully");
      setFormData({
        title: "",
        slug: "",
        date: "",
        image: "",
        description: "",
        details: "",
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Image Upload Handlers
  const onImageUploadStart = () => setIsImageUploading(true);
  const onImageUploadSuccess = (res: any) => {
    setFormData((prev) => ({ ...prev, image: res.url })); // ✅ Correct field name
    toast.success("Image uploaded successfully");
    setIsImageUploading(false);
  };
  const onImageUploadError = (err: any) => {
    console.error(err);
    toast.error("Image upload failed");
    setIsImageUploading(false);
  };

  // ✅ Enable save button only when all conditions are met
  const canSave =
    !isSubmitting &&
    !isImageUploading &&
    formData.title.trim() &&
    formData.date.trim() &&
    formData.description.trim() &&
    formData.details.trim() &&
    formData.image;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <ArrowLeft className="cursor-pointer my-4" onClick={() => router.back()} />
      <h1 className="text-2xl font-semibold mb-4">Create New Announcement</h1>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className={`mt-1 w-full rounded-lg border px-3 py-2 ${
              errors.title ? "border-red-500" : ""
            }`}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title}</span>
          )}
        </div>

        <input type="hidden" name="slug" value={formData.slug} />

        <div>
          <label className="block text-sm font-medium">Date</label>
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
            className={`mt-1 w-full rounded-lg border px-3 py-2 ${
              errors.date ? "border-red-500" : ""
            }`}
          />
          {errors.date && (
            <span className="text-red-500 text-sm">{errors.date}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Image</label>
          <ImageKitProvider
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={getImageAuth}
          >
            <IKUpload
              folder={"/katsina/announcements"}
              onSuccess={onImageUploadSuccess}
              onUploadStart={onImageUploadStart}
              onError={onImageUploadError}
              className="mt-1 w-full"
            />
          </ImageKitProvider>

          {isImageUploading && (
            <p className="text-amber-600 text-sm mt-1">Uploading image, please wait...</p>
          )}

          {formData.image && (
            <div className="mt-2">
              <Image
                src={formData.image}
                alt="Preview"
                width={100}
                height={100}
                className="h-20 w-20 object-cover"
                loading="lazy"
              />
            </div>
          )}

          {errors.image && (
            <span className="text-red-500 text-sm">{errors.image}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Short description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 w-full rounded-lg border px-3 py-2"
            required
          />
          {errors.description && (
            <span className="text-red-500 text-sm">{errors.description}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Details</label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            rows={8}
            required
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
          {errors.details && (
            <span className="text-red-500 text-sm">{errors.details}</span>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={!canSave}
            className={`rounded-xl px-4 py-2 text-white transition ${
              canSave
                ? "bg-amber-500 hover:bg-amber-600"
                : "opacity-50 cursor-not-allowed bg-gray-300"
            }`}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
