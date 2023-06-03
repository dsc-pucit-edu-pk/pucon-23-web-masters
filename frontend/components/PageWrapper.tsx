import { GlobalContextProvider } from "../contexts/GlobalContext";

interface PageWrapperProps {
   Component: React.FC | JSX.Element;
   verifyAuth?: boolean;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ Component, verifyAuth }) => {
   return <GlobalContextProvider>{typeof Component === "function" ? <Component /> : Component}</GlobalContextProvider>;
};

export default PageWrapper;
