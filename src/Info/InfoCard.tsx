import React from "react";
import "./InfoCard.scss";
// Types
// Utils
import { IEnemy, IHero, ISpell, ISpellUpdate } from "../utils/types";
// Components
import { CloseButton } from "../UI/CloseButton";
import { InfoItem } from "./InfoItem";
import { InfoHero } from "./InfoHero";

export type ItemsForCard = IHero | IEnemy | ISpell | ISpellUpdate;

type infoScreenState = "update" | "hero";

type InfoScreensType = {
  [key in infoScreenState]: React.FC<{ item: any }>;
};
const infoScreens: InfoScreensType = {
  update: InfoItem,
  hero: InfoHero,
};

export const InfoCard = ({
  item,
  setInfo,
}: {
  item: ItemsForCard;
  setInfo: (s: ItemsForCard | null) => void;
}) => {
  const determineInfoScreenType = (): infoScreenState => {
    if ("mana" in item) return "update";
    return "hero";
  };
  const screen = determineInfoScreenType();
  const InfoScreens = infoScreens[screen];
  return (
    <div className="Info" aria-label="info_card">
      <div className="InfoCardBorder">
        <CloseButton onClick={() => setInfo(null)} />
        <InfoScreens item={item} />
      </div>
    </div>
  );
};
