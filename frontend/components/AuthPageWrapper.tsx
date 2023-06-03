import {
   GlobalContextProvider,
   useGlobalContext,
} from "../contexts/GlobalContext";
import OTPDialog from "../dialogs/OTPDialog";
import DialogWrapper from "./DialogWrapper";
import Loader from "./Loader";
import * as React from "react";
import { useState, useEffect } from "react";

interface AuthPageWrapperProps {
   icon: JSX.Element;
   heading: string;
   subHeading: JSX.Element | string;

   children: React.ReactNode;
}

const AuthPageWrapper: React.FC<AuthPageWrapperProps> = ({
   icon,
   heading,
   subHeading,
   children,
}) => {
   const [state, dispatch] = useGlobalContext();
   useEffect(() => {
      console.log("loading", state.loading);
      // dispatch({ setState: { loading: true } });
   }, [state.loading]);
   return (
      <>
         <div className="flex justify-center relative w-full">
            <Loader></Loader>
            {state.dialog && <state.dialog></state.dialog>}
            <div className="flex flex-col md:w-90 w-full items-center h-full pt-12 md:pt-24 px-4 ">
               <div className="text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-2 md:mb-3">
                  {heading}
               </div>
               <div className="mb-8 text-gray-600 text-center ">
                  {subHeading}
               </div>
               {children}
            </div>
         </div>
      </>
   );
};

export default AuthPageWrapper;
