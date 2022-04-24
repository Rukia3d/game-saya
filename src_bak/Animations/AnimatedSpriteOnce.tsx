import React, { useEffect, useState } from "react";

export const AnimatedSpriteOnce = ({
  width,
  height,
  frames,
  img,
}: {
  width: number;
  height: number;
  frames: number;
  img: string;
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
    const timeout = 100;
    const timer = setTimeout(() => {
      if (frame === frames - 1) {
      } else {
        setFrame(frame + 1);
      }
    }, timeout);
    return () => {
      clearTimeout(timer);
    };
  }, [frame, frames]);

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
