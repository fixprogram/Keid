import Link from "next/link";
import { useRouter } from "next/router";
import Icon from "@/shared/ui/Icon";
import { Fragment } from "react";
import { openPopupAdd } from "../model/navigationSlice";
import PopupAdd from "./PopupAdd";
import AddButton from "@/shared/ui/AddButton";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { NAV_LINKS } from "../config/links";

export default function Navigation() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <Fragment>
      <nav className="fixed bottom-0 left-0 w-full bg-background1/[.85] backdrop-blur-[10.8731px] z-20">
        <ul className="flex pt-4 pb-10 px-[20px] mx-auto max-w-xs	 justify-between items-center">
          {NAV_LINKS.map((navItem, index, arr) => {
            const isActive =
              router.pathname === navItem.to ||
              router.pathname.startsWith(navItem.to);

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
            <AddButton handleClick={() => dispatch(openPopupAdd())} />
          </li>
        </ul>
      </nav>

      <PopupAdd />
    </Fragment>
  );
}
