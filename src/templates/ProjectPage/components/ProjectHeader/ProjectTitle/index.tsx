import { PopupWithOverlay } from "@/shared/components/PopupWithOverlay";
import { useChangeProjectName } from "@/templates/ProjectPage/hooks/useChangeProjectName";
import { FC, useState } from "react";

interface ProjectTitlePropsType {
  initialTitle: string;
}

export const ProjectTitle: FC<ProjectTitlePropsType> = ({ initialTitle }) => {
  const [isProjectEditShowed, setProjectEditShowed] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const handleChangeProjectName = useChangeProjectName();

  const handleOpenPopup = () => setProjectEditShowed(true);
  const handleClosePopup = () => setProjectEditShowed(false);

  const handleSaveChanges = () => {
    if (title === initialTitle) {
      return handleClosePopup();
    }
    handleChangeProjectName(title);
  };

  return (
    <>
      <h2
        className="text-xl text-white font-semibold"
        onClick={handleOpenPopup}
      >
        {title}
      </h2>

      <PopupWithOverlay
        isShowed={isProjectEditShowed}
        onClose={handleClosePopup}
        positioned="Top"
      >
        <div className="flex gap-3 py-5 px-10">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ backgroundColor: "inherit" }}
            className="text-white"
            autoFocus
          />
          <button
            type="button"
            className="text-primary"
            onClick={handleSaveChanges}
          >
            Save
          </button>
        </div>
      </PopupWithOverlay>
    </>
  );
};
