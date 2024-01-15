import { FC } from "react";
import { DashboardHeader } from "./DashboardHeader";
import Layout from "@/widgets/Layout";
import { Tabs } from "./Tabs";
import OverviewContent from "./OverviewContent";

export const OverviewTab: FC<{ data: any }> = ({ data }: { data: any }) => {
  return (
    <Layout>
      <DashboardHeader />

      <Tabs />

      <OverviewContent data={data} />
    </Layout>
  );
};
