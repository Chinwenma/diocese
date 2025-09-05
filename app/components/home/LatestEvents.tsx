import EventGrid from "@/app/(public)/event/EventGrid";

import AnimatedButton from "../button/Button";
import SectionHeading from "../heading/SectionHeading";
import prisma from "@/lib/prisma";

export default async function LatestEvents() {
  const events = await prisma.event.findMany({
    take: 4,
    orderBy: { date: "desc" }
  })
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="text-center space-y-4">
        <SectionHeading
          title="Latest Diocesan Events"
          subtitle="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
      </div>

       <div className="mt-8">
        {events.length === 0 ? (
          <div className="bg-gray-50 rounded-lg shadow hover:shadow-md transition overflow-hidden mx-auto lg:col-span-3 w-full max-w-xl text-center">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-2">No events</h3>
              <p className="text-gray-600">
                There are no diocesan events at the moment.
              </p>
            </div>
          </div>
        ) : (
          <EventGrid items={events} />
        )}
      </div>

      <div className="mt-8 text-center">
        <AnimatedButton
          href="/event"
          label=" View All Events"
          variant="secondary"
        />
      </div>
    </section>
  );
}
