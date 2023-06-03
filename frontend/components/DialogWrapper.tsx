import { useGlobalContext } from "../contexts/GlobalContext";
import * as React from "react";

interface DialogWrapperProps {
   children: React.ReactNode;
   className?: string;
}

const DialogWrapper: React.FC<DialogWrapperProps> = ({ children, className = "" }) => {
   const [state, dispatch] = useGlobalContext();
   const wrapperRef = React.useRef<HTMLDivElement>(null);
   return (
      <div
         ref={wrapperRef}
         onClick={(e) => {
            if (e.target === wrapperRef.current) {
               dispatch({ setDialog: undefined });
            }
         }}
         className={`flex justify-center items-center fixed top-0 left-0 h-screen w-screen backdrop-blur z-40`}
      >
         <div
            style={{ boxShadow: " 0px 0px 0px 1000px rgba(16, 24, 40, 0.8)" }}
            className={`flex bg-white rounded-2xl backdrop-blur ${className}`}
         >
            {children}
         </div>
      </div>
   );
};

export default DialogWrapper;
