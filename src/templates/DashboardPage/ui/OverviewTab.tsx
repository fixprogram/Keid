import { FC } from "react";
import { DashboardHeader } from "./DashboardHeader";
import Layout from "@/widgets/Layout";
import { Tabs } from "./Tabs";
import { OverviewContent } from "./OverviewContent";

export const OverviewTab: FC = () => {
  return (
    <Layout>
      <DashboardHeader />

      <Tabs />

      <OverviewContent />
    </Layout>
  );
};
