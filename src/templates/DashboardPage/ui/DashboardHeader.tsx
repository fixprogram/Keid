"use client";

import Icon from "@/shared/ui/Icon";
import Link from "next/link";
import { FC } from "react";
import { useUser } from "@/entities/user/models/userContext";

export const DashboardHeader: FC = () => {
  const user = useUser();

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2" style={{ alignItems: "flex-end" }}>
        <Icon name="logo-short" width={32} height={32} />
        <h2
          className="text-white text-xl font-poppins font-bold"
          style={{ fontSize: "20px" }}
        >
          Keid
        </h2>
      </div>

      <Link
        href={`/profile/${user?.id}`}
        className="w-[40px] h-[40px] rounded-full"
      >
        <Icon name="avatar" width={40} height={40} />
      </Link>
    </div>
  );
};
