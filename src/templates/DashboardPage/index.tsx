import Greeting from "@/shared/ui/Greeting";
import Icon from "@/shared/ui/Icon";
import Layout from "@/widgets/Layout";
import Overview from "@/widgets/Overview";
import Link from "next/link";
import { FC } from "react";

export const DashboardPage: FC = () => {
  return (
    <Layout>
      <div className="flex items-center justify-between">
        <h2 className="text-white text-xl font-poppins font-semibold">
          Dashboard
        </h2>

        <Link href="/profile" className="w-[48px] h-[48px] rounded-full">
          <Icon name="avatar" width={48} height={48} />
        </Link>
      </div>

      <Greeting />

      <Overview />
    </Layout>
  );
};
