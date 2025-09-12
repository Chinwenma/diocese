'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import PageBanner from '../../components/banner/PageBanner';
import SectionHeading from '@/app/components/heading/SectionHeading';
import ButtonLink from '@/app/components/button/Button';

const Section = ({ id, children }: { id?: string; children: React.ReactNode }) => (
  <section id={id} className="py-16 px-4 overflow-x-hidden">
    <div className="max-w-6xl mx-auto">{children}</div>
  </section>
);

// const Heading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
//   <div className="text-center mb-8">
//     <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
//     {subtitle && <p className="mt-3 text-gray-700 max-w-3xl mx-auto [overflow-wrap:anywhere]">{subtitle}</p>}
//   </div>
// );

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-xl shadow p-6 ${className}`}>{children}</div>
);

export default function CatecheticalCentrePage() {
  return (
    <main className="bg-white text-gray-800 overflow-x-hidden">
      <PageBanner title="Catechetical Centre" subtitle="Empowering Faith Through Catechesis" />

      <Section>
        <SectionHeading
          title="About the Centre"
          subtitle="The Catechetical Centre of the Catholic Diocese of Katsina forms missionary disciples through sound doctrine, pastoral accompaniment, and practical tools for parish life."
        />
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow min-w-0"
          >
            <Image src="/assets/cath2.jpg" alt="Catechetical Centre" fill className="object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="min-w-0"
          >
            <p className="text-gray-700 leading-relaxed [overflow-wrap:anywhere]">
              We collaborate with parishes, schools, families, and movements to plan catechetical
              paths for children, youth, and adults. Our mandate includes catechist formation,
              curriculum support, sacramental preparation, RCIA, and digital evangelization
              resources so that the light of Christ reaches every home, classroom, and online space.
            </p>
            <ul className="mt-4 grid sm:grid-cols-2 gap-3 text-gray-700">
              <li className="rounded-lg bg-gray-50 p-3">Parish & school catechesis support</li>
              <li className="rounded-lg bg-gray-50 p-3">Family faith formation tools</li>
              <li className="rounded-lg bg-gray-50 p-3">RCIA & adult initiation</li>
              <li className="rounded-lg bg-gray-50 p-3">Sacramental prep (Baptism–Confirmation)</li>
            </ul>
          </motion.div>
        </div>
      </Section>

      {/* Mission, Vision & Values */}
      <Section id="mission">
        <SectionHeading title="Mission & Vision" />
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <div className="h-1 w-20 bg-[#800000] rounded mb-5" />
            <h3 className="text-xl font-semibold mb-2">Mission</h3>
            <p className="text-gray-700 [overflow-wrap:anywhere]">
              To form disciples of Christ through systematic catechesis, catechist training,
              and the development of faithful resources that strengthen parish and community life.
            </p>
            <h4 className="mt-6 font-semibold">Core Values</h4>
            <ul className="mt-2 space-y-2 text-gray-700">
              <li>Fidelity to Scripture & Tradition</li>
              <li>Holiness, Witness & Charity</li>
              <li>Excellence in Teaching</li>
              <li>Service & Collaboration</li>
            </ul>
          </Card>

          <Card>
            <div className="h-1 w-20 bg-[#d0AE55] rounded mb-5" />
            <h3 className="text-xl font-semibold mb-2">Vision</h3>
            <p className="text-gray-700 [overflow-wrap:anywhere]">
              A Christ-centered Diocese where every faithful is formed, nourished,
              and sent as a missionary disciple.
            </p>
            <h4 className="mt-6 font-semibold">Pastoral Priorities</h4>
            <div className="grid sm:grid-cols-2 gap-3 text-gray-700">
              <div className="rounded-lg bg-gray-50 p-3">Catechist certification</div>
              <div className="rounded-lg bg-gray-50 p-3">Parish curriculum support</div>
              <div className="rounded-lg bg-gray-50 p-3">Family & RCIA accompaniment</div>
              <div className="rounded-lg bg-gray-50 p-3">Digital evangelization</div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Programs */}
      <Section id="programs">
        <SectionHeading title="Programs & Ministries" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Children & Youth Catechesis', text: 'Age-appropriate curricula, faith clubs, camps, and sacramental preparation.' },
            { title: 'Adult Faith Formation / RCIA', text: 'Inquiry, catechumenate, and mystagogia with sponsors and parish teams.' },
            { title: 'Sacramental Preparation', text: 'Baptism, First Reconciliation, First Communion, Confirmation, Marriage.' },
            { title: 'Catechist Training', text: 'Workshops, mentorship, and certification with diocesan standards.' },
            { title: 'Schools & Parish Support', text: 'Syllabi, lesson plans, and teacher formation for Catholic education.' },
            { title: 'Digital Evangelization', text: 'Online catechesis, media guides, and resource library for families.' },
          ].map(({ title, text }) => (
            <Card key={title}>
              <h4 className="font-semibold mb-2">{title}</h4>
              <p className="text-gray-700 text-sm [overflow-wrap:anywhere]">{text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
      
        <SectionHeading
        title='Catechist Formation & Certification'
        subtitle='Our multi-level track equips new and experienced catechists with doctrine, pedagogy, and pastoral skills'
        />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            ['Level I (Foundations)', 'Credo basics, liturgy, prayer, and classroom skills.'],
            ['Level II (Intermediate)', 'Scripture, moral theology, pedagogy, and methodology.'],
            ['Level III (Advanced)', 'Apologetics, pastoral practice, and specialization tracks.'],
          ].map(([title, text]) => (
            <Card key={title}>
              <h4 className="font-semibold mb-2">{title}</h4>
              <p className="text-gray-700 text-sm  [overflow-wrap:anywhere]">{text}</p>
            </Card>
          ))}
        </div>
      </Section>
 <Section>
      
        <SectionHeading
        title='Rules & Regulations for Students'
        subtitle='These guidelines are designed to foster discipline, spiritual growth, and communal harmony among students'
        />
        <div className="grid md:grid-cols-3 gap-6 text-justify">
          {[
            ['🙏 Spiritual & Personal Conduct', 'Must be a Catholic with a passion for evangelization and Church service. Expected to be prayerful, attend Mass regularly, and engage in community movements. Responsible for your spiritual and academic growth—no slacking!'],
            ['🧼 Discipline & Cleanliness', ' Respect authority, obey rules, and maintain honesty. Keep your room and surroundings clean. Participate in general labour every Saturday—no excuses!'],
            ['🚫 Restrictions & Permissions', 'No leaving the premises without permission from the Director or Assistant. Avoid unnecessary outings and unapproved food items. No electrical gadgets, musical instruments, drugs, or reading materials without permission. Visitors allowed only on weekends, and they must be well-behaved and properly dressed.'],
             ['📦 Responsibility', 'You are accountable for your personal belongings and the Centre’s property. Any damage? You pay for it. If you fall ill, report immediately to the Director or Assistant'],
          ].map(([title, text]) => (
            <Card key={title}>
              <h4 className="font-semibold mb-2">{title}</h4>
              <p className="text-gray-700 text-sm  [overflow-wrap:anywhere]">{text}</p>
            </Card>
          ))}
        </div>
      </Section>
      <Section>
        <SectionHeading 
        title='Ongoing Online Catechesis'/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow min-w-0"
          >
            <Image src="/assets/cath3.jpg" alt="Online Catechesis" fill className="object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="min-w-0"
          >
            <p className="text-gray-700 mb-4 [overflow-wrap:anywhere]">
              Weekly sessions via Zoom & YouTube cover Scripture, doctrine, liturgy,
              and moral life—open to all ages with Q&A and take-home guides.
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-700">
              <li>Live sessions + recordings</li>
              <li>Topics: Sacraments, Liturgy, Scripture, Prayer</li>
              <li>Open to parishioners and the general public</li>
            </ul>
                    <ButtonLink href="/contact" label="Find Out More" variant="primary" />
          
          </motion.div>
        </div>
      </Section>


      {/* FAQ */}
      <Section id="faq">
        <SectionHeading title="Frequently Asked Questions" />
        <div className="space-y-4">
          {[
            ['How do I become a catechist?', 'Speak with your parish priest; the Centre will enroll you in the next formation track.'],
            ['Are resources free to use?', 'Yes—materials intended for parish use are provided free or at minimal cost.'],
            ['Do you support remote parishes?', 'We provide itinerant teams, online sessions, and printable kits on request.'],
          ].map(([q, a]) => (
            <details key={q} className="group rounded-lg border p-4">
              <summary className="cursor-pointer font-semibold group-open:text-[#800000]">{q}</summary>
              <p className="mt-2 text-gray-700 [overflow-wrap:anywhere]">{a}</p>
            </details>
          ))}
        </div>
      </Section>
    </main>
  );
}
