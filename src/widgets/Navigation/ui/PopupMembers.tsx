import { FC, useCallback, useEffect, useState } from "react";
import { useGetUsers } from "../model/useGetUsers";
import { usePopupStore } from "../model/usePopupStore";
import Icon from "@/shared/ui/Icon";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { useNavigationStore } from "../model/useNavigationStore";

export const PopupMembers: FC = () => {
  const users = useGetUsers();

  const setPopupStyle = useNavigationStore((state) => state.setPopupStyle);
  const [initialMembers, close, set] = usePopupStore((state) => [
    state.members,
    state.closeMembers,
    state.setMembers,
  ]);

  const [members, setMembers] = useState(initialMembers);

  useEffect(() => {
    setPopupStyle("black");
  }, [setPopupStyle]);

  const handleUserClick = useCallback(
    (id: string) => {
      setMembers((prevMembers) => {
        if (prevMembers.includes(id)) {
          return members.filter((member) => member !== id);
        } else {
          return [...prevMembers, id];
        }
      });
    },
    [members]
  );

  const handleClose = useCallback(() => {
    setPopupStyle("gray");
    close();
  }, [close, setPopupStyle]);

  const handleSave = useCallback(() => {
    set(members);
    handleClose();
  }, [handleClose, members, set]);

  return (
    <section className="pb-6">
      <div className="mt-6">
        <ul className="flex mt-5 flex-col gap-4">
          {users?.map((user: any) => {
            const isActive = members.includes(user.id);
            return (
              <div
                key={user.id}
                onClick={() => handleUserClick(user.id)}
                className="rounded-2xl"
                style={{
                  background: isActive
                    ? "linear-gradient(270deg, #FBA3FF 34.57%, #E42A6C 100%)"
                    : "",
                }}
              >
                <div
                  className={`flex p-4 gap-4 m-[1px] ${
                    isActive ? "bg-background1" : "bg-background2"
                  }  rounded-2xl`}
                >
                  <div className="w-10">
                    <Icon name="avatar" width={40} height={40} />
                  </div>

                  <b className="font-semibold text-lg text-white block">
                    {user.name}
                  </b>

                  {isActive ? (
                    <div className="ml-auto">
                      <Icon name="check" width={24} height={24} />
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="mt-5 flex justify-between items-end">
        <button
          type="button"
          onClick={handleClose}
          className="text-red font-bold py-3 px-8"
        >
          Cancel
        </button>
        <div className="w-[100px]">
          <PrimaryButton text="Save" onClick={handleSave} />
        </div>
      </div>
    </section>
  );
};
