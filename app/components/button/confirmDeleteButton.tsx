"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteAnnouncement, deleteBlog, deleteClergy, deleteEvent, deleteHomily, deleteSlider } from "@/app/dashboard/actions/delete";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  children?: React.ReactNode;
  label?: string;                    
  title?: string;                    
  message?: string;                 
  busyText?: string;
  id: string;
  module: string;
};

export default function ConfirmDelete({
  children,
  label = "Delete",
  title = "Delete item",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  busyText = "Deleting...",
  id,
  module
}: Props) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const handleDelete = async () => {
    setSubmitting(true)

  try {
      switch (module) {
        case 'announcement':
          await deleteAnnouncement(id)
          break;
            case 'blog':
          await deleteBlog(id)
          break;
            case 'homily':
          await deleteHomily(id)
          break;
              case 'clergy':
          await deleteClergy(id)
          break;
        case 'event':
          await deleteEvent(id)
          break;
        case 'slider':
          await deleteSlider(id)
          break;
        default:
          break;
      }
  } catch (error: any) {
    if (error.code =="P2025"){
      toast.error("The item is not found or has been deleted")
    }else{
      toast.error("Deleting failed, check your internet connection and retry!")    
    }
  }
    setSubmitting(false)
    setOpen(false)
  }
  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg border border-red-500 px-3 py-1.5 text-red-600 hover:bg-red-50"
      >
        {children ?? label}
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-black/40 p-4"
          aria-modal="true"
          role="dialog"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            <p className="mt-2 text-sm text-slate-600">{message}</p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={submitting}
                className="rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              {/* IMPORTANT: this button submits the PARENT <form action=...> */}
              <button
                type="submit"
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700 disabled:opacity-70"
                disabled={submitting}
              >
                {submitting ? busyText : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
