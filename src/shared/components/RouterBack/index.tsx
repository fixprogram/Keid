import Icon from "@/components/Icon";
import { useRouter } from "next/router";

type Props = {
  goBack?: () => void;
};

export default function RouterBack({ goBack }: Props) {
  const router = useRouter();

  const back = goBack ? goBack : router.back;

  return (
    <button type="button" onClick={() => back()}>
      <Icon name="back" height={27} width={27} />
    </button>
  );
}
