"use client";

import Link from "next/link";
import { useEffect } from "react";
import { NAV_LINKS } from "../config/consts";
import Icon from "@/shared/ui/Icon";
import { usePathname } from "next/navigation";
import { useNavigationStore } from "../model/useNavigationStore";
import { AddPopup } from "./AddPopup";
import { MAX_WIDTH } from "@/shared/config/consts";

export default function Navigation({ navData }: { navData: any }) {
  const pathname = usePathname();

  const setData = useNavigationStore((state) => state.setData);

  // TODO: get rid of it and download user info only in userProvider
  useEffect(() => {
    // Because it's not a next.js layout but just a component, then every time we change a page,
    // this component renders again. But maybe it's not a big deal, especially for now,
    // because we take data from cache instead of fetching it every time

    if (navData) {
      setData(navData);
    }
  }, [navData, setData]);

  return (
    <nav
      className="fixed bottom-0 w-full bg-background1/[.85] backdrop-blur-[10.8731px] z-20"
      style={{ maxWidth: MAX_WIDTH }}
    >
      <ul className="flex pt-4 pb-4 px-5 mx-auto justify-between items-center">
        {NAV_LINKS.map((navItem, index, arr) => {
          const isActive =
            pathname === navItem.to || pathname?.startsWith(navItem.to);

          // setting order to Add button
          const orderNumber = index < arr.length / 2 ? 1 : 2;

          return (
            <li
              key={navItem.to}
              className={`relative`}
              style={{ order: orderNumber }}
            >
              <Link href={navItem.to} className="flex items-center flex-col">
                <Icon
                  name={`${navItem.iconName}${isActive ? "-active" : ""}`}
                  width={navItem.iconSize.width}
                  height={navItem.iconSize.height}
                  color={"#fff"}
                />

                <span className="mt-1 text-white" style={{ fontSize: "10px" }}>
                  {navItem.title}
                </span>
              </Link>
            </li>
          );
        })}

        <li className="order-1" style={{ marginTop: "-24px" }}>
          <AddPopup />
        </li>
      </ul>
    </nav>
  );
}
