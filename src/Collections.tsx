import { useContext, useState } from "react";
import { ICollection, IPage } from "../api/engine/types";
import { GameContext } from "./App";
import { mainScreenState } from "./Main";
import { CloseButton, PopUp } from "./PopUp";
import { TopMenu } from "./TopMenu";

export const Page = ({
  page,
  pages,
  setCollection,
  setPage,
}: {
  page: IPage;
  pages: IPage[];
  setCollection: (p: null | ICollection) => void;
  setPage: (p: null | IPage) => void;
}) => {
  return <div className="Collection">{page.title}</div>;
};

export const Collection = ({
  collection,
  setCollection,
  setPage,
}: {
  collection: ICollection;
  setCollection: (c: null | ICollection) => void;
  setPage: (p: null | IPage) => void;
}) => {
  const changeCollection = (c: ICollection) => {
    setCollection(collection);
    setPage(collection.pages[0]);
  };

  return (
    <div
      className="CollectionItem"
      onClick={() => changeCollection(collection)}
    >
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

  const selectCollection = (c: ICollection | null) => {
    console.log("selectCollection", c);
    if (c) {
      setCollection(c);
      setPage(c.pages[0]);
    } else {
      setPage(null);
      setCollection(null);
      setScreen("main");
    }
  };

  return (
    <div className="CollectionsContainer" data-testid="collections-screen">
      <TopMenu />
      {collection && page ? (
        <PopUp close={() => selectCollection(null)}>
          <Page
            page={page}
            pages={collection.pages}
            setCollection={setCollection}
            setPage={setPage}
          />
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
                setCollection={selectCollection}
                setPage={setPage}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
