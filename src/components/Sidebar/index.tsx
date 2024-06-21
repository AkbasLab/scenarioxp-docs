"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarLinkGroup from "./SidebarLinkGroup";
import path from "path";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const links = [
  { title: "project", path: "/project" },
  { title: "orthonormalize", path: "/orthonormalize" },
  { title: "Generate Rotation Matrix", path: "/generate-rotation-matrix" },
  {
    title: "Sample Out of Bounds Exception",
    path: "sample-of-bounds-exception",
  },
  { title: "Boundary Lost Exception", path: "boundary-lost-exception" },
  {
    title: "Exploration Complete Exception",
    path: "exploration-complete-exception",
  },
  { title: "Scenario Manager", path: "scenario-manager" },
  { title: "Scenario", path: "scenario" },
  { title: "Explorer", path: "explorer" },
  { title: "Exhaustive Explorer", path: "exhaustive-explorer" },
  { title: "Sequence Explorer", path: "sequence-explorer" },
<<<<<<< HEAD
  // { title: "Exhaustive Explorer", path: "/exhaustive-explorer" },
  // { title: "Sequence Explorer", path: "/sequence-explorer" },
=======
  { title: "Exhaustive Explorer", path: "/exhaustive-explorer" },
  { title: "Sequence Explorer", path: "/sequence-explorer" },
>>>>>>> cabd3b09ebe8152b9c5ccd5c9412ae3f50cb4f00
  { title: "Find Surface Explorer", path: "/find-surface-explorer" },
  { title: "Boundary RRT Explorer", path: "/boundary-rrt-explorer" },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col justify-between bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } overflow-auto`} // Add overflow-auto class here
    >
      <div>
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          <Link href="/">
            <Image
              // width={176}
              width={210}
              height={32}
              src={"/images/logo/logo.svg"}
              alt="Logo"
              priority
            />
          </Link>

          <button
            ref={trigger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="flex flex-col duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="px-4 py-4 lg:px-6">
            {/* <!-- Menu Group --> */}
            <div>
              <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                MENU
              </h3>

              <ul className="mb-6 flex flex-col gap-1.5">
                {/* <!-- Menu Item Tables --> */}
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.path}
                      className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                        pathname.includes("tables") &&
                        "bg-graydark dark:bg-meta-4"
                      }`}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
                {/* <!-- Menu Item Tables --> */}
              </ul>
            </div>

          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </div>

      {/* <!-- Sidebar Footer --> */}
      <div className="px-8 pb-6 text-[12px]">
        <h4>Authors</h4>
        <p>
          <strong>PhD Advisor:</strong> Dr. Mustafa Ilhan Akbas (
          <a href="mailto:akbasm@erau.edu">akbasm@erau.edu</a>)
        </p>
        <p>
          <strong>PhD Student:</strong> Quentin Goss (
          <a href="mailto:gossq@my.erau.edu">gossq@my.erau.edu</a>)
        </p>
        <p>
          <strong>Student Assistant:</strong> Nhat Quang Bui (
          <a href="mailto:gossq@my.erau.edu">quang.bs23dsy049@spjain.org</a>)
        </p>
        <p>
          <strong>Student Assistant:</strong> Aayush Aneja (
          <a href="mailto:gossq@my.erau.edu">aayush.bs23dmu002@spjain.org</a>)
        </p>
      </div>
      {/* <!-- Sidebar Footer --> */}
    </aside>
  );
};

export default Sidebar;
