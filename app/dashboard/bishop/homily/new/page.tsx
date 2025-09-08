"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { IKUpload, ImageKitProvider } from "imagekitio-next";
import { toast } from "react-toastify";
import Image from "next/image";
import { getImageAuth } from "@/lib/imageKit";
import slugifyWithUniqueSuffix from "@/lib/slugify";
import {
  createHomily,
} from "@/app/dashboard/actions/create";
// import { ArrowLeft } from "lucide-react";

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
  const [errors, setErrors] = useState<Partial<HomilyFormData>>({});
  // Auto-generate slug with unique suffix from title to help us and the user
  //I expect you to do this for everything that has slug
  useEffect(() => {
    if (formData.title) {
      setFormData((prev) => ({
        ...prev,
        slug: slugifyWithUniqueSuffix(formData.title),
      }));
    }
  }, [formData.title]);
  /**
   * Validates the form data and returns an object containing any validation errors
   * @returns {Partial<AnnouncementFormData>} An object containing validation error messages for each field
   */
  const validateForm = () => {
    // Initialize an empty errors object with partial AnnouncementFormData type
    const newErrors: Partial<HomilyFormData> = {};
    // Validate title field - check if it's empty after trimming whitespace
    if (!formData.title.trim()) newErrors.title = "Title is required";
    // Validate slug field - check if it's empty after trimming whitespace
    if (!formData.slug.trim()) newErrors.slug = "Slug is required";
    // Validate description field - check if it's empty after trimming whitespace
    if (!formData.summary.trim()) newErrors.summary = "Description is required";
    // Validate details field - check if it's empty after trimming whitespace
    if (!formData.content.trim()) newErrors.content = "Details are required";
    // Return the validation errors object
    return newErrors;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof HomilyFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    const formErrors = validateForm();
    //This is form validation to ensure the expected data goes to the server
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true); //This is to prevent the form from being submitted multiple times
    //You looked really beautiful today
    //Let me know if you see this. Reply with your favourite sticker
    try {
      await createHomily(formData);
      toast.success("Homily created successfully");
      setFormData({
        //This is to clear the form after submission
        title: "",
        slug: "",
        date: "",
        image: "",
        summary: "",
        content: "",
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
      //errors are handled here
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handles successful image upload by updating form data and showing success message
   * @param {any} res - The response object containing uploaded image URL
   */
  const onImageUploadSuccess = (res: any) => {
    // Update form data with the uploaded image URL while preserving other form fields
    setFormData((prev) => ({ ...prev, image: res.url }));
    // Display success notification to user
    toast.success("Image uploaded successfully");
  };

  /**
   * Handles image upload errors by displaying an error message and logging the error to the console
   * @param {any} err - The error object containing information about what went wrong during the upload
   */
  const onImageUploadError = (err: any) => {
    toast.error("Image upload failed"); // Display error message to user using toast notification
    console.error(err);
  };
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">New Homily</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className={`mt-1 w-full rounded-lg border px-3 py-2 ${errors.title ? "border-red-500" : ""
              }`}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            placeholder="ordination-rev-john-doe"
            className={`mt-1 w-full rounded-lg border px-3 py-2 ${errors.slug ? "border-red-500" : ""
              }`}
          />
          {errors.slug && (
            <span className="text-red-500 text-sm">{errors.slug}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Date</label>
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
            className={`mt-1 w-full rounded-lg border px-3 py-2 ${errors.date ? "border-red-500" : ""
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
              folder={"/katsina/homily"}
              onSuccess={onImageUploadSuccess}
              onError={onImageUploadError}
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />
          </ImageKitProvider>
          {/* end of image upload part */}
          {/* Below serves as an image preview of the uploaded image */}
          {formData.image && (
            <div className="mt-2">
              <Image
                src={formData.image}
                alt="Preview"
                width={100}
                height={100}
                loading="lazy"
                className="h-20 w-20 object-cover"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Short description</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            rows={3}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>
        {errors.summary && (
          <span className="text-red-500 text-sm">{errors.summary}</span>
        )}
        <div>
          <label className="block text-sm font-medium">Details</label>
          <textarea
            name="content"
            onChange={handleChange}
            value={formData.content}
            rows={8}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>
        {errors.content && (
          <span className="text-red-500 text-sm">{errors.content}</span>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg border px-4 py-2 hover:bg-slate-50 disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
