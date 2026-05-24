"use client";

import Link from "next/link";
import Image from "next/image";
import { Separator } from "@heroui/react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineMail, MdOutlinePhone, MdArrowOutward } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0B1120]">
      {/* TOP GLOW */}
      <div className="absolute top-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="max-w-11/12 mx-auto px-4 md:px-6 pt-16 pb-8 relative z-10">
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* BRAND */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo_favicon.png"
                alt="StudyNook Logo"
                width={50}
                height={50}
                className="object-contain"
              />
              <div>
                <h2 className="text-2xl font-bold text-white">StudyNook</h2>
                <p className="text-xs text-slate-400 -mt-1">
                  Smart Study Booking
                </p>
              </div>
            </Link>

            <p className="mt-5 text-slate-400 leading-relaxed text-sm">
              Find and book peaceful study rooms for focused learning. A modern
              platform designed for students, researchers, and academic
              collaboration.
            </p>

            {/* SOCIALS */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="h-11 w-11 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-slate-300 hover:bg-gradient-to-r hover:from-violet-500 hover:to-cyan-500 hover:text-white transition-all duration-300"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* USEFUL LINKS — public routes only */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Useful Links
            </h3>
            <ul className="space-y-4">
              {usefulLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-slate-400 hover:text-white transition-all duration-300"
                  >
                    <MdArrowOutward className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">Company</h3>
            <ul className="space-y-4">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-slate-400 hover:text-white transition-all duration-300"
                  >
                    <MdArrowOutward className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Contact Us
            </h3>
            <div className="space-y-4">
              {/* EMAIL */}
              <a
                href="mailto:support@studynook.com"
                className="flex items-center gap-3 text-slate-400 hover:text-white transition-all duration-300 group"
              >
                <div className="h-11 w-11 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/10 transition-all duration-300">
                  <MdOutlineMail size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="text-sm text-slate-300">
                    support@studynook.com
                  </p>
                </div>
              </a>

              {/* PHONE */}
              <a
                href="tel:+8801234567890"
                className="flex items-center gap-3 text-slate-400 hover:text-white transition-all duration-300 group"
              >
                <div className="h-11 w-11 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-violet-400 group-hover:bg-violet-500/10 transition-all duration-300">
                  <MdOutlinePhone size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Phone</p>
                  <p className="text-sm text-slate-300">+880 1234-567890</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <Separator className="my-10 bg-white/10" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} StudyNook. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="text-sm text-slate-500 hover:text-white transition-all duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-slate-500 hover:text-white transition-all duration-300"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// PUBLIC USEFUL LINKS — no private routes
const usefulLinks = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/rooms" },
  { label: "About", href: "/about" },
];

// COMPANY LINKS
const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Support Center", href: "/support" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

// SOCIAL LINKS — current branding
const socialLinks = [
  { label: "Facebook", icon: <FaFacebookF />, href: "https://facebook.com" },
  { label: "X", icon: <FaXTwitter />, href: "https://x.com" },
  { label: "LinkedIn", icon: <FaLinkedinIn />, href: "https://linkedin.com" },
  { label: "Instagram", icon: <FaInstagram />, href: "https://instagram.com" },
];
