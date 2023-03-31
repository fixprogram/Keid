import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import AddButton from "@/shared/ui/AddButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { closePopupAdd } from "../../store/navigationSlice";
import { setProjectName } from "./store/addProjectSlice";

export default function PopupProject() {
  const session = useSession();
  const router = useRouter();

  const dispatch = useDispatch();
  const userId = session.data?.user.id as string;
  const projectName = useAppSelector((state) => state.addProject.projectName);
  const projectStyle = useAppSelector((state) => state.addProject.projectStyle);
  const error = useAppSelector((state) => state.addProject.error);

  const handleProjectNameChange = useCallback(
    (e) => {
      return dispatch(setProjectName(e.target.value));
    },
    [dispatch]
  );

  const handleFormSubmit = useCallback(
    (event) => {
      event.preventDefault();

      fetch("http://localhost:3000/api/addProject", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, projectName, projectStyle }),
      }).then(async (res) => {
        console.log("Res: ", res);

        const body = await res.json();

        dispatch(closePopupAdd());

        console.log("body: ", body);
        if (body.id) router.push(`/projects/${body.id}`);
      });
    },
    [userId, projectName, projectStyle]
  );
  return (
    <section className="px-5 my-5">
      <form method="post" onSubmit={handleFormSubmit}>
        <div className="flex items-end">
          <button
            type="button"
            className="w-4 h-4 bg-primary rounded mr-4 mb-[5px]"
          ></button>

          <input
            type="text"
            name="name"
            placeholder="Project Name"
            className="block text-lg text-white font-semibold pt-3 border-none border-b border-b-background2 placeholder:text-deactive"
            style={{ background: "inherit" }}
            value={projectName}
            onChange={handleProjectNameChange}
          />

          <p>{error}</p>
        </div>

        <div className="mt-6">
          <span className="font-bold text-deactive uppercase text-xxs">
            Privacy
          </span>
          <p className="text-white">Public</p>
        </div>

        <div className="absolute right-[20px] bottom-[26px]">
          <AddButton type="submit" />
        </div>
      </form>
    </section>
  );
}
