import React, { useEffect, useState } from "react";
import { generateInt } from "../utils/helpers";

export const AnimatedSpriteCycle = ({
  width,
  height,
  breakpoint,
  frames,
  img,
  randomStart = false,
}: {
  width: number;
  height: number;
  breakpoint: number;
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
      if (frame < breakpoint) {
        setFrame(frame + 1);
      } else {
        if (frame === frames - 1) {
          setFrame(breakpoint);
        } else {
          setFrame(frame + 1);
        }
      }
    }, timeout);
    return () => {
      clearTimeout(timer);
    };
  }, [frame, frames, randomStart]);

  return (
    <div style={style} data-testid={"characterImage"}>
      <img
        aria-label="animatedSprite"
        style={animatedSprite}
        src={`${process.env.PUBLIC_URL}${img}`}
      />
    </div>
  );
};
