"use client";

import Link from "next/link";
import { useEffect } from "react";
import { NAV_LINKS } from "../config/consts";
import Icon from "@/shared/ui/Icon";
import { usePathname } from "next/navigation";
import { useNavigationStore } from "../model/useNavigationStore";
import { useQuery } from "@tanstack/react-query";
import { AddPopup } from "./AddPopup";
import { useUserStore } from "@/entities/user";
import { MAX_WIDTH } from "@/shared/config/consts";

async function getData() {
  const res = await fetch(`/api/navigation`);
  return await res.json();
}

export default function Navigation() {
  const pathname = usePathname();

  const setData = useNavigationStore((state) => state.setData);
  const userEmail = useUserStore((state) => state.email);

  const { data } = useQuery({
    queryKey: ["navigation", userEmail],
    queryFn: getData,
  });

  useEffect(() => {
    // Because it's not a next.js layout but just a component, then every time we change a page,
    // this component renders again. But maybe it's not a big deal, especially for now,
    // because we take data from cache instead of fetching it every time
    if (data) {
      setData(data);
    }
  }, [data, setData]);

  return (
    <nav
      className="fixed bottom-0 w-full bg-background1/[.85] backdrop-blur-[10.8731px] z-20"
      style={{ maxWidth: MAX_WIDTH }}
    >
      <ul className="flex pt-4 pb-10 px-[20px] mx-auto max-w-xs	 justify-between items-center">
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
              <Link href={navItem.to}>
                <Icon
                  name={`${navItem.iconName}${isActive ? "-active" : ""}`}
                  width={navItem.iconSize.width}
                  height={navItem.iconSize.height}
                  color={"#fff"}
                />
              </Link>

              {isActive ? (
                <div
                  className="absolute w-16 h-16 rounded-2xl rotate-45	bg-secondary "
                  style={{
                    left: `calc(-32px + ${navItem.iconSize.width / 2}px)`,
                    top: 64,
                  }}
                />
              ) : null}
            </li>
          );
        })}

        <li className="order-1">
          <AddPopup />
        </li>
      </ul>
    </nav>
  );
}
