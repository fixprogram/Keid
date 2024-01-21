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
  const userProjectNames = await getUserProjectNames(userId);
  const projectAmount = userProjectNames.length;

  return {
    projectAmount,
    userProjectNames,
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

      <div
        className="absolute w-[310px] h-[310px] blur-[40.7742px] opacity-50 top-[-11.15%] left-[-32.53%] mix-blend-overlay rounded-full z-10"
        style={{
          background:
            "radial-gradient(57.72% 57.72% at 61.86% 38.92%, #EF88ED 0%, #7269E3 54.46%, #8350DB 100%)",
        }}
      />

      <div
        className="absolute w-[376px] h-[376px] blur-[40.7742px] opacity-50 bottom-[-11.76%] right-[-32.27%] mix-blend-overlay rounded-full z-10"
        style={{
          background:
            "radial-gradient(57.72% 57.72% at 61.86% 38.92%, #EF88ED 0%, #7269E3 54.46%, #8350DB 100%)",
        }}
      />
    </section>
  );
}

// interface LayoutPropsType {
//   children: React.ReactNode;
// }

// export default async function Layout({ children }: LayoutPropsType) {
//   return children;
// }
