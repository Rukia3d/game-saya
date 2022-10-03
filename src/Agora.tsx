import { useContext } from "react";
import { ISpellListing } from "../api/engine/types";
import { GameContext } from "./App";
import { mainScreenState } from "./Main";

export const Listing = ({ listing }: { listing: ISpellListing }) => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }
  const playerId = context.player.id;
  return (
    <div className="Listing">
      <p>Spell: {listing.spell.id}</p>
      <p>
        Price: {listing.price} {listing.currency}
      </p>
      {listing.owner == playerId ? (
        <button>Unlist</button>
      ) : (
        <button>Buy</button>
      )}
    </div>
  );
};

export const Agora = ({
  arcana,
  setArcana,
  setScreen,
}: {
  arcana: number | null;
  setArcana: (n: number | null) => void;
  setScreen: (n: mainScreenState) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.server) {
    throw new Error("No data in context");
  }

  const listings = context.server.listings;
  console.log("listings", listings);
  return (
    <div className="Agora">
      <div className="CloseButton" onClick={() => setScreen("menus")}>
        X
      </div>
      <h3>Market</h3>
      <div className="AgoraItems">
        {listings.map((l: ISpellListing, n: number) => (
          <Listing listing={l} key={n} />
        ))}
      </div>
    </div>
  );
};
