import React from "react";

interface Props {
  name: string;
  color?: string;
  width: number;
  height: number;
}

const Icon = ({ name = "", color = "", width = 0, height }: Props) => (
  <svg fill={color} width={width} height={height}>
    <use xlinkHref={`#icon-${name}`} />
  </svg>
);

export default Icon;
