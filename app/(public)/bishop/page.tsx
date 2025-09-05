'use client';

import PageBanner from '@/app/components/banner/PageBanner';
import Image from 'next/image';

export default function BishopPage() {
  return (
    <main>
        <PageBanner
              title='Our Bishop'/>
    
    <section className=" py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
          <Image
            src="/assets/bishop.png"
            alt="Bishop Gerald Mamman Musa"
            width={250}
            height={250}
            className="rounded-lg shadow-lg object-cover"
          />
          <div className="text-center md:text-left ">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Most Reverend Gerald Mamman Musa
            </h1>
            <p className="text-sm text-gray-500">
              Bishop of the Catholic Diocese of Katsina
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-white p-12 rounded-lg shadow-md text-justify">
          <article className="prose prose-gray max-w-none">
            <p>
              <strong className='text-2xl'>Most Reverend Gerald Mamman Musa</strong> was until now, a priest of the
              Catholic Diocese of Sokoto, which covers Sokoto, Kebbi, Zamfara and Katsina states.
            </p>

            <p>
              The native of Argungu, Kebbi State, he was born on 16 January 1971 in Gusau, Zamfara
              State. He began schooling at Army Children School, Gusau and Tunau Primary School,
              Malumfashi. He trained for priesthood at St. Joseph Minor Seminary, Zaria, and earned
              diplomas and degrees in Theology and Religious Studies at seminaries affiliated with
              the University of Ibadan and the Pontifical Urban University, Rome.
            </p>

            <p>
              He earned an MA in Dogmatic Theology at the Angelicum (Rome, 2005), a Licentiate in
              Social Sciences at the Pontifical Gregorian University (2006), and a PhD in
              Communication Studies at the University of Queensland (Australia, 2013).
            </p>

            <h3 className='font-bold text-3xl text-black my-2'>Pastoral Ministry</h3>
            <ul>
              <li>Parish Priest – St. Patrick&apos;s, Illela (2001–2003)</li>
              <li>Parish Priest – St. Vincent Ferrer, Malumfashi (2007–2008)</li>
              <li>Administrator – Upper Mount Gravatt-Wishart Parish, Brisbane (2012–2013)</li>
              <li>Chaplain and Residence Roles – Brisbane (2008–2012)</li>
            </ul>

            <h3 className='font-bold text-3xl text-black my-2'>Administration &amp; Ecumenical Leadership</h3>
            <ul>
              <li>Diocesan Secretary, Sokoto (1995–2000)</li>
              <li>Associate Cathedral Administrator – Holy Family Cathedral, Sokoto</li>
              <li>Secretary, CAN Sokoto (1998–2000)</li>
              <li>Exco Member – Inter-religious Council, Sokoto (2001–2003)</li>
            </ul>

            <h3 className='font-bold text-3xl text-black my-2'>Academic Career</h3>
            <ul>
              <li>Lecturer – University of Queensland (2012)</li>
              <li>Senior Lecturer &amp; Director – Centre for African Culture &amp; Communication, CIWA Port Harcourt</li>
              <li>Director of Examinations and Records (2013–2022)</li>
              <li>Supervised 28 Postgraduate theses</li>
            </ul>

            <h3 className='font-bold text-3xl text-black my-2'>Publications</h3>
            <ul>
              <li><em>Linking Belief and Life</em> (2008)</li>
              <li><em>Dialogue of Action</em> – Christian-Muslim Relations (2020, 2nd ed. ABU Press)</li>
              <li>Co-editor: <em>Our Stories: 25 Years After</em> (2021)</li>
            </ul>

            <blockquote className='font-bold text-black my-2'>
              &ldquo;Now, as I embark on this new chapter as a bishop, I am humbled by the trust and
              responsibility bestowed upon me by the Church. I am eager to continue serving,
              guiding, and shepherding the faithful... with compassion, wisdom, and unwavering
              devotion.&rdquo;
            </blockquote>
          </article>
        </div>
      </div>
    </section>
    </main>
  );
}
