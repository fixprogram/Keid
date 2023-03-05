import Layout from "@/components/Layout";
import { useRouter } from "next/router";

const Goal = () => {
  const router = useRouter();
  const { id } = router.query;

  return <Layout>Goal: {id}</Layout>;
};

export default Goal;
