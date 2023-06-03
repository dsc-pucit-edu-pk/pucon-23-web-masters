import classNames from "classnames";
import { useState } from "react";
import { icons } from "../utils/helpers";
import NavbarItem from "./NavbarItem";
import { useRouter } from "next/router";
import { routes } from "../utils/utils";

interface NavbarProps {
   items: INavbarItem[];
   rightContent: JSX.Element;
   selected?: number;
}

const NavbarBase: React.FC<NavbarProps> = (props) => {
   const [open, setOpen] = useState(false);
   const router = useRouter();
   const logout = () => {
      localStorage.removeItem("loggedin");
      localStorage.removeItem("auth-token");
      router.push(routes.login);
   };
   return (
      <div className="h-18 md:h-20 flex items-center px-4 lg:px-28 border-b border-b-gray-100 justify-between w-full">
         <div className="gap-10 flex w-full items-center">
            <img className="h-7" src="/images/logo.png"></img>
            <div className="gap-1 hidden md:flex w-full">
               {props.items.map((item, i) => (
                  <NavbarItem
                     {...item}
                     selected={props.selected === i}
                  ></NavbarItem>
               ))}
            </div>
         </div>
         {props.rightContent || null}

         <div
            className="cursor-pointer flex items-center md:hidden"
            onClick={() => setOpen(!open)}
         >
            {icons.menuBars}
         </div>
         <div
            className={classNames(
               "shadow-lg h-screen md:hidden z-10 top-0 transition-all ease-in time duration-300   bg-white fixed flex flex-col w-9/12 pt-4 px-2",
               { "left-0": open, "-left-full": !open }
            )}
         >
            <img src="/images/logo.png" className="mb-8 h-10 w-fit mx-4 "></img>
            <div className="gap-1 flex flex-col w-full">
               {props.items.map((item, i) => (
                  <NavbarItem
                     {...item}
                     selected={i === props.selected}
                  ></NavbarItem>
               ))}
            </div>
         </div>
      </div>
   );
};

export default NavbarBase;
