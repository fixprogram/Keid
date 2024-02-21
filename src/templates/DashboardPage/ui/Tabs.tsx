"use client";

import { usePathname } from "next/navigation";
import { FC } from "react";
import Link from "next/link";

const tabs = [
  {
    title: "Overview",
    link: "/dashboard/overview",
  },
  {
    title: "Productivity",
    link: "/dashboard/productivity",
  },
];

export const Tabs: FC = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between mt-8">
      <ul className="flex gap-6">
        {tabs.map((tab) => {
          const isActive = pathname === tab.link;

          return (
            <li key={tab.link}>
              <Link
                href={tab.link}
                className={`font-bold text-lg py-1 block border-b-2 pb-3`}
                style={{
                  color: isActive ? "#fff" : "rgba(255,255,255, .3)",
                  borderColor: isActive ? "#FFF" : "unset",
                  borderBottomWidth: isActive ? "2px" : 0,
                }}
              >
                {tab.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
