import Icon from "@/shared/ui/Icon";
import Link from "next/link";
import { FC } from "react";
import { useNavigationStore } from "@/widgets/Navigation/model/useNavigationStore";
import { usePathname } from "next/navigation";
import { useUser } from "@/entities/user/models/userContext";

export const DashboardHeader: FC = () => {
  const pathname = usePathname();
  // const userId = useNavigationStore((state) => state.userId);
  const user = useUser();

  const page = pathname?.split("/").at(-1);

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2" style={{ alignItems: "flex-end" }}>
        <h2 className="text-white text-xl font-poppins font-semibold">
          {page === "overview" ? "Overview" : "Productivity"}
        </h2>
        <p className="text-white opacity-30">|</p>
        <Link
          className="text-white text-xl font-poppins font-semibold"
          href={`/dashboard/${
            page === "overview" ? "productivity" : "overview"
          }`}
          style={{
            opacity: 0.3,
            fontWeight: 400,
            fontSize: "13px",
            lineHeight: "17px",
          }}
        >
          {page === "overview" ? "Productivity" : "Overview"}
        </Link>
      </div>

      <Link
        href={`/profile/${user?.userId}`}
        className="w-[40px] h-[40px] rounded-full"
      >
        <Icon name="avatar" width={40} height={40} />
      </Link>
    </div>
  );
};
