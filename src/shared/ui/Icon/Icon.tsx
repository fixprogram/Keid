import React from "react";

interface Props {
  name: string;
  color?: string;
  width: number;
  height: number;
  isInline?: boolean;
}

const Icon = ({
  name = "",
  color = "",
  width = 0,
  height,
  isInline,
}: Props) => (
  <svg
    fill={color}
    width={width}
    height={height}
    className={isInline ? "inline" : ""}
  >
    <use xlinkHref={`#icon-${name}`} />
  </svg>
);

export default Icon;
