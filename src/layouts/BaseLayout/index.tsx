import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import Footer from "./Footer";
import NavBar from "./NavBar";

type BaseLayoutProps = {};

const BaseLayout = ({ children }: PropsWithChildren<BaseLayoutProps>) => {
  return (
    <div className="max-w-screen-2xl m-auto flex flex-col min-h-screen">
      <Toaster
        containerClassName="w-2/3 ml-auto md:w-auto mt-6"
        position="top-right"
      />
      <NavBar />
      <div className="p-4 md:p-8 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default BaseLayout;
