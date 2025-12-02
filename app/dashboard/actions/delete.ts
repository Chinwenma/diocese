"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
function isRecordNotFound(e: any) {
  return e?.code === "P2025";
}

export async function deleteAnnouncement(id: string) {
  if (!id) return;
  try {
    await prisma.announcement.delete({ where: { id } });
  } catch (e: any) {
    if (!isRecordNotFound(e)) throw e;
  }
  revalidatePath("/dashboard/admin/announcements");
    revalidatePath("/announcement");
    revalidatePath("/");
}

export async function deleteBlog(id: string) {
  if (!id) return;
  try {
    await prisma.blog.delete({ where: { id} });
  } catch (e: any) {
    if (!isRecordNotFound(e)) throw e;
  }
  revalidatePath("/dashboard/admin/blog");
  revalidatePath("/blog");

}


export async function deleteHomily(id: string) {
  if (!id) return;

  try {
    await prisma.homily.delete({ where: { id } });
  } catch (e: any) {
    if (!isRecordNotFound(e)) throw e;
  }
  revalidatePath("/dashboard/bishop/homily");
  revalidatePath("/homily");
  revalidatePath("/");
}

/* =========================
   CLERGY (by id/ObjectId)
   ========================= */
export async function deleteClergy(id: string) {
  if (!id) return;
  try {
    await prisma.clergy.delete({ where: { id } });
  } catch (e: any) {
    if (!isRecordNotFound(e)) throw e;
  }
  revalidatePath("/dashboard/admin/clergy");
  revalidatePath("/clergy");
}

export async function deleteEvent(id: string) {
  if (!id) return;

  try {
    await prisma.event.delete({ where: {id} });
  } catch (e: any) {
    if (!isRecordNotFound(e)) throw e;
  }
  revalidatePath("/dashboard/admin/events");
  revalidatePath("/event");
  revalidatePath("/");
}

export async function deleteSlider(id: string) {
  if (!id) return;
  try {
    await prisma.slider.delete({ where: { id } });
  } catch (e: any) {
    if (!isRecordNotFound(e)) throw e;
  }
  revalidatePath("/dashboard/admin/sliders");
  revalidatePath("/");
}



export async function deleteGallery(id: string) {
  if (!id) return;
  try {
    await prisma.galleryImage.delete({ where: { id} });
  } catch (e: any) {
    if (!isRecordNotFound(e)) throw e;
  }
  revalidatePath("/dashboard/admin/gallery");
  revalidatePath("/gallery");

}