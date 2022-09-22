export const ConfirmationPopup = ({
  close,
  children,
}: {
  close: any;
  children: JSX.Element;
}) => {
  return (
    <div className="ConfirmationPopup">
      <div className="CloseButton" onClick={close}>
        X
      </div>
      {children}
    </div>
  );
};
