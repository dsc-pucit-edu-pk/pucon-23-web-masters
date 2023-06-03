import { useEffect, useRef, useState } from "react";

interface DropdownProps {
   elm: JSX.Element;
   items: IDropdownItem[];
   className?: string;
   menuClassName?: string;
}

const Dropdown: React.FC<DropdownProps> = (props) => {
   const [open, setOpen] = useState(false);
   const dropdownRef = useRef<HTMLDivElement | null>(null);
   useEffect(() => {
      if (open) {
         const onClickOutside = (e: MouseEvent) => {
            if (!dropdownRef.current?.contains(e.target as HTMLElement)) setOpen(false);
         };
         window.addEventListener("click", onClickOutside, true);
         return () => {
            window.removeEventListener("click", onClickOutside);
         };
      }
   }, [open]);
   return (
      <div ref={dropdownRef} onClick={() => setOpen(!open)} className={"relative" + (props.className || "")}>
         {props.elm}
         {open && (
            <div
               className={` absolute top-full translate-y-4 right-0 w-60 bg-white z-10 flex-col rounded-lg border border-gray-200 p-2 shadow-lg flex items-center ${
                  props.menuClassName || ""
               }`}
            >
               {props.items.map((item) => (
                  <div
                     onClick={() => {
                        setOpen(false);
                        item.onClick();
                     }}
                     className="flex items-center rounded-md gap-3  py-2.5 px-2.5 hover:bg-gray-50 w-full cursor-pointer"
                  >
                     {item.icon}
                     <div className="text-gray-700 font-medium text-sm">{item.text}</div>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default Dropdown;
