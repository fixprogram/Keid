import { redirect } from "next/navigation";
import { getUser } from "./lib/session";

export default async function Home() {
  const user = await getUser();

  // console.log("user: ", user);

  if (user) {
    redirect("/dashboard/overview");
  }

  if (!user) {
    redirect("/welcome");
  }

  return <></>;
}
