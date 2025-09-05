import Link from "next/link";
import Image from "next/image";
import { cormorant } from "@/font";

export default function AboutBishopPreview() {
  return (
    <section className="bg-white py-12 px-4 rounded-lg shadow-sm">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">
        <Image
          src="/assets/bishop.png"
          alt="Bishop Gerald Mamman Musa"
          width={180}
          height={180}
          className="rounded-lg shadow-md object-cover"
        />
        <div>
          <h2 className={`${cormorant.className} text-2xl md:text-5xl font-bold text-gray-800 `}>
            Most Reverend Gerald Mamman Musa
          </h2>
          <p className="text-gray-800 mt-2 text-sm leading-relaxed">
            Bishop of the Catholic Diocese of Katsina, a devoted shepherd,
            academic, and bridge-builder with decades of pastoral,
            administrative, and scholarly service across Nigeria and abroad.
          </p>
          <Link
            href="/bishop"
            className="inline-block mt-4 text-amber-600 font-medium hover:underline"
          >
            Read full biography →
          </Link>
        </div>
      </div>
    </section>
  );
}
