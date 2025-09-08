"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// Small helper: swallow "record not found" so Strict Mode double-submits don't explode
function isRecordNotFound(e: any) {
  return e?.code === "P2025";
}

/* =========================
   ANNOUNCEMENTS (by id)
   ========================= */
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

/* ================
   BLOG (by id)
   ================ */
export async function deleteBlog(id: string) {
  if (!id) return;
  try {
    await prisma.blog.delete({ where: { id } });
  } catch (e: any) {
    if (!isRecordNotFound(e)) throw e;
  }
  revalidatePath("/dashboard/admin/blog");
}

/* =========================
   HOMILY (by slug or id)
   - Adjust: if your schema uses id instead of slug, 
     just change the hidden input name + where clause.
   ========================= */
export async function deleteHomily(id: string) {
  if (!id) return;

  try {
    await prisma.homily.delete({ where: { id } });
  } catch (e: any) {
    if (!isRecordNotFound(e)) throw e;
  }
  revalidatePath("/dashboard/bishop/homily");
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
}

export async function deleteEvent(id: string) {
  if (!id) return;

  try {
    await prisma.event.delete({ where: {id} });
  } catch (e: any) {
    if (!isRecordNotFound(e)) throw e;
  }
  revalidatePath("/dashboard/admin/events");
}

export async function deleteSlider(id: string) {
  if (!id) return;
  try {
    await prisma.slider.delete({ where: { id } });
  } catch (e: any) {
    if (!isRecordNotFound(e)) throw e;
  }
  revalidatePath("/dashboard/admin/sliders");
}