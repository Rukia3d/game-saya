export const PopUp = ({
  close,
  children,
}: {
  close: any;
  children: JSX.Element;
}) => {
  return (
    <div className="PopUp">
      <div className="CloseButton" onClick={close}>
        X
      </div>
      {children}
    </div>
  );
};
