import "./UIButtons.scss";
export const SmallPopup = ({
  onClick,
  content,
}: {
  onClick: any;
  content: React.ReactNode;
}) => {
  return (
    <div className="SmallPopup">
      <CloseButton onClick={onClick} />
      {content}
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
