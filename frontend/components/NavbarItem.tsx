import { useEffect, useState } from "react";
import { icons } from "../utils/helpers";
import classNames from "classnames";
import { useRouter } from "next/router";

const NavbarItem: React.FC<INavbarItem> = (item) => {
   const [open, setOpen] = useState(false);
   useEffect(() => {
      window.addEventListener("click", (e) => {
         const target = e.target as HTMLElement;
      });
   }, []);

   const router = useRouter();
   return (
      <div
         onClick={
            item.url
               ? () => {
                    router.push(item.url as string);
                 }
               : () => {}
         }
         className={classNames(
            "gap-2 md:rounded-md px-4 py-2.5 md:py-2 text-gray-900 md:px-3 relative flex cursor-pointer items-center md:justify-start justify-between",
            {
               "bg-gray-100": item.selected,
            }
         )}
      >
         <div
            onClick={() => setOpen(!open)}
            className=" font-semibold gap-4 flex"
         >
            <div className="md:hidden">{item.icon}</div>
            {item.text}
         </div>
         {item.subItems && icons.arrowDown}
         {item.badge && (
            <div className="bg-blue-50 text-xs text-blue-700 font-medium py-0.5 px-2 rounded-2xl">
               {item.badge}
            </div>
         )}
         {/* {open && (
            <div className="flex flex-col absolute top-full p-3 bg-white border border-gray-100 shadow-md">
               {item.subItems?.map((subItem) => (
                  <div className="py-2">{subItem.text}</div>
               ))}
            </div>
         )} */}
      </div>
   );
};

export default NavbarItem;
