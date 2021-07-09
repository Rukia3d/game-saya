import React from "react";
import { Adventure } from "../utils/types";
import "./Adventures.css";

const AdventureImage = ({ adventure }: { adventure: Adventure }) => {
  return (
    <img
      className={`Adventure_${adventure.form}`}
      style={{ opacity: adventure.state === "closed" ? 0.5 : 1 }}
      src={`../img/Adventures/${adventure.image}`}
      alt={`adventure_${adventure.id}`}
    />
  );
};
export const Adventures = ({
  adventures,
  setAdventure,
}: {
  adventures: Adventure[];
  setAdventure: (a: Adventure) => void;
}) => {
  const selectAdventure = (a: Adventure) => {
    if (a.state === "open") {
      setAdventure(a);
    }
  };
  return (
    <div className="Adventures">
      <h2>Your Adventures</h2>
      <div className="AdventuresList">
        {adventures.map((a: Adventure, i: number) => (
          <div key={i} onClick={() => (a.stories ? selectAdventure(a) : null)}>
            <AdventureImage adventure={a} />
          </div>
        ))}
      </div>
    </div>
  );
};
