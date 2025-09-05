import PageBanner from "../../components/banner/PageBanner";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
// import { motion } from 'framer-motion';

export default function Page() {
  return (
    <>
      <PageBanner
        title="Contact Us"
        subtitle="for inquiries and support"
        backgroundImage="/assets/popeleo3.jpeg"
      />

      {/* Contact Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form  className="space-y-6 bg-white p-6 shadow rounded">
            <h2 className="text-2xl font-semibold text-[#0C1A2B]">
              Send Us a Message
            </h2>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea className="w-full border border-gray-300 rounded px-4 py-2 h-32 focus:outline-none focus:ring" />
            </div>
            <button
              type="submit"
              className="bg-[#DAA520] text-white px-6 py-2 rounded hover:bg-[#caa547] transition"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="bg-[#f9fafb] p-6 rounded shadow space-y-6">
            <h2 className="text-2xl font-semibold text-[#0C1A2B]">
              Get in Touch
            </h2>
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-[#DAA520] mt-1" />
              <p>Nagogo Road, Opposite NITEL Exchange GRA</p>{" "}
            </div>
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-[#DAA520] mt-1" />
              <p>P.O. BOX 55, Katsina State, Nigeria</p>{" "}
            </div>
            <div className="flex items-start gap-4">
              <FaPhone className="text-[#DAA520] mt-1" />
              <p>+234 810 646 4244</p>
            </div>
            <div className="flex items-start gap-4">
              <FaEnvelope className="text-[#DAA520] mt-1" />
              <p>cathdiokatcomm@gmail.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-96 mt-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.6490626465265!2d7.617840075076855!3d12.994283487323225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11b02337c6fedbab%3A0xf81cd1ab951ca66e!2sSt.%20Martin%20De%20Porres%20Catholic%20Cathedral%20Church%20Katsina.!5e0!3m2!1sen!2sng!4v1753134344830!5m2!1sen!2sng"
          width="600"
          height="450"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </>
  );
}
