import { MAX_WIDTH } from "@/shared/config/consts";

interface Props {
  isHidden: boolean;
  popupStyle: {
    hidden: {};
    showed: {};
  };
  isBlack?: boolean;
  children: React.ReactNode;
}

export const Popup = ({
  isHidden = true,
  popupStyle,
  children,
  isBlack = false,
}: Props) => {
  const isDesktop =
    typeof window !== "undefined" && window.innerWidth > MAX_WIDTH;

  return (
    <section
      className={`${
        isBlack ? "" : "pt-1 pb-2 px-5"
      } rounded-3xl bg-background2 drop-shadow-popup fixed ${
        isDesktop ? `w-[406px] ml-3` : "left-3 right-3"
      } `}
      style={
        isHidden
          ? popupStyle.hidden
          : {
              ...popupStyle.showed,
              background: isBlack
                ? "linear-gradient(rgba(93, 94, 98, 1), rgba(93, 94, 98, 0))"
                : "rgb(38 42 52)",
            }
      }
    >
      {isBlack ? (
        <section className="mt-[2px] mx-[2px] pt-1 pb-2 px-5 bg-background1 rounded-3xl">
          {children}
        </section>
      ) : (
        children
      )}
    </section>
  );
};
