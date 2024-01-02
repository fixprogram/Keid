import { PopupWithOverlay } from "@/shared/components/PopupWithOverlay";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment } from "react";
import Icon from "../../shared/ui/Icon";

interface Props {
  title: string;
}

const screens = [
  {
    title: "Tasks",
    link: "/tasks",
  },
  // {
  //   title: "Overdue tasks",
  //   link: "/tasks/overdue",
  // },
  {
    title: "Projects",
    link: "/projects",
  },
  {
    title: "Habits",
    link: "/habits",
  },
  {
    title: "Challenges",
    link: "/challenges",
  },
];

export default function PageHeader({ title }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between">
      <button type="button" onClick={() => router.back()}>
        <Icon name="back" height={27} width={27} />
      </button>

      <PopupWithOverlay
        btn={
          <h2 className="font-semibold text-xl text-white font-poppins">
            {title}
          </h2>
        }
        positioned="Top"
      >
        <ul>
          {screens.map((screen, index, array) => (
            <Fragment key={screen.link}>
              <li>
                <Link
                  href={screen.link}
                  className={`block text-left font-semibold p-5 pl-10 w-full  ${
                    pathname === screen.link ? "text-white" : "text-deactive"
                  }`}
                >
                  {screen.title}
                </Link>
              </li>
              {array.length - 1 !== index ? (
                <div className="w-full bg-white/5 h-[1px]" />
              ) : null}
            </Fragment>
          ))}
        </ul>
      </PopupWithOverlay>

      {/* <button type="button">
        <Icon name="add" height={50} width={50} />
      </button> */}
      <div style={{ width: 27, height: 27 }}></div>
    </div>
  );
}
