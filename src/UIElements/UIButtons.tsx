import "./UIButtons.scss";
const SmallPopup = ({ onClick, content }: { onClick: any; content: any }) => {
  return (
    <div className="SmallPopup">
      <CloseButton onClick={onClick} />
    </div>
  );
};

export const BigPopup = ({
  onClick,
  children,
}: {
  onClick: any;
  children: JSX.Element;
}) => {
  return (
    <div className="BigPopup">
      <CloseButton onClick={onClick} />
      {children}
    </div>
  );
};

export const CloseButton = ({ onClick }: { onClick: any }) => {
  return <div className="CloseButton" onClick={onClick}></div>;
};
