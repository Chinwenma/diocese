"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { IKUpload, ImageKitProvider } from "imagekitio-next";
import { toast } from "react-toastify";
import Image from "next/image";
import { getImageAuth } from "@/lib/imageKit";
import slugifyWithUniqueSuffix from "@/lib/slugify";
import Link from "next/link";
import {  useRouter } from "next/navigation";
import { createClergy } from "@/app/dashboard/actions/create";
import { FormEvent, useEffect, useState } from "react";
export interface ClergyFormData {
  name: string;
  role: string;
  parish: string;
  image?: string;
  address: string;
  phone?: string;
  extra?: string;
}
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
// These two are for image kit provider to work well

export default function NewClergyPage() {
 const [formData, setFormData] = useState<ClergyFormData>({
    name: "",
    image: "",
    role: "",
    phone: "",
    address: "",
    extra: "",
    parish: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Partial<ClergyFormData>>({});
    const router = useRouter();

     // Auto-generate slug with unique suffix from title to help us and the user
  //I expect you to do this for everything that has slug
  useEffect(() => {
    if (formData.name) {
      setFormData((prev) => ({
        ...prev,
        slug: slugifyWithUniqueSuffix(formData.name),
      }));
    }
  }, [formData.name]);
  /**
   * Validates the form data and returns an object containing any validation errors
   * @returns {Partial<ClergyFormData>} An object containing validation error messages for each field
   */
  const validateForm = () => {
        const newErrors: Partial<ClergyFormData> = {};
    
  if (!formData.name.trim()) newErrors.name = "name is required";

    if (!formData.role.trim()) newErrors.role = "role is required";

    if (!formData.parish.trim()) newErrors.parish = "parish is required"; 
    if (!formData.address.trim()) newErrors.address = "address is required";
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  // Clear error when user starts typing
  if(errors[name as keyof ClergyFormData]) {
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
      //You looked really beautiful today
      //Let me know if you see this. Reply with your favourite sticker
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
    <div className="max-w-2xl p-6">
      <div className="mb-4">
        <h1 className="text-xl font-semibold">Add New Clergy</h1>
        <p className="text-sm text-slate-500">
          Fill the form to create a new clergy record.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border bg-white p-5">
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
            {/* If you prefer a select:
            <select name="role" required className="mt-1 w-full rounded-lg border px-3 py-2">
              <option value="">Select role…</option>
              <option>Parish Priest</option>
              <option>Assistant Priest</option>
              <option>Chaplain</option>
              <option>Rector</option>
            </select> */}
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
            <label className="block text-sm font-medium">Phone (optional)</label>
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
          {/* This provider must wrap the IkUpload */}
          <ImageKitProvider
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={getImageAuth}
          >
            <IKUpload
              folder={"/katsina/clergy"}
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
                className="h-20 w-20 object-cover"
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
            className="rounded-xl bg-amber-500 px-4 py-2 text-white hover:bg-amber-600"
          >
            Save
          </button>
          <Link
            href="/dashboard/admin/clergy"
            className="rounded-xl border px-4 py-2 hover:bg-slate-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
