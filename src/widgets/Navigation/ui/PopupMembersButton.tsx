import Icon from "@/shared/ui/Icon";
import { FC } from "react";
import { usePopupStore } from "../model/usePopupStore";

export const PopupMembersButton: FC = () => {
  const [members, open] = usePopupStore((state) => [
    state.members,
    state.openMembers,
  ]);

  return (
    <section>
      <div className="flex gap-4">
        <b className="text-white">Members</b>
        <button type="button" onClick={open}>
          <Icon name="edit" width={16} height={16} />
        </button>
      </div>

      <div className="mt-4 flex">
        {members.map((member, index) => (
          <div className={`${index > 0 ? "ml-[-5px]" : ""}`} key={member}>
            <Icon name="avatar" width={32} height={32} />
          </div>
        ))}
      </div>
    </section>
  );
};
