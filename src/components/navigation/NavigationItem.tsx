import { IconButton } from "@mui/material";
import React from "react";

interface NavigationItemProps {
  label: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  onClick: () => void;
}
export default function (props: NavigationItemProps) {
  return (
    <IconButton className="w-44 h-44 p-0 pt-3" onClick={props.onClick}>
      <div className="w-full h-full p-0.5" style={{ background: props.color }}>
        <div
          className="w-full h-full flex flex-col"
          style={{ background: props.bgColor }}
        >
          <div className="flex-grow basis-1"></div>

          <div className="grow-[2] basis-1">
            <props.icon className="text-5xl" style={{ color: props.color }} />
          </div>
          <div className="flex-grow basis-1">
            <strong>{props.label}</strong>
          </div>
        </div>
      </div>
    </IconButton>
  );
}
