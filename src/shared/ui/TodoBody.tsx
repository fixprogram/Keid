import { FC, ReactNode, useState } from "react";

interface TodoBodyPropsType {
  tabs: string[];
  tabsContent: Record<string, ReactNode>;
}

export const TodoBody: FC<TodoBodyPropsType> = ({ tabs, tabsContent }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section
      className={`bg-background2 flex flex-grow flex-col mt-8`}
      style={{
        background: "linear-gradient(rgba(93, 94, 98, 1), rgba(93, 94, 98, 0))",
        borderRadius: "40px 40px 0 0",
        marginLeft: -24,
        marginRight: -24,
      }}
    >
      <section
        className="mt-[2px] mx-[2px] pt-1 pb-2 px-5 bg-background1 rounded-3xl flex flex-col flex-grow"
        style={{ borderRadius: "40px 40px 0 0" }}
      >
        <div className="flex mt-6">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                className="text-lg font-medium border-b-2 pb-3 flex-grow"
                style={{
                  color: isActive ? "#fff" : "rgba(255,255,255, .3)",
                  borderColor: isActive ? "#246BFD" : "rgba(255,255,255, .3)",
                }}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {tabsContent[activeTab]}
      </section>
    </section>
  );
};
