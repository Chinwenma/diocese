'use client';

import SectionHeading from "@/app/components/heading/SectionHeading";

const bankDetails = [

  {
    bank: 'Zenith Bank',
    accountName: 'Catholic Diocese of Katsina',
    accountNumber: '1229311461',
  },
];

export default function DonatePage() {
  return (
    <main className="py-12 px-4 text-center">
      <div className="max-w-6xl mx-auto space-y-16">
        
        <SectionHeading 
        title="Support the Mission"
        subtitle="Your generosity helps us grow the mission of Christ in our diocese. Whether it&apos;s for building projects, seminary formation, or outreach ministries — every gift counts."
        />
        <section>
          <h2 className="text-3xl font-semibold text-[#228b22] mb-6">Bank Details</h2>
          <div className="text-center mx-auto">
            {bankDetails.map((bank, idx) => (
              <div
                key={idx}
                className="bg-blue-50 p-6 rounded shadow-sm border border-blue-100 mx-auto max-w-md"
              >
                <h3 className="text-2xl font-semibold mb-2">{bank.bank}</h3>
                <p>
                  <span className="font-semibold ">Account Name:</span> {bank.accountName}
                </p>
                <p>
                  <span className="font-semibold">Account Number:</span> {bank.accountNumber}
                </p>
              </div>
            ))}
          </div>
        </section>

{/*     
        <section className="text-center">
          <p className="text-gray-700">
            To make donations in cash or kind, please contact the Diocesan Finance Office or the Bishop&apos;s Secretariat.
          </p>
        </section> */}
      </div>
    </main>
  );
}
