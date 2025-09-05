"use client";

import PageBanner from "../../components/banner/PageBanner";
import HistorySection from "./History";
import DeaneriesSection from "./Parishes";
import PoliciesSection from "./PoliciesSection";
import AboutBishopPreview from "./AboutBishop";
import CoatOfArmsSection from "./CoatOfArm";
import { cinzel } from "@/font";

// const ministries = [
//   {
//     title: 'Governing Body Of The Diocese',
//     img: '/assets/popeleo.jpeg', // update with your actual path
//     link: '/people',
//   },
//   {
//     title: 'OTHER CHURCHES (RITES)',
//     img: '/assets/popeleo2.jpeg', // update with your actual path
//     link: '/other-rites',
//   },
//   {
//     title: 'VISITING CLERGY',
//     img: '/assets/popeleo3.jpeg', // update with your actual path
//     link: '/visiting-clergy',
//   },
// ];

export default function page() {
  return (
    <section>
      <PageBanner
        title="About Us"
        subtitle="Learn more about our mission and values"
      />
      <HistorySection />
      <AboutBishopPreview />
       <section className="py-16 px-4 max-w-6xl mx-auto text-justify">
        <h2 className={`${cinzel.className} text-3xl font-bold text-center mb-6`}>Mission Statement</h2>
        <p className="text-gray-800 leading-relaxed text-center max-w-4xl mx-auto">
         Our mission is to proclaim the Gospel of Christ, nurture spiritual growth through worship, teaching, and fellowship, and serve as a compassionate presence in our community, fostering hope and transformation through God’s grace.

        </p>
      </section>
      <CoatOfArmsSection />
      <DeaneriesSection />
      <PoliciesSection />
    </section>
  );
}
