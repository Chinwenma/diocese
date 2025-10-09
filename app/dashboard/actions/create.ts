"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { AnnouncementFormData } from "../admin/announcements/new/page";
import { BlogFormData } from "../admin/blog/new/page";
import { HomilyFormData } from "../bishop/homily/new/page";
import { redirect } from "next/navigation";
import { SliderFormData } from "../admin/sliders/new/page";
import { EventFormData } from "../admin/events/new/page";

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

export async function createEvent(formData: EventFormData) {
const {title, slug, date, excerpt, cover, content, images} = formData;
  try {
    await prisma.event.create({
      data: {
        title,
        slug,
        date: new Date(date),
        excerpt,
        cover,
        images,
        content,
      },
    });
  } catch (error: any) {
    console.log(error);
    
    throw new Error(`Failed to create event: ${error.message}`);
  }

  revalidatePath("/dashboard/admin/events");
  revalidatePath("/event");
  revalidatePath("/");
  redirect("/dashboard/admin/events");
}
