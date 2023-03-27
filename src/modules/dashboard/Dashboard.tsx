import Icon from "@/components/Icon";
import Layout from "@/components/Layout";
import Link from "next/link";
import Cards from "./components/Cards";
import Filter from "./components/Filter";
import PriorityTasks from "./components/PriorityTasks";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/welcome");
    }
  }, [status, router]);

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

      <h2 className="text-white font-poppins font-semibold text-xxl mt-[22px]">
        Hello,
        <span className="block">Denis Davydov</span>
      </h2>

      <Filter />

      <PriorityTasks />

      <Cards
        cards={[
          { type: "Task", amount: 10 },
          { type: "Habit", amount: 4 },
          { type: "Project", amount: 2 },
        ]}
      />
    </Layout>
  );

  // return (
  //   <>
  //     Not signed in <br />
  //     <button onClick={() => signIn()}>Sign in</button>
  //     <Link href="/signup">Sign up</Link>
  //   </>
  // );
}
