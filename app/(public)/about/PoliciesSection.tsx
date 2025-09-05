'use client';

import Link from 'next/link';
import React from 'react';

export default function PoliciesSection() {
  return (
    <section className="relative bg-green-900 py-16 px-4 overflow-hidden">
      {/* Watermark Logo */}
      <div
        className="absolute inset-0 opacity-5 bg-no-repeat bg-center bg-cover bg-[url('/assets/logo.jpg')] bg-fixed "
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-[#D6A739]">
          Our Policies & Commitment
        </h2>
        <p className="text-gray-200 max-w-3xl mx-auto mb-12">
          The Catholic Diocese of Katsina is committed to creating a safe, respectful,
          and nurturing environment for all members of the Church, especially children
          and vulnerable persons. Our policies are rooted in the Gospel and Catholic
          Social Teaching, ensuring integrity, accountability, and compassion in all
          our ministries.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* Child Protection */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2 text-red-700">
              Child Protection Policy
            </h3>
            <p className="text-gray-700 mb-4">
              Our safeguarding measures are designed to protect children from any form of abuse,
              harm, or neglect, in full compliance with Church and civil laws.
            </p>
            <Link
              href="/docs/child-protection-policy.pdf"
              target="_blank"
              className="text-emerald-700 hover:underline text-sm"
            >
              Read More →
            </Link>
            
          </div>

          {/* Code of Conduct */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2 text-red-700">
              Code of Conduct
            </h3>
            <p className="text-gray-700 mb-4">
              Our clergy, catechists, and volunteers adhere to a clear code of ethics and conduct
              that reflects the dignity of the human person and the mission of the Church.
            </p>
            <Link
              href="/docs/code-of-conduct.pdf"
              target="_blank"
              className="text-emerald-700 hover:underline text-sm"
            >
              Read More →
            </Link>
          </div>

          {/* Safe Ministry */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2 text-red-700">
              Safe Ministry Guidelines
            </h3>
            <p className="text-gray-700 mb-4">
              We implement safe ministry practices to ensure that our faith activities
              promote respect, responsibility, and the well-being of all participants.
            </p>
            <Link
              href="/docs/safe-ministry-guidelines.pdf"
              target="_blank"
              className="text-emerald-700 hover:underline text-sm"
            >
              Read More →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
