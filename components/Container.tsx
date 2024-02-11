import { PropsWithChildren } from "react";

const Container: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="mx-auto max-w-[2520px] md-px-10 sm:px-2 px-4">
      {children}
    </div>
  );
};

export default Container;
