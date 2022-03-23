import { PropsWithChildren } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";

type BaseLayoutProps = {};

const BaseLayout = ({ children }: PropsWithChildren<BaseLayoutProps>) => {
  return (
    <div className="max-w-screen-2xl m-auto flex flex-col h-full">
      <NavBar />
      <div className="p-8 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default BaseLayout;
