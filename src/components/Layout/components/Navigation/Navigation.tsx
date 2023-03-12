import Link from "next/link";

import { useRouter } from "next/router";
import Icon from "@/components/Icon";

const NAV_LINKS = [
  {
    iconName: "home",
    iconSize: { width: 20, height: 20 },
    alt: "Home page",
    to: "/home",
  },
  {
    iconName: "goals",
    iconSize: { width: 19, height: 20 },
    alt: "Goals page",
    to: "/goals",
  },
  {
    iconName: "notification",
    iconSize: { width: 20, height: 22 },
    alt: "Profile page",
    to: "/profile",
  },
  {
    iconName: "search",
    iconSize: { width: 21, height: 21 },
    alt: "Search page",
    to: "/search",
  },
];

export default function Navigation() {
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-background1/[.85] backdrop-blur-[10.8731px]">
      <ul className="flex pt-4 pb-10 px-[20px] mx-auto max-w-xs	 justify-between items-center">
        {NAV_LINKS.map((navItem, index, arr) => {
          const isActive = router.pathname === navItem.to;

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
          <button className="w-10 h-10 bg-primary rounded-full flex justify-center items-center	shadow-addBtn">
            <Icon name="plus" height={10} width={10} color={"#fff"} />
          </button>
        </li>
      </ul>
    </nav>
  );
}
