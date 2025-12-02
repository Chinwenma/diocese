"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Download from "yet-another-react-lightbox/plugins/download";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";

import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";

export type GalleryImage = {
  id: string;
  src: string;
  title: string;
  description: string;
};

export default function GalleryClient({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState<number>(-1);

  return (
    <main className="bg-gray-100 min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <div
              key={img.id}
              className="overflow-hidden rounded-lg shadow cursor-pointer group relative transition-transform hover:scale-[1.02]"
              onClick={() => setIndex(i)}
            >
              <Image
                src={img.src}
                alt={img.title}
                width={600}
                height={400}
                className="w-full h-[250px] object-cover rounded-lg transition duration-500 ease-in-out group-hover:blur-[1px]"
              />

              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center text-white p-4 text-center">
                <h3 className="text-lg font-semibold">{img.title}</h3>
                <p className="text-sm mt-1">{img.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        <Lightbox
          open={index >= 0}
          close={() => setIndex(-1)}
          index={index}
          slides={images}
          on={{ view: ({ index }) => setIndex(index) }}
          plugins={[Zoom, Fullscreen, Thumbnails, Captions, Download]}
          captions={{
            showToggle: true,
            descriptionTextAlign: "center",
          }}
        />
      </div>
    </main>
  );
}
