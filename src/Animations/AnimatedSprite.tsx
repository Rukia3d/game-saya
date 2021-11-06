import React, { useEffect, useState } from "react";
import { generateInt } from "../utils/helpers";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const AnimatedSprite = ({
  width,
  height,
  frames,
  img,
  randomStart = false,
}: {
  width: number;
  height: number;
  frames: number;
  img: string;
  randomStart?: boolean;
}) => {
  const [frame, setFrame] = useState(0);

  const style = {
    width: `${width}px`,
    height: `${height}px`,
    overflow: "hidden",
    flexShrink: 0,
    flexGrow: 0,
  };

  const animatedSprite = {
    transform: `translateX(${-frame * width}px)`,
    height: "100%",
  };

  useEffect(() => {
    const timeout = randomStart && frame === 0 ? generateInt(5) * 1000 : 100;
    const timer = setTimeout(() => {
      if (frame === frames - 1) {
        setFrame(0);
      } else {
        setFrame(frame + 1);
      }
    }, timeout);
    return () => {
      clearTimeout(timer);
    };
  }, [frame, frames, randomStart]);

  return (
    <div style={style} data-testid={"characterImage"}>
      <img
        aria-label={`animatedSprite_${img}`}
        style={animatedSprite}
        src={`${process.env.PUBLIC_URL}${img}`}
      />
    </div>
  );
};
