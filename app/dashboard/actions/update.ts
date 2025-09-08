"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isObjectId } from "@/lib/slugify";
import ImageKit from "imagekit";
import prisma from "@/lib/prisma";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY ?? "",
  privateKey: process.env.PRIVATE_KEY ?? "",
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT ?? "",
});

export async function updateEvent(slugOrId: string, formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const dateStr = String(formData.get("date") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "")
    .split("\n")
    .map((c) => c.trim())
    .filter((c) => c);

  // Validate required fields
  if (!title || !slug || !dateStr) {
    throw new Error("Title, slug, and date are required");
  }

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  // Determine the where clause
  const where = isObjectId(slugOrId) ? { id: slugOrId } : { slug: slugOrId };

  // Fetch existing event
  const existingEvent = await prisma.event.findUnique({ where });
  if (!existingEvent) {
    throw new Error("Event not found");
  }

  // Check for unique slug if changed
  if (slug !== existingEvent.slug) {
    const slugExists = await prisma.event.findUnique({ where: { slug } });
    if (slugExists) {
      throw new Error("Slug already exists");
    }
  }

  // Handle cover image
  let coverUrl = existingEvent.cover;
  const coverFile = formData.get("cover");
  if (coverFile instanceof File && coverFile.size > 0) {
    try {
      // Upload new cover image
      const arrayBuffer = await coverFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResponse = await imagekit.upload({
        file: buffer,
        fileName: `event-cover-${slug}-${Date.now()}.${coverFile.name
          .split(".")
          .pop()}`,
        folder: "/katsina/events/covers",
      });
      coverUrl = uploadResponse.url;

      // Delete old cover image from ImageKit
      if (existingEvent.cover) {
        const fileId = existingEvent.cover.split("/").pop()?.split(".")[0];
        if (fileId) {
          try {
            await imagekit.deleteFile(fileId);
          } catch (error: any) {
            console.error(`Failed to delete old cover image: ${error.message}`);
          }
        }
      }
    } catch (error: any) {
      throw new Error(`Failed to upload cover image: ${error.message}`);
    }
  }

  let imageUrls = existingEvent.images;
  const imageFiles = formData.getAll("images");
  if (imageFiles.some((file) => file instanceof File && file.size > 0)) {
    imageUrls = [];
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

    for (const oldImage of existingEvent.images) {
      const fileId = oldImage.split("/").pop()?.split(".")[0];
      if (fileId) {
        try {
          await imagekit.deleteFile(fileId);
        } catch (error: any) {
          console.error(`Failed to delete old image: ${error.message}`);
        }
      }
    }
  }
  try {
    await prisma.event.update({
      where,
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
    throw new Error(`Failed to update event: ${error.message}`);
  }

  revalidatePath("/dashboard/admin/events");
  revalidatePath("/event");
  revalidatePath("/");
  redirect("/dashboard/admin/events");
}

export async function updateSliderAction(oldId: string, formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const subtitle = String(formData.get("subtitle") ?? "").trim();
  const text = String(formData.get("text") ?? "").trim();
  const id = String(formData.get("id") ?? "").trim();
  if (!title) {
    throw new Error("Title is required.");
  }
  if (!subtitle) {
    throw new Error("Subtitle is required.");
  }
  if (!text) {
    throw new Error("Text is required.");
  }
  const existingSlider = await prisma.slider.findUnique({ where: { id } });
  if (!existingSlider) {
    throw new Error("Slider not found.");
  }
  let imageUrl = existingSlider.image;
  const imageFile = formData.get("image");
  if (imageFile instanceof File && imageFile.size > 0) {
    try {
      // Upload new image image
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResponse = await imagekit.upload({
        file: buffer,
        fileName: `slider-image-${id}-${Date.now()}.${imageFile.name
          .split(".")
          .pop()}`,
        folder: "/katsina/sliders/images",
      });
      imageUrl = uploadResponse.url;

      // Delete old image image from ImageKit
      if (existingSlider.image) {
        const fileId = existingSlider.image.split("/").pop()?.split(".")[0];
        if (fileId) {
          try {
            await imagekit.deleteFile(fileId);
          } catch (error: any) {
            console.error(`Failed to delete old image image: ${error.message}`);
          }
        }
      }
    } catch (error: any) {
      throw new Error(`Failed to upload image image: ${error.message}`);
    }
  }

  await prisma.slider.update({
    where: { id },
    data: {
      title,
      subtitle,
      text,
      image: imageUrl,
    },
  });

  // Refresh admin list and public detail
  revalidatePath("/dashboard/admin/sliders");
  revalidatePath(`/`);
  redirect("/dashboard/admin/sliders");
}

export async function updateAnnouncementAction(oldSlug: string, formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const dateStr = String(formData.get("date") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const details = String(formData.get("details") ?? "").trim();

  if (!title || !slug || !dateStr) {
    throw new Error("Title, slug, and date are required.");
  }
  const existingAnnouncement = await prisma.announcement.findUnique({ where: { slug } });
  if (!existingAnnouncement) {
    throw new Error("Announcement not found.");
  }

  let imageUrl = existingAnnouncement.image;
  const imageFile = formData.get("image");
  if (imageFile instanceof File && imageFile.size > 0) {
    try {
      // Upload new image image
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResponse = await imagekit.upload({
        file: buffer,
        fileName: `slider-image-${slug}-${Date.now()}.${imageFile.name
          .split(".")
          .pop()}`,
        folder: "/katsina/sliders/images",
      });
      imageUrl = uploadResponse.url;

      // Delete old image image from ImageKit
      if (existingAnnouncement.image) {
        const fileId = existingAnnouncement.image.split("/").pop()?.split(".")[0];
        if (fileId) {
          try {
            await imagekit.deleteFile(fileId);
          } catch (error: any) {
            console.error(`Failed to delete old image image: ${error.message}`);
          }
        }
      }
    } catch (error: any) {
      throw new Error(`Failed to upload image image: ${error.message}`);
    }
  }
  await prisma.announcement.update({
    where: { slug: oldSlug },
    data: {
      title,
      slug,
      date: new Date(dateStr),
      image: imageUrl,
      description,
      details,
    },
  });

  // Refresh admin list and public detail
  revalidatePath("/dashboard/admin/announcements");
  revalidatePath(`/announcement/${slug}`);
  revalidatePath("/announcement");
  revalidatePath("/");
  redirect("/dashboard/admin/announcements");
}
