import { wrapper } from "@/app/store/store";
import {
  setUserId,
  setUserProjectAmount,
} from "@/widgets/Overview/store/overviewSlice";
import { getSession } from "next-auth/react";
import Layout from "@/widgets/Layout";
import Greeting from "@/shared/ui/Greeting";
import Icon from "@/shared/ui/Icon";
import Overview from "@/widgets/Overview";
import Link from "next/link";
import { getUserProjectsAmount } from "@/entities/user/models/getUserProjectsAmount";
import { setUserProjectNames } from "@/widgets/Navigation/store/navigationSlice";
import getUserProjectNames from "@/entities/user/models/getUserProjectNames";

export default function DashboardPage() {
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
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      const session = await getSession({ req });

      console.log("session: ", session);
      // we can set the initial state from here
      // we are setting to false but you can run your custom logic here

      const userId = session?.user.id as string;
      const userProjectNames = await getUserProjectNames(userId);

      const projectAmount = userProjectNames.length;
      // const projectAmount = await getUserProjectsAmount(
      //   session?.user?.email as string
      // );

      // console.log("session user: ", session?.user.id);

      console.log("userProjectNames: ", userProjectNames);

      store.dispatch(setUserId(userId));
      store.dispatch(setUserProjectAmount(projectAmount));
      store.dispatch(setUserProjectNames(userProjectNames));
      // console.log("State on server", store.getState());
      // return {
      //   props: {
      //     authState: false,
      //   },
      // };
    }
);
