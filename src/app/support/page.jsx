import { MdExpandMore } from "react-icons/md";
import { FaBookOpen, FaHeadset, FaBug } from "react-icons/fa";
import Link from "next/link";

export const metadata = { title: "Support Center" };

const faqs = [
  {
    q: "How do I book a study room?",
    a: "Browse the Rooms page, click on a room you like, and click 'Book This Room'. Select your date, start and end time, and confirm your booking.",
  },
  {
    q: "Can I cancel my booking?",
    a: "Yes. Go to My Bookings, find the booking you want to cancel, and click the Cancel button. Cancellation is only available for future bookings.",
  },
  {
    q: "How do I list my room on StudyNook?",
    a: "Log in and click 'Add Room' in the navigation. Fill in your room details, amenities, and hourly rate. Your room will be live immediately.",
  },
  {
    q: "What payment methods are accepted?",
    a: "StudyNook currently shows pricing for transparency. Payment processing will be available in the next release.",
  },
  {
    q: "Can two people book the same room at the same time?",
    a: "No. StudyNook has a real-time conflict detection system that prevents double bookings on the same room and time slot.",
  },
  {
    q: "How do I edit or delete my listed room?",
    a: "Go to the room details page. If you're the owner, you'll see Edit and Delete buttons. Only the room owner can modify or remove a listing.",
  },
];

const SupportPage = () => {
  return (
    <section className="min-h-screen bg-[#0B1120] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* HEADING */}
        <div className="text-center mb-16">
          <div className="group relative inline-flex items-center overflow-hidden rounded-full border border-violet-500/20 bg-white/5 px-5 py-2 text-sm text-slate-200 backdrop-blur-xl mb-6">
            <div className="absolute inset-0 bg-linear-to-r from-violet-500/10 via-cyan-500/10 to-violet-500/10 opacity-80 blur-lg" />
            <span className="relative z-10 font-medium tracking-wide">
              Help Center
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white font-(family-name:--font-space-grotesk)">
            Support{" "}
            <span className="bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Center
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-slate-400 leading-relaxed">
            Find answers to common questions or reach out to our team for help.
          </p>
        </div>

        {/* QUICK HELP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: <FaBookOpen className="text-violet-400 text-2xl" />,
              title: "Getting Started",
              description: "Learn how to browse, book, and manage study rooms.",
              color: "bg-violet-500/10",
            },
            {
              icon: <FaHeadset className="text-cyan-400 text-2xl" />,
              title: "Contact Support",
              description: "Reach our team directly for personalized help.",
              href: "/contact",
              color: "bg-cyan-500/10",
            },
            {
              icon: <FaBug className="text-pink-400 text-2xl" />,
              title: "Report an Issue",
              description: "Found a bug? Let us know and we'll fix it fast.",
              href: "/contact",
              color: "bg-pink-500/10",
            },
          ].map((card, index) => (
            <Link
              key={index}
              href={card.href || "#"}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-violet-500/30 transition-all duration-300 block"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${card.color} mb-4`}
              >
                {card.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {card.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {card.description}
              </p>
            </Link>
          ))}
        </div>

        {/* FAQ */}
        <h2 className="text-2xl font-bold text-white font-(family-name:--font-space-grotesk) mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 mb-16">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group rounded-2xl border border-white/10 bg-white/5 px-6 py-4 hover:border-violet-500/20 transition-all duration-300"
            >
              <summary className="flex items-center justify-between cursor-pointer text-white font-medium list-none">
                {faq.q}
                <MdExpandMore className="text-slate-400 text-xl group-open:rotate-180 transition-transform duration-300 shrink-0 ml-4" />
              </summary>
              <p className="mt-4 text-slate-400 text-sm leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>

        {/* STILL NEED HELP */}
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-center">
          <h3 className="text-2xl font-bold text-white font-(family-name:--font-space-grotesk) mb-3">
            Still Need Help?
          </h3>
          <p className="text-slate-400 mb-6">
            Our support team is ready to assist you with any issue.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-linear-to-r from-violet-500 to-cyan-500 text-white font-semibold hover:opacity-90 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SupportPage;
