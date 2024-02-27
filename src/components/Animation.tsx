import { Dndsvg } from "../assets/dndsvg";
import { useBgColor, usePrimaryColor } from "../theme";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const primaryColor = usePrimaryColor();
  const bgColor = useBgColor();

  const bgStyle = {
    background: bgColor,
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/menu", { replace: true });
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        className="animation-splash absolute w-screen h-screen z-50"
        style={bgStyle}
      >
        <div className="flex flex-col w-full h-full">
          <div className="flex-grow basis-1 flex-shrink"></div>
          <div className="flex-grow basis-1">
            <Dndsvg color={primaryColor.main} background={bgColor} />
          </div>
          <div className="flex-grow basis-1 flex-shrink"></div>
        </div>
      </div>
    </>
  );
}
