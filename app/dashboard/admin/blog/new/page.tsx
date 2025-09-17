"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { IKUpload, ImageKitProvider } from "imagekitio-next";
import { toast } from "react-toastify";
import Image from "next/image";
import { getImageAuth } from "@/lib/imageKit";
import slugifyWithUniqueSuffix from "@/lib/slugify";
import {createBlog } from "@/app/dashboard/actions/create";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export interface BlogFormData {
  title: string;
  slug: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
}
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

export default function NewBlogPage() {
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    slug: "",
    date: "",
    image: "",
    excerpt: "",
    content: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<BlogFormData>>({});
  const router = useRouter();
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
   * @returns {Partial<BlogFormData>} An object containing validation error messages for each field
   */
  const validateForm = () => {
    // Initialize an empty errors object with partial AnnouncementFormData type
    const newErrors: Partial<BlogFormData> = {};
    // Validate title field - check if it's empty after trimming whitespace
    if (!formData.title.trim()) newErrors.title = "Title is required";
    // Validate slug field - check if it's empty after trimming whitespace
    if (!formData.slug.trim()) newErrors.slug = "Slug is required";
    // Validate details field - check if it's empty after trimming whitespace
    if (!formData.content.trim()) newErrors.content = "Details are required";
    // Validate description field - check if it's empty after trimming whitespace
    if (!formData.excerpt.trim()) newErrors.excerpt = "Description is required";
    // Return the validation errors object
    return newErrors;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof BlogFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formErrors = validateForm();
    //This is form validation to ensure the expected data goes to the server
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true); //This is to prevent the form from being submitted multiple times
    try {
      await createBlog(formData);
      toast.success("blog created successfully");
      setFormData({
        //This is to clear the form after submission
        title: "",
        slug: "",
        date: "",
        image: "",
        excerpt: "",
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
      <ArrowLeft
        className="cursor-pointer my-4"
        onClick={() => router.back()}
      />
      <h1 className="text-xl font-semibold mb-4"> Create New Blog</h1>

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

        <div>
          <input
          type="hidden"
            name="slug"
            required
            value={formData.slug}
            onChange={handleChange}
            placeholder="ordination-rev-john-doe"
            className={`mt-1 w-full rounded-lg border px-3 py-2 ${
              errors.slug ? "border-red-500" : ""
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
            className={`mt-1 w-full rounded-lgborder px-3 py-2 ${
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
              folder={"/katsina/blog"}
              onSuccess={onImageUploadSuccess}
              onError={onImageUploadError}
              className="mt-1 w-full"
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

        <div>
          <label className="block text-sm font-medium"> Details</label>
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
