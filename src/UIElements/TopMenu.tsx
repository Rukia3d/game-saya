import { IMaterialOwned } from "../../api/engine/types";
import "./TopMenu.scss";

export const TopMenu = ({
  materials,
  energy,
}: {
  materials: IMaterialOwned[];
  energy: number;
}) => {
  return (
    <div className="Top">
      <div>Energy: {energy}</div>
      {materials.map((m: IMaterialOwned, i: number) => (
        <div key={i}>
          {m.name}: {m.quantity}
        </div>
      ))}
    </div>
  );
};
