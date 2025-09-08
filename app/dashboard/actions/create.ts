"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { AnnouncementFormData } from "../admin/announcements/new/page"; //This ensures the form and the server action recieve the same data
import { BlogFormData } from "../admin/blog/new/page";
import { HomilyFormData } from "../bishop/homily/new/page";
import { redirect } from "next/navigation";
import ImageKit from "imagekit";
import { SliderFormData } from "../admin/sliders/new/page";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY ?? "",
  privateKey: process.env.PRIVATE_KEY ?? "",
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT ?? "",
});
/**
 * Creates a new announcement with the provided form data
 * @param formData - The data for the new announcement containing title, slug, date, image, description, and details
 * @returns Promise<void>
 */
export async function createAnnouncement(formData: AnnouncementFormData) {
  const { title, slug, date, image, description, details } = formData;
  await prisma.announcement.create({
    data: {
      title,
      slug,
      date: new Date(date),
      image,
      description,
      details,
    },
  });
  revalidatePath("/dashboard/admin/announcements");
  revalidatePath("/announcement");
  revalidatePath("/");
}

/**
 * Creates a new announcement with the provided form data
 * @param formData - The data for the new announcement containing title, slug, date, image, description, and details
 * @returns Promise<void>
 */
export async function createSlider(formData: SliderFormData) {
  // Destructure the required fields from the form data
  const { title, image, subtitle, text } = formData;

  await prisma.slider.create({
    data: {
      title,
      image,
      subtitle,
      text,
    },
  });
  // Revalidate the announcements page to update the data
  revalidatePath("/dashboard/admin/sliders");
  revalidatePath("/");
  //I do not handle errors here because I want to handle them in the form itself
}

export async function createBlog(formData: BlogFormData) {
  const { title, slug, date, image, excerpt, content } = formData;
  await prisma.blog.create({
    data: {
      title,
      slug,
      date: new Date(date),
      image,
      excerpt,
      content,
    },
  });
  revalidatePath("/dashboard/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
}

export async function createHomily(formData: HomilyFormData) {
  const { title, slug, date, image, summary, content } = formData;
  await prisma.homily.create({
    data: {
      title,
      slug,
      date: new Date(date),
      image,
      summary,
      content,
    },
  });
  revalidatePath("/dashboard/bishop/homily");
  revalidatePath("/homily");
  revalidatePath("/");
}

export async function createEvent(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const dateStr = String(formData.get("date") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "")
    .split("\n")
    .map((c) => c.trim());

  if (!title || !slug || !dateStr) {
    throw new Error("Title, slug, and date are required");
  }
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  const coverFile = formData.get("cover");
  let coverUrl = "";
  if (coverFile instanceof File && coverFile.size > 0) {
    try {
      const arrayBuffer = await coverFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResponse = await imagekit.upload({
        file: buffer,
        fileName: `event-cover-${slug}-${Date.now()}.${coverFile.name
          .split(".")
          .pop()}`,
        folder: "/events/covers",
      });
      coverUrl = uploadResponse.url;
    } catch (error: any) {
      throw new Error(`Failed to upload cover image: ${error.message}`);
    }
  } else {
    throw new Error("Cover image is required");
  }

  // Handle additional images upload
  const imageFiles = formData.getAll("images");
  const imageUrls = [];
  for (const file of imageFiles) {
    if (file instanceof File && file.size > 0) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResponse = await imagekit.upload({
          file: buffer,
          fileName: `event-image-${slug}-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 8)}.${file.name.split(".").pop()}`,
          folder: "/katsina/events",
        });
        imageUrls.push(uploadResponse.url);
      } catch (error: any) {
        throw new Error(`Failed to upload image: ${error.message}`);
      }
    }
  }

  // Create event in Prisma
  try {
    await prisma.event.create({
      data: {
        title,
        slug,
        date,
        excerpt,
        cover: coverUrl,
        images: imageUrls,
        content,
      },
    });
  } catch (error: any) {
    throw new Error(`Failed to create event: ${error.message}`);
  }

  revalidatePath("/dashboard/admin/events");
  revalidatePath("/event");
  revalidatePath("/");
  redirect("/dashboard/admin/events");
}
