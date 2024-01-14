import { redirect } from "next/navigation";
import { getServerUser } from "./lib/getServerUser";

export default async function Home() {
  const user = await getServerUser();

  if (user) {
    redirect("/dashboard/overview");
  }

  if (!user) {
    redirect("/welcome");
  }

  return <></>;
}
