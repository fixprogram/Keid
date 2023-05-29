import { PopupWithOverlay } from "@/shared/components/PopupWithOverlay";
import { ItemType } from "@/shared/config/types";
import Icon from "@/shared/ui/Icon";
import PopupLine from "@/shared/ui/PopupLine";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { FC } from "react";
import { useComplete } from "../model/useComplete";

interface CompletePropsType {
  itemType: ItemType;
}

export const Complete: FC<CompletePropsType> = ({ itemType }) => {
  const completeHandler = useComplete(itemType);

  return (
    <PopupWithOverlay
      positioned="Top"
      btn={<Icon name="complete" height={14} width={19} />}
    >
      <PopupLine />

      <b className="block text-white my-3">
        Are you sure you want to complete the {itemType}?
      </b>

      <PrimaryButton type="button" onClick={completeHandler} text="Complete" />
    </PopupWithOverlay>
  );
};
