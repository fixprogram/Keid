import Link from "next/link";

import { useRouter } from "next/router";
import Icon from "@/components/Icon";
import { ACCENT_COLOR, GRAY_COLOR } from "@/constants";

const NAV_LINKS = [
  {
    iconName: "home",
    alt: "Home page",
    to: "/home",
  },
  {
    iconName: "goals",
    alt: "Goals page",
    to: "/goals",
  },
  {
    iconName: "profile",
    alt: "Profile page",
    to: "/profile",
  },
];

export default function Navigation() {
  const router = useRouter();

  return (
    <nav className="border-t-2 border-lightGray absolute bottom-0 left-0 w-full">
      <ul className="flex py-[18px] px-[54px] justify-between items-center">
        {NAV_LINKS.map((navItem) => {
          const iconColor =
            router.pathname === navItem.to ? ACCENT_COLOR : GRAY_COLOR;

          return (
            <li key={navItem.to}>
              <Link href={navItem.to}>
                <Icon name={navItem.iconName} size={25} color={iconColor} />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
