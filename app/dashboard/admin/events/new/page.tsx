"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { IKUpload, ImageKitProvider } from "imagekitio-next";
import { toast } from "react-toastify";
import Image from "next/image";
import { getImageAuth } from "@/lib/imageKit";
import slugifyWithUniqueSuffix from "@/lib/slugify";
import { createEvent } from "@/app/dashboard/actions/create";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export interface EventFormData {
  title: string;
  slug: string;
  date: string;
  cover: string;
  images: string[];
  excerpt: string;
  content: string;
}

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

export default function NewEventPage() {
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    slug: "",
    date: "",
    cover: "",
    images: [],
    excerpt: "",
    content: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCoverUploading, setIsCoverUploading] = useState(false);
  const [isGalleryUploading, setIsGalleryUploading] = useState(false);
  const [errors, setErrors] = useState<Partial<EventFormData>>({});
  const router = useRouter();

  // Auto-generate slug
  useEffect(() => {
    if (formData.title) {
      setFormData((prev) => ({
        ...prev,
        slug: slugifyWithUniqueSuffix(formData.title),
      }));
    }
  }, [formData.title]);

  const validateForm = () => {
    const newErrors: Partial<EventFormData> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.slug.trim()) newErrors.slug = "Slug is required";
    if (!formData.content.trim()) newErrors.content = "Details are required";
    if (!formData.excerpt.trim()) newErrors.excerpt = "Description is required";
    if (!formData.date) newErrors.date = "Date is required";
    return newErrors;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof EventFormData]) {
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

    // Prevent submitting while uploading
    if (isCoverUploading || isGalleryUploading) {
      toast.error("Please wait for all images to finish uploading");
      return;
    }

    setIsSubmitting(true);
    try {
      await createEvent(formData);
      toast.success("Event created successfully");
      setFormData({
        title: "",
        slug: "",
        date: "",
        cover: "",
        images: [],
        excerpt: "",
        content: "",
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  /** ✅ Handle cover upload */
  const onCoverUploadStart = () => setIsCoverUploading(true);
  const onCoverUploadSuccess = (res: any) => {
    setFormData((prev) => ({ ...prev, cover: res.url }));
    toast.success("Cover uploaded successfully");
    setIsCoverUploading(false);
  };
  const onCoverUploadError = (err: any) => {
    console.error(err);
    toast.error("Cover upload failed");
    setIsCoverUploading(false);
  };

  /** ✅ Handle gallery uploads */
  const onGalleryUploadStart = () => setIsGalleryUploading(true);
  const onGalleryUploadSuccess = (res: any) => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, res.url] }));
    toast.success("Gallery image uploaded");
    setIsGalleryUploading(false);
  };
  const onGalleryUploadError = (err: any) => {
    console.error(err);
    toast.error("Gallery upload failed");
    setIsGalleryUploading(false);
  };

  const canSave =
    !isSubmitting &&
    !isCoverUploading &&
    !isGalleryUploading &&
    formData.cover &&
    formData.images.length > 0;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <ArrowLeft
        className="cursor-pointer my-4"
        onClick={() => router.back()}
      />
      <h1 className="text-xl font-semibold mb-4">Create New Event</h1>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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

        {/* Cover Upload */}
        <div>
          <label className="block text-sm font-medium">Cover Image</label>
          <ImageKitProvider
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={getImageAuth}
          >
            <IKUpload
              folder="/katsina/event"
              onUploadStart={onCoverUploadStart}
              onSuccess={onCoverUploadSuccess}
              onError={onCoverUploadError}
              className="mt-1 w-full"
            />
          </ImageKitProvider>

          {isCoverUploading && (
            <p className="text-blue-600 text-sm mt-1">Uploading cover...</p>
          )}

          {formData.cover && (
            <div className="mt-2">
              <Image
                src={formData.cover}
                alt="Cover Preview"
                width={100}
                height={100}
                className="h-20 w-20 object-cover"
              />
            </div>
          )}
        </div>

        {/* Gallery Upload */}
        <div>
          <label className="block text-sm font-medium">Gallery Images</label>
          <ImageKitProvider
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={getImageAuth}
          >
            <IKUpload
              folder="/katsina/event/gallery"
              multiple={true}
              onUploadStart={onGalleryUploadStart}
              onSuccess={onGalleryUploadSuccess}
              onError={onGalleryUploadError}
              className="mt-1 w-full"
            />
          </ImageKitProvider>

          {isGalleryUploading && (
            <p className="text-blue-600 text-sm mt-1">Uploading gallery images...</p>
          )}

          {formData.images.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.images.map((img) => (
                <Image
                  key={img}
                  src={img}
                  alt="Preview"
                  width={100}
                  height={100}
                  className="h-20 w-20 object-cover rounded-md"
                />
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Short Description</label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows={3}
            className="mt-1 w-full rounded-lg border px-3 py-2"
            required
          />
          {errors.excerpt && (
            <span className="text-red-500 text-sm">{errors.excerpt}</span>
          )}
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium">Details</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={8}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
          {errors.content && (
            <span className="text-red-500 text-sm">{errors.content}</span>
          )}
        </div>

        {/* Save Button */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={!canSave}
            className={`rounded-lg border px-4 py-2 transition ${
              canSave
                ? "hover:bg-slate-50"
                : "opacity-50 cursor-not-allowed bg-slate-100"
            }`}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
