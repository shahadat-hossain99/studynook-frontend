"use client";

import { useState } from "react";
import { MdOutlineMail, MdOutlinePhone, MdLocationOn } from "react-icons/md";
import { toast } from "react-toastify";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all required fields.");
      return;
    }
    setLoading(true);
    // Simulate submit — wire to your backend or EmailJS later
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setLoading(false);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-[#1e293b] border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500 transition";

  return (
    <section className="min-h-screen bg-[#0B1120] py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* HEADING */}
        <div className="text-center mb-16">
          <div className="group relative inline-flex items-center overflow-hidden rounded-full border border-violet-500/20 bg-white/5 px-5 py-2 text-sm text-slate-200 backdrop-blur-xl mb-6">
            <div className="absolute inset-0 bg-linear-to-r from-violet-500/10 via-cyan-500/10 to-violet-500/10 opacity-80 blur-lg" />
            <span className="relative z-10 font-medium tracking-wide">
              Get In Touch
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white font-(family-name:--font-space-grotesk)">
            Contact{" "}
            <span className="bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Us
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-slate-400 leading-relaxed">
            Have a question or feedback? We&apos;d love to hear from you. Send
            us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CONTACT INFO */}
          <div className="space-y-5">
            {[
              {
                icon: <MdOutlineMail className="text-cyan-400 text-xl" />,
                label: "Email",
                value: "support@studynook.com",
                href: "mailto:support@studynook.com",
                color: "bg-cyan-500/10",
              },
              {
                icon: <MdOutlinePhone className="text-violet-400 text-xl" />,
                label: "Phone",
                value: "+880 1234-567890",
                href: "tel:+8801234567890",
                color: "bg-violet-500/10",
              },
              {
                icon: <MdLocationOn className="text-pink-400 text-xl" />,
                label: "Address",
                value: "Dhaka, Bangladesh",
                href: "#",
                color: "bg-pink-500/10",
              },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 hover:border-violet-500/30 transition-all duration-300 group"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full ${item.color}`}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-slate-500">{item.label}</p>
                  <p className="text-sm text-slate-300 group-hover:text-white transition">
                    {item.value}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* CONTACT FORM */}
          <div className="lg:col-span-2 rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white font-(family-name:--font-space-grotesk) mb-6">
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm text-slate-300 mb-2 block">
                    Name *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-300 mb-2 block">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={inputClass}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-300 mb-2 block">
                  Subject
                </label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-sm text-slate-300 mb-2 block">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  rows={5}
                  className={`${inputClass} resize-none`}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-full bg-linear-to-r from-violet-500 to-cyan-500 text-white font-semibold disabled:opacity-60 hover:opacity-90 transition"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
