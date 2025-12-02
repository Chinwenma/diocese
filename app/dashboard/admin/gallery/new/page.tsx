/* eslint-disable @typescript-eslint/no-explicit-any */


"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { IKUpload, ImageKitProvider } from "imagekitio-next";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import slugifyWithUniqueSuffix from "@/lib/slugify";
import { createGallery } from "@/app/dashboard/actions/create";
import { getImageAuth } from "@/lib/imageKit";

export interface GalleryFormData {
  title: string;
  slug: string;
  src: string;
  description: string;
}

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY!;

export default function NewGalleryPage() {
  const [formData, setFormData] = useState<GalleryFormData>({
    title: "",
    slug: "",
    src: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImageSet, setIsImageSet] = useState(false);
  const [errors, setErrors] = useState<Partial<GalleryFormData>>({});
  const router = useRouter();

  // Auto-generate slug and set isImageSet based on src
  useEffect(() => {
    if (formData.title) {
      setFormData((prev) => ({
        ...prev,
        slug: slugifyWithUniqueSuffix(formData.title),
      }));
    }

    setIsImageSet(!!formData.src);
  }, [formData.title, formData.src]);

  const validateForm = () => {
    const newErrors: Partial<GalleryFormData> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.slug.trim()) newErrors.slug = "Slug is required";
    if (!formData.src.trim()) newErrors.src = "Image is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    return newErrors;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof GalleryFormData]) {
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
      await createGallery(formData);
      toast.success("Gallery item created successfully");
      setFormData({ title: "", slug: "", src: "", description: "" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onImageUploadSuccess = (res: any) => {
    setFormData((prev) => ({ ...prev, src: res.url }));
    toast.success("Image uploaded successfully");
  };

  const onImageUploadError = (err: any) => {
    toast.error("Image upload failed");
    console.error(err);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <ArrowLeft className="cursor-pointer my-4" onClick={() => router.back()} />
      <h1 className="text-xl font-semibold mb-4">Create New Gallery Item</h1>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Title */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`mt-1 w-full rounded-lg border px-3 py-2 ${
              errors.title ? "border-red-500" : ""
            }`}
          />
          {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
        </div>

        {/* Hidden Slug */}
        <input type="hidden" name="slug" value={formData.slug} />

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium">Image</label>
          <ImageKitProvider
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={getImageAuth}
          >
            <IKUpload
              folder="/katsina/gallery"
              onSuccess={onImageUploadSuccess}
              onError={onImageUploadError}
              className="mt-1 w-full"
            />
          </ImageKitProvider>
          {formData.src && (
            <div className="mt-2">
              <Image
                src={formData.src}
                alt="Preview"
                width={100}
                height={100}
                className="h-20 w-20 object-cover"
                loading="lazy"
              />
            </div>
          )}
          {errors.src && <span className="text-red-500 text-sm">{errors.src}</span>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
          {errors.description && (
            <span className="text-red-500 text-sm">{errors.description}</span>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex gap-3">
          {isImageSet && (
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg border px-4 py-2 hover:bg-slate-50 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
