interface Props {
  isHidden: boolean;
  popupStyle: {
    hidden: {};
    showed: {};
  };
  children: React.ReactNode;
}

const Popup = ({ isHidden = true, popupStyle, children }: Props) => {
  return (
    <section
      className={`pt-1 pb-2 rounded-3xl bg-background2 drop-shadow-popup fixed left-3 right-3 `}
      style={isHidden ? popupStyle.hidden : popupStyle.showed}
    >
      {children}
    </section>
  );
};

export default Popup;
