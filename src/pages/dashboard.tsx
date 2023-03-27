import { getUsers } from "@/shared/models/user";
import Dashboard from "@/modules/dashboard";

export default function DashboardPage({ data }) {
  // console.log("Data: ", data);
  return <Dashboard />;
}

export async function getStaticProps() {
  const data = await getUsers();
  // console.log(data);
  return {
    props: { data: JSON.parse(data) },
  };
}
