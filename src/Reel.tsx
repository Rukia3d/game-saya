import { useState } from "react";
import { IReel, IReelPanel } from "../api/levelgen";

export const Reel = ({
  reel,
  setReel,
}: {
  reel: IReel[];
  setReel: (r: undefined | IReel[]) => void;
}) => {
  const [panelNum, setPanelNum] = useState(0);

  const nextPanel = () => {
    if (panelNum < reel.length - 1) {
      setPanelNum(panelNum + 1);
    } else {
      setReel(undefined);
    }
  };

  return (
    <div className="Reel" onClick={nextPanel}>
      <div className={`Reel p${reel[panelNum].layout}`}>
        {reel[panelNum].panels.map((p: IReelPanel, j: number) => (
          <div
            key={j}
            className={`panel${j}`}
          >{`R ${reel[panelNum].layout} ${j}`}</div>
        ))}
      </div>
    </div>
  );
};
