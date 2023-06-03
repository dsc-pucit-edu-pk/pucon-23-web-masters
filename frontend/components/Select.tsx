import { icons } from "../utils/helpers";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

interface SelectProps<Name extends string = string> {
   options: ISelectOption<Name>[];
   value: Name;
   onChange: (val: Name) => void;
   placeholder: string;
   state?: InputState;
   label?: string;
   labelSubtext?: string;
   className?: string;
   openOnTop?: boolean;
   menuClassName?: string;
   relativeParent?: boolean;
}

const Select = <Name extends string = string>({
   options,
   value,
   onChange,
   placeholder,
   state,
   className = "",
   openOnTop,
   menuClassName,
   relativeParent = true,
   ...props
}: SelectProps<Name>) => {
   const [open, setOpen] = useState(false);
   const elmRef = useRef<HTMLDivElement>(null);
   const selectedOption = options.find((x) => x.value === value);
   const onOpenMenu = () => {
      setOpen(!open);
   };
   useEffect(() => {
      const func = (e: MouseEvent) => {
         if (open) {
            if (!elmRef.current?.contains(e.target as Node)) {
               setOpen(false);
            }
         }
      };
      window.addEventListener("click", func, true);
      return () => window.removeEventListener("click", func);
   }, [open]);
   return (
      <div
         className={`${className} select-wrapper flex flex-col  gap-1.5 w-full `}
      >
         {props.label && (
            <div className="text-sm text-gray-700 font-medium">
               {props.label}{" "}
               {props.labelSubtext ? (
                  <span className="text-gray-400 font-normal">
                     ({props.labelSubtext})
                  </span>
               ) : null}
            </div>
         )}
         <div
            ref={elmRef}
            onClick={onOpenMenu}
            className={classNames(
               "flex justify-between w-full py-2.5 h-fit px-3.5 items-center rounded-lg border border-gray-300 cursor-pointer ",
               {
                  "select-error": state?.type === "error",
                  "select-primary": state === undefined,
                  "select-warn": state?.type === "warn",
                  relative: relativeParent,
               }
            )}
         >
            <div className="flex gap-2items-center">
               <div className="text-gray-900 font-medium text-sm">
                  {selectedOption?.heading ||
                     selectedOption?.text ||
                     placeholder}
               </div>
               {selectedOption?.badge && (
                  <div className="rounded-2xl bg-gray-100 py-0.5 px-2">
                     {selectedOption.badge}
                  </div>
               )}
            </div>
            <div>{icons.chevronDown}</div>
            {
               <div
                  className={classNames(
                     `select-menu z-10 ${menuClassName ? menuClassName : ""}`,
                     {
                        show: open,
                        "open-top": openOnTop,
                     }
                  )}
               >
                  {options.map((opt) => (
                     <div
                        onClick={() => onChange(opt.value as Name)}
                        className={classNames(
                           "flex w-full justify-between gap-2 items-center py-2.5 px-2 hover:bg-gray-50 rounded-md",
                           { "bg-gray-50": value === opt.value }
                        )}
                     >
                        <div className="flex flex-col gap-[2px]">
                           <div className="flex gap-2 items-center">
                              <div className="text-gray-900 font-medium ">
                                 {opt.heading}
                              </div>
                              {opt.badge && (
                                 <div className="rounded-2xl bg-gray-100 py-0.5 px-2">
                                    {opt.badge}
                                 </div>
                              )}
                           </div>
                           <div className="text-gray-500 text-sm">
                              {opt.text}
                           </div>
                        </div>
                        {value === opt.value ? icons.check : <></>}
                     </div>
                  ))}
               </div>
            }
         </div>
      </div>
   );
};

export default Select;
