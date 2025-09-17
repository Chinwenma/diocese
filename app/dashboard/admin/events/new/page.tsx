import { createEvent } from "@/app/dashboard/actions/create";

export default function NewEventPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">New Event</h2>
      <form action={createEvent} className="space-y-4" encType="multipart/form-data">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title</label>
          <input
            id="title"
            name="title"
            placeholder="Event Title"
            className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <input
            type="hidden"
            id="slug"
            name="slug"
            placeholder="event-slug"
            className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-slate-700">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="cover" className="block text-sm font-medium text-slate-700">Cover Image</label>
          <input
            id="cover"
            name="cover"
            type="file"
            accept="image/*"
            className="w-full border rounded p-2 mt-1"
            required
          />
        </div>

        <div>
          <label htmlFor="images" className="block text-sm font-medium text-slate-700">Additional Images</label>
          <input
            id="images"
            name="images"
            type="file"
            accept="image/*"
            multiple
            className="w-full border rounded p-2 mt-1"
          />
          <p className="mt-1 text-sm text-slate-500">Select multiple images if needed.</p>
        </div>

        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-slate-700">Excerpt</label>
          <textarea
            id="excerpt"
            name="excerpt"
            placeholder="Short description"
            className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-slate-700">Content</label>
          <textarea
            id="content"
            name="content"
            placeholder="One paragraph per line"
            className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={6}
          />
          <p className="mt-1 text-sm text-slate-500">Enter each paragraph on a new line.</p>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save
        </button>
      </form>
    </div>
  );
}