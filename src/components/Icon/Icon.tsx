import React from "react";

interface Props {
  name: string;
  color: string;
  size: number;
}

const Icon = ({ name = "", color = "", size = 0 }: Props) => (
  <svg fill={color} width={size} height={size}>
    <use xlinkHref={`#icon-${name}`} />
  </svg>
);

export default Icon;
