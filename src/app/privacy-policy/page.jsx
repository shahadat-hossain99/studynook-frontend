export const metadata = { title: "Privacy Policy" };

const sections = [
  {
    title: "Information We Collect",
    content:
      "We collect information you provide when creating an account, such as your name and email address via Google OAuth. We also collect booking data including room selections, dates, and times to provide our services.",
  },
  {
    title: "How We Use Your Information",
    content:
      "Your information is used to facilitate room bookings, send booking confirmations, and improve our platform. We do not sell your personal data to third parties under any circumstances.",
  },
  {
    title: "Authentication & Security",
    content:
      "StudyNook uses BetterAuth with Google OAuth for secure authentication. All sessions are managed with JWT tokens and your credentials are never stored directly on our servers.",
  },
  {
    title: "Data Storage",
    content:
      "Your data is stored securely in MongoDB Atlas with industry-standard encryption. Booking records are retained to maintain your booking history and support cancellation requests.",
  },
  {
    title: "Cookies",
    content:
      "We use session cookies for authentication purposes only. These are essential for the platform to function and cannot be disabled while using the service.",
  },
  {
    title: "Third-Party Services",
    content:
      "We use Google OAuth for authentication and MongoDB Atlas for data storage. These services have their own privacy policies which we encourage you to review.",
  },
  {
    title: "Your Rights",
    content:
      "You have the right to access, update, or delete your personal data at any time. To request data deletion, please contact us at support@studynook.com and we will process your request within 30 days.",
  },
  {
    title: "Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time. We will notify users of significant changes via email or a prominent notice on our platform.",
  },
];

const PrivacyPolicyPage = () => {
  return (
    <section className="min-h-screen bg-[#0B1120] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* HEADING */}
        <div className="text-center mb-16">
          <div className="group relative inline-flex items-center overflow-hidden rounded-full border border-violet-500/20 bg-white/5 px-5 py-2 text-sm text-slate-200 backdrop-blur-xl mb-6">
            <div className="absolute inset-0 bg-linear-to-r from-violet-500/10 via-cyan-500/10 to-violet-500/10 opacity-80 blur-lg" />
            <span className="relative z-10 font-medium tracking-wide">
              Legal
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white font-(family-name:--font-space-grotesk)">
            Privacy{" "}
            <span className="bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>
          <p className="mt-6 text-slate-400">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* INTRO */}
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 md:p-8 mb-8">
          <p className="text-slate-400 leading-relaxed">
            At <span className="text-white font-semibold">StudyNook</span>, we
            take your privacy seriously. This Privacy Policy explains how we
            collect, use, and protect your personal information when you use our
            platform. By using StudyNook, you agree to the practices described
            in this policy.
          </p>
        </div>

        {/* SECTIONS */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-violet-500/20 transition-all duration-300"
            >
              <h2 className="text-lg font-bold text-white mb-3 font-(family-name:--font-space-grotesk)">
                {index + 1}. {section.title}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* CONTACT */}
        <div className="mt-10 rounded-[32px] border border-white/10 bg-white/5 p-8 text-center">
          <h3 className="text-xl font-bold text-white font-(family-name:--font-space-grotesk) mb-3">
            Questions About This Policy?
          </h3>
          <p className="text-slate-400 mb-2 text-sm">
            Contact us at{" "}
            <a
              href="mailto:support@studynook.com"
              className="text-violet-400 hover:text-violet-300 transition"
            >
              support@studynook.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyPage;
