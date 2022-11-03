import { useContext, useState } from "react";
import { ICollection, IPage } from "../api/engine/types";
import { GameContext } from "./App";
import { mainScreenState } from "./Main";
import { CloseButton, PopUp } from "./PopUp";
import { TopMenu } from "./TopMenu";

export const Page = ({
  page,
  pages,
  setPage,
}: {
  page: IPage | null;
  pages: IPage[];
  setPage: (p: null | IPage) => void;
}) => {
  return <div className="Collection">{page ? page.title : pages[0].title}</div>;
};

export const Collection = ({
  collection,
  setCollection,
}: {
  collection: ICollection;
  setCollection: (c: null | ICollection) => void;
}) => {
  return (
    <div className="CollectionItem" onClick={() => setCollection(collection)}>
      <div className="CollectionItemTitle">
        <h4>{collection.title}</h4>
      </div>
      <div className="CollectionItemNumber">
        {collection.pages.length} out of {collection.maxPages}
      </div>
    </div>
  );
};

export const Collections = ({
  setScreen,
}: {
  setScreen: (n: mainScreenState) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }
  const [collection, setCollection] = useState<null | ICollection>(null);
  const [page, setPage] = useState<null | IPage>(null);

  const collections = context.player.collections;

  const close = () => {
    console.log("close");
    setPage(null);
    setCollection(null);
  };

  return (
    <div className="CollectionsContainer" data-testid="collections-screen">
      <TopMenu />
      {collection ? (
        <PopUp close={close}>
          <Page page={page} pages={collection.pages} setPage={setPage} />
        </PopUp>
      ) : (
        <>
          <h3>Collections</h3>
          <CloseButton close={() => setScreen("main")} />
          <div className="Collections" data-testid="collections-list">
            {collections.map((i: ICollection, n: number) => (
              <Collection
                collection={i}
                key={n}
                setCollection={setCollection}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
