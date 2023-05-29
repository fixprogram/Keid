import React, { FC } from "react";

interface ListPropType {
  children: React.ReactNode;
}

export const List: FC<ListPropType> = ({ children }) => {
  return <section className="mt-8 flex flex-col gap-4">{children}</section>;
};
