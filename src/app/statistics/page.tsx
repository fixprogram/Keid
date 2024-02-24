import Container from "@/widgets/Layout/components/Container";
import Navigation from "@/widgets/Navigation";
import { Suspense, cache } from "react";
import getUserProjectNames from "../lib/data/user/getUserProjectNames";
import { getServerUser } from "../lib/getServerUser";
import Sprite from "@/shared/components/Sprite";
import { Statistics } from "./statistics";
import { getWeeklyActivityData } from "@/features/Activity/api";
import { useSearchParams } from "next/navigation";
import { Details } from "./details";

const getNavData = cache(async () => {
  const user = await getServerUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const userId = user.id;
  const userProjects = await getUserProjectNames(userId);
  const projectAmount = userProjects.length;
  const weeklyActivity = await getWeeklyActivityData(userId);

  return {
    navData: {
      projectAmount,
      userProjects,
      userId,
      userName: user.name,
    },
    weeklyActivity,
  };
});

export default async function Page() {
  const { navData, weeklyActivity } = await getNavData();

  if (!weeklyActivity) {
    return null;
  }

  return (
    <section className="bg-background1 min-h-screen	relative overflow-hidden">
      <Sprite />
      <section className="relative z-20 min-h-screen flex flex-col">
        <Container withNav={true}>
          <Statistics stats={weeklyActivity} />
          <Suspense fallback="Loading...">
            <Details />
          </Suspense>
        </Container>
        <Navigation navData={navData} />
      </section>
    </section>
  );
}
