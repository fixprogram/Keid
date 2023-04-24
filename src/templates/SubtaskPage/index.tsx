import Layout from "@/widgets/Layout";
import Body from "./ui/Body";
import Header from "./ui/Header";
import Settings from "./ui/Settings";
import { SubtaskCalendar } from "./ui/SubtaskCalendar";

export default function SubtaskPage() {
  return (
    <Layout withNav={false} isBottomGradientShowed={false}>
      <Header />

      <Body />

      <Settings />

      <SubtaskCalendar />
    </Layout>
  );
}
