import { getUser } from "../lib/session";
import Welcome from "./welcome";

export default function Page() {
  //   const user = await getUser();

  //   if (user) {
  //     return {
  //       redirect: { destination: "/dashboard", permanent: false },
  //     };
  //   }

  return <Welcome />;
}
