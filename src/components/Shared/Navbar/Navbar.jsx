"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { redirect, usePathname } from "next/navigation";

import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

import {
  FaBookOpen,
  FaPlus,
  FaRegCalendarCheck,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserPlus,
} from "react-icons/fa";

import { MdOutlineMeetingRoom, MdDashboardCustomize } from "react-icons/md";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Avatar,
  Button,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const Navbar = () => {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);

  const { data: session } = authClient.useSession();

  const user = session?.user;

  console.log(user, session);

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Successfully Logged out");

    redirect("/");
  };

  const isActive = (href) => pathname === href;

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // PUBLIC NAVIGATION
  const navLinks = [
    {
      href: "/",
      label: "Home",
      icon: <MdDashboardCustomize size={18} />,
    },
    {
      href: "/rooms",
      label: "Rooms",
      icon: <MdOutlineMeetingRoom size={18} />,
    },
  ];

  // PRIVATE NAVIGATION
  const privateLinks = [
    {
      href: "/add-rooms",
      label: "Add Room",
      icon: <FaPlus size={15} />,
    },
    {
      href: "/my-listings",
      label: "My Listings",
      icon: <FaBookOpen size={15} />,
    },
    {
      href: "/my-bookings",
      label: "My Bookings",
      icon: <FaRegCalendarCheck size={15} />,
    },
  ];

  // DESKTOP NAV LINK STYLE
  const desktopLinkClass = (href) =>
    `relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
      isActive(href)
        ? "text-white bg-white/10 border border-white/10"
        : "text-slate-300 hover:text-white hover:bg-white/5"
    }`;

  // MOBILE DRAWER LINK STYLE
  const mobileLinkClass = (href) =>
    `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
      isActive(href)
        ? "bg-violet-500/20 text-white border border-violet-500/30"
        : "text-slate-300 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <>
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0B1120]/90 backdrop-blur-xl">
        <div className="max-w-11/12 mx-auto h-20 px-4 md:px-6 flex items-center justify-between">
          {/* LEFT */}

          <div className="flex justify-between items-center gap-20">
            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-slate-200 text-2xl"
            >
              {menuOpen ? <IoClose /> : <RxHamburgerMenu />}
            </button>

            {/* LOGO */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/navbar.png"
                alt="StudyNook"
                // className="h-10 w-auto"
                width={200}
                height={200}
              />
            </Link>
          </div>

          {/* MIDDLE */}
          <div>
            {/* DESKTOP NAV LINKS */}
            <ul className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={desktopLinkClass(link.href)}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                </li>
              ))}

              {/* PRIVATE LINKS */}
              {user &&
                privateLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={desktopLinkClass(link.href)}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* RIGHT */}
          <div>
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <>
                  {/* PROFILE DROPDOWN */}
                  <Dropdown className="bg-cyan-800">
                    <Dropdown.Trigger className="rounded-full">
                      <Avatar className="size-12">
                        {" "}
                        <Avatar.Image
                          referrerPolicy="no-referrer"
                          src={user?.image}
                          name={user?.name}
                          size=""
                        />
                        <Avatar.Fallback>
                          {user?.name.charAt(0)}
                        </Avatar.Fallback>
                      </Avatar>
                    </Dropdown.Trigger>

                    <Dropdown.Popover className="bg-[#111827] border border-white/10 shadow-2xl shadow-black/50 min-w-55 rounded-2xl">
                      <Dropdown.Menu
                        aria-label="Profile Actions"
                        className="text-white p-1"
                        itemClasses={{
                          base: [
                            "rounded-xl",
                            "text-white",
                            "data-[hover=true]:bg-white/10",
                            "data-[hover=true]:text-white",
                          ],
                        }}
                      >
                        <Dropdown.Item
                          key="profile"
                          isReadOnly
                          className="border-b border-white/10 mb-1 pb-3 opacity-100 cursor-default"
                        >
                          <div className="flex items-center gap-3 py-1">
                            <Avatar>
                              {" "}
                              <Avatar.Image
                                referrerPolicy="no-referrer"
                                src={user?.image}
                                name={user?.name}
                                size="sm"
                              />
                              <Avatar.Fallback>
                                {user?.name.charAt(0)}
                              </Avatar.Fallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-semibold text-cyan-500 ">
                                {user?.name}
                              </p>
                              <p className="text-xs text-slate-400">
                                {user?.email}
                              </p>
                            </div>
                          </div>
                        </Dropdown.Item>

                        <Dropdown.Item
                          key="listings"
                          as={Link}
                          href="/my-listings"
                          className="mt-1 "
                        >
                          <FaBookOpen /> My Listings
                        </Dropdown.Item>

                        <Dropdown.Item
                          key="bookings"
                          as={Link}
                          href="/my-bookings"
                        >
                          <FaRegCalendarCheck className="text-cyan-400" /> My
                          Bookings
                        </Dropdown.Item>

                        <Dropdown.Item
                          key="logout"
                          className="text-red-400 data-[hover=true]:bg-red-500/10 mt-1 border-t border-white/10"
                          color="danger"
                          onPress={handleLogout}
                          startContent={<FaSignOutAlt />}
                        >
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown.Popover>
                  </Dropdown>

                  <Button
                    onPress={handleLogout}
                    className="w-full bg-red-500/10 text-red-400 border border-red-500/20"
                  >
                    <FaSignOutAlt />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  {/* LOGIN */}
                  <Link href="/login">
                    <Button
                      radius="lg"
                      variant="outline"
                      className="border-white/10 bg-white/5 text-white hover:bg-white/10 p-5 flex gap-3"
                    >
                      <FaSignInAlt />
                      Login
                    </Button>
                  </Link>

                  {/* REGISTER */}
                  <Link href="/register">
                    <Button
                      radius="lg"
                      className="bg-linear-to-r from-violet-500 to-cyan-500 text-white font-semibold p-5 flex gap-3"
                    >
                      <FaUserPlus />
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
            <div className="flex flex-col items-center gap-5"></div>
          </div>
        </div>
      </nav>

      {/* OVERLAY */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* MOBILE DRAWER */}
      <div
        className={`fixed  top-0 left-0 z-50 h-full w-75 bg-[#0F172A] border-r border-white/10 p-5 transition-all duration-300 lg:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* DRAWER HEADER */}
        <div className="flex items-center justify-between mb-10">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3"
          >
            <Image src="/navbar.png" alt="StudyNook" width={180} height={180} />
          </Link>

          <button
            onClick={() => setMenuOpen(false)}
            className="text-white text-2xl"
          >
            <IoClose />
          </button>
        </div>

        {/* NAVIGATION */}
        <div className="space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={mobileLinkClass(link.href)}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}

          {/* PRIVATE ROUTES */}
          {user &&
            privateLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={mobileLinkClass(link.href)}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
        </div>

        {/* BOTTOM AREA */}
        <div className="absolute bottom-5 left-5 right-5">
          {user ? (
            <div className="flex flex-col items-center gap-5">
              <div className="flex items-center gap-3 py-1">
                <Avatar className="">
                  {" "}
                  <Avatar.Image
                    referrerPolicy="no-referrer"
                    src={user?.image}
                    name={user?.name}
                    size="md"
                  />
                  <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {user?.name}
                  </p>
                  <p className="text-xs text-slate-400">{user?.email}</p>
                </div>
              </div>
              <Button
                onPress={handleLogout}
                className="w-full bg-red-500/10 text-red-400 border border-red-500/20"
              >
                <FaSignOutAlt />
                Logout
              </Button>
            </div>
          ) : (
            <div className="space-y-3 flex flex-col">
              <Link href="/login">
                <Button className="w-full bg-white/5 border border-white/10 text-white">
                  <FaSignInAlt />
                  Login
                </Button>
              </Link>

              <Link href="/register">
                <Button className="w-full bg-linear-to-r from-violet-500 to-cyan-500 text-white">
                  <FaUserPlus />
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
