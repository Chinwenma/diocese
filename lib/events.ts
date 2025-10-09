export type EventItem = {
  slug: string;
  title: string;
  date: Date;
  excerpt: string;
  cover: string;
  images: string[];
  content: string;
};

export const events: EventItem[] = [
  {
    slug: "seminarians-reconnect",
    title:
      "Seminarians Reconnect and Rekindle Vocation Spirit at Malumfashi Reunion",
    date: new Date("2025-09-04T00:00:00.000Z"),
    excerpt:
      "The recently concluded seminarian reunion held at the Pastoral Centre, Malumfashi, from September 1st to 4th, brought together aspiring clergy and priests for a spiritually enriching and purpose-driven gathering. The event served as a moment of reflection, learning, and outreach, rekindling the flame of vocation among participants and the wider community.",
    cover:
      "https://ik.imagekit.io/verbum0179/events/covers/event-cover-seminarians-reconnect-1757427130891_7JkRgAHXU.jpg",
    images: [
      "https://ik.imagekit.io/verbum0179/katsina/events/event-image-seminarians-reconnect-1757427132296-bx98a2_Ct9poBrZJ.jpg",
      "https://ik.imagekit.io/verbum0179/katsina/events/event-image-seminarians-reconnect-1757427133507-1ehk11_68ifwUq3o.jpg",
      "https://ik.imagekit.io/verbum0179/katsina/events/event-image-seminarians-reconnect-1757427134646-mzvhxd_mAHX1Jsic.jpg",
      "https://ik.imagekit.io/verbum0179/katsina/events/event-image-seminarians-reconnect-1757427135874-2fhcf5_R5ekOff9T.jpg",
    ],
    content:
      "The recently concluded seminarian reunion held at the Pastoral Centre, Malumfashi, from September 1st to 4th, brought together aspiring clergy and priests for a spiritually enriching and purpose-driven gathering. The event served as a moment of reflection, learning, and outreach, rekindling the flame of vocation among participants and the wider community.",
  },
];

// Helpers
export const getLatestEvents = (limit = 3) =>
  [...events]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, limit);

export const getEventBySlug = (slug: string) =>
  events.find((e) => e.slug === slug);
