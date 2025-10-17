"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { IKUpload, ImageKitProvider } from "imagekitio-next";
import { toast } from "react-toastify";
import Image from "next/image";
import { getImageAuth } from "@/lib/imageKit";
import slugifyWithUniqueSuffix from "@/lib/slugify";
import { createHomily } from "@/app/dashboard/actions/create";

export interface HomilyFormData {
  title: string;
  slug: string;
  date: string;
  image: string;
  summary: string;
  content: string;
}

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

export default function NewHomilyPage() {
  const [formData, setFormData] = useState<HomilyFormData>({
    title: "",
    slug: "",
    date: "",
    image: "",
    summary: "",
    content: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // ✅ added state
  const [errors, setErrors] = useState<Partial<HomilyFormData>>({});

  useEffect(() => {
    if (formData.title) {
      setFormData((prev) => ({
        ...prev,
        slug: slugifyWithUniqueSuffix(formData.title),
      }));
    }
  }, [formData.title]);

  const validateForm = () => {
    const newErrors: Partial<HomilyFormData> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.slug.trim()) newErrors.slug = "Slug is required";
    if (!formData.summary.trim()) newErrors.summary = "Description is required";
    if (!formData.content.trim()) newErrors.content = "Details are required";
    if (!formData.image.trim()) newErrors.image = "Image is required";
    return newErrors;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof HomilyFormData]) {
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
      await createHomily(formData);
      toast.success("Homily created successfully");
      setFormData({
        title: "",
        slug: "",
        date: "",
        image: "",
        summary: "",
        content: "",
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Handle Image Upload
  const onImageUploadSuccess = (res: any) => {
    setFormData((prev) => ({ ...prev, image: res.url }));
    setIsUploading(false);
    toast.success("Image uploaded successfully");
  };

  const onImageUploadError = (err: any) => {
    setIsUploading(false);
    toast.error("Image upload failed");
    console.error(err);
  };

  const isFormValid =
    formData.title.trim() &&
    formData.slug.trim() &&
    formData.date.trim() &&
    formData.summary.trim() &&
    formData.content.trim() &&
    formData.image &&
    !isUploading &&
    !isSubmitting;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">New Homily</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
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

        {/* Slug */}
        <input
          type="hidden"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
        />
        {errors.slug && (
          <span className="text-red-500 text-sm">{errors.slug}</span>
        )}

        {/* Date */}
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

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium">Image</label>
          <ImageKitProvider
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={getImageAuth}
          >
            <IKUpload
              folder={"/katsina/homily"}
              onUploadStart={() => setIsUploading(true)} // ✅ show uploading
              onSuccess={onImageUploadSuccess}
              onError={onImageUploadError}
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />
          </ImageKitProvider>

          {/* Upload progress feedback */}
          {isUploading && (
            <p className="text-sm text-blue-600 mt-2 animate-pulse">
              ⏳ Uploading image, please wait...
            </p>
          )}

          {/* Image Preview */}
          {formData.image && (
            <div className="mt-3">
              <Image
                src={formData.image}
                alt="Preview"
                width={120}
                height={120}
                loading="lazy"
                className="h-24 w-24 object-cover rounded-md border"
              />
            </div>
          )}
        </div>

        {/* Summary */}
        <div>
          <label className="block text-sm font-medium">Short Description</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            rows={3}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
          {errors.summary && (
            <span className="text-red-500 text-sm">{errors.summary}</span>
          )}
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium">Details</label>
          <textarea
            name="content"
            onChange={handleChange}
            value={formData.content}
            rows={8}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
          {errors.content && (
            <span className="text-red-500 text-sm">{errors.content}</span>
          )}
        </div>

        {/* Submit */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={!isFormValid}
            className={`rounded-lg border px-4 py-2 hover:bg-slate-50 disabled:opacity-50 ${
              !isFormValid ? "cursor-not-allowed" : ""
            }`}
          >
            {isUploading
              ? "Uploading..."
              : isSubmitting
              ? "Saving..."
              : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
