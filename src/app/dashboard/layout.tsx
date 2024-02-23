import Sprite from "@/shared/components/Sprite";
import Container from "@/widgets/Layout/components/Container";
import Navigation from "@/widgets/Navigation";
import { getServerUser } from "../lib/getServerUser";
import getUserProjectNames from "../lib/data/user/getUserProjectNames";
import { DashboardHeader } from "@/templates/DashboardPage/ui/DashboardHeader";
import { Tabs } from "@/templates/DashboardPage/ui/Tabs";
import { cache } from "react";

const getNavData = cache(async () => {
  const user = await getServerUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const userId = user.id;
  const userProjects = await getUserProjectNames(userId);
  const projectAmount = userProjects.length;

  return {
    projectAmount,
    userProjects,
    userId,
    userName: user.name,
  };
});

interface LayoutPropsType {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutPropsType) {
  const navData = await getNavData();

  return (
    <section className="bg-background1 min-h-screen	relative overflow-hidden">
      <Sprite />

      <section className="relative z-20 min-h-screen flex flex-col">
        <Container withNav={true}>
          <DashboardHeader />

          <Tabs />

          {children}
        </Container>
        <Navigation navData={navData} />
      </section>
    </section>
  );
}
