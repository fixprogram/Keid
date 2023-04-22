import Layout from "@/widgets/Layout";
import Body from "./components/Body";
import Header from "./components/Header";
import Settings from "./components/Settings";

export default function SubtaskPage() {
  return (
    <Layout withNav={false} isBottomGradientShowed={false}>
      <Header />

      <Body />

      <Settings />
    </Layout>
  );
}
