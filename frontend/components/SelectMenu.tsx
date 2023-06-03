import classNames from "classnames";
import { icons } from "../utils/helpers";

interface SelectMenuProps {
   items: string[];
   onItemSelect: (item: string) => void;
   open: boolean;
   selectedItem: number;
}

const SelectMenu: React.FC<SelectMenuProps> = (props) => {
   return (
      <div className={classNames("select-menu z-10", { show: props.open })}>
         {props.items.length ? (
            props.items.map((item, i) => (
               <div
                  onClick={() => props.onItemSelect(item)}
                  className={classNames(
                     "flex w-full justify-between gap-2 items-center py-2.5 px-2 hover:bg-gray-50 rounded-md",
                     { "bg-gray-50": props.selectedItem === i }
                  )}
               >
                  <div className="flex flex-col gap-[2px]">
                     <div className="text-gray-500 text-sm">{item}</div>
                  </div>
                  {/* {value === item ? icons.check : <></>} */}
               </div>
            ))
         ) : (
            <div
               className="
                     flex w-full justify-between gap-2 items-center py-2.5 px-2 hover:bg-gray-50 rounded-md"
            >
               No results found
            </div>
         )}
      </div>
   );
};

export default SelectMenu;
