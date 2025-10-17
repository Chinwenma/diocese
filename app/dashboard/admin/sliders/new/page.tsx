/* eslint-disable @typescript-eslint/no-explicit-any */


"use client";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { IKUpload, ImageKitProvider } from "imagekitio-next";
import { toast } from "react-toastify";
import Image from "next/image";
import { getImageAuth } from "@/lib/imageKit";
import slugifyWithUniqueSuffix from "@/lib/slugify";
import { createSlider } from "@/app/dashboard/actions/create";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export interface SliderFormData {
  title: string;
  image: string;
  subtitle: string;
  text: string;
  slug?: string;
}

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

export default function NewSliderPage() {
  const [formData, setFormData] = useState<SliderFormData>({
    title: "",
    image: "",
    subtitle: "",
    text: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<Partial<SliderFormData>>({});
  const router = useRouter();

  useEffect(() => {
    if (formData.title) {
      setFormData((prev) => ({
        ...prev,
        slug: slugifyWithUniqueSuffix(formData.title),
      }));
    }
  }, [formData.title]);

  const validateForm = () => {
    const newErrors: Partial<SliderFormData> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.text.trim()) newErrors.text = "Text is required";
    if (!formData.subtitle.trim()) newErrors.subtitle = "Subtitle is required";
    if (!formData.image.trim()) newErrors.image = "Image is required";
    return newErrors;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof SliderFormData]) {
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
      await createSlider(formData);
      toast.success("Slider created successfully");
      setFormData({ title: "", image: "", subtitle: "", text: "" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

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
    formData.subtitle.trim() &&
    formData.text.trim() &&
    formData.image &&
    !isUploading &&
    !isSubmitting;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <ArrowLeft
        className="cursor-pointer my-4"
        onClick={() => router.back()}
      />
      <h1 className="text-2xl font-semibold mb-4">Create New Slider</h1>

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
          <label className="block text-sm font-medium">Image</label>
          <ImageKitProvider
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={getImageAuth}
          >
            <IKUpload
              folder={"/katsina/sliders"}
              onUploadStart={() => setIsUploading(true)}
              onSuccess={onImageUploadSuccess}
              onError={onImageUploadError}
              className="mt-1 w-full"
            />
          </ImageKitProvider>

          {/* Upload status feedback */}
          {isUploading && (
            <p className="text-sm text-blue-600 mt-2 animate-pulse">
              ⏳ Uploading image, please wait...
            </p>
          )}

          {formData.image && (
            <div className="mt-3">
              <Image
                src={formData.image}
                alt="Preview"
                width={120}
                height={120}
                className="h-24 w-24 object-cover rounded-md border"
                loading="lazy"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Sub Title</label>
          <textarea
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            rows={3}
            className="mt-1 w-full rounded-lg border px-3 py-2"
            required
          />
          {errors.subtitle && (
            <span className="text-red-500 text-sm">{errors.subtitle}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Text</label>
          <textarea
            name="text"
            value={formData.text}
            onChange={handleChange}
            rows={8}
            required
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
          {errors.text && (
            <span className="text-red-500 text-sm">{errors.text}</span>
          )}
        </div>

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
