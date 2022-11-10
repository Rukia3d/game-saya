export const PopUp = ({
  close,
  children,
}: {
  close: any;
  children: JSX.Element;
}) => {
  return (
    <div className="PopUp" data-testid="popup-screen">
      <CloseButton close={CloseButton} />
      {children}
    </div>
  );
};

export const SmallPopUp = ({
  close,
  children,
}: {
  close: any;
  children: JSX.Element;
}) => {
  return (
    <div className="SmallPopUp" data-testid="small-popup-screen">
      <CloseButton close={CloseButton} />
      {children}
    </div>
  );
};

export const CloseButton = ({ close }: { close: any }) => {
  return (
    <div className="CloseButton" onClick={close}>
      X
    </div>
  );
};
