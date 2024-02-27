import { memo } from "react";
import { usePrimaryColor } from "../theme";

interface CircleProps {
  className?: string;
  filled?: boolean;
  text: string;
  color?: string;
  strokeNone?: boolean;
}

export const Circle = memo((p: CircleProps) => {
  const primaryColor = usePrimaryColor();
  return (
    <svg
      viewBox="0 0 10 10"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={p.className}
    >
      <circle
        fill={p.filled ? p.color ?? primaryColor.main : "none"}
        cx="5"
        cy="5"
        r="4"
        stroke={
          p.filled
            ? p.color ?? primaryColor.main
            : p.strokeNone
            ? "none"
            : "currentColor"
        }
        strokeWidth={0.5}
      />
      <text
        x="3"
        y="7"
        fill="currentColor"
        className="uppercase"
        style={{ fontSize: "0.4rem" }}
      >
        {p.text}
      </text>
    </svg>
  );
});
