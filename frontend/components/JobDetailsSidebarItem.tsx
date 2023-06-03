import classNames from "classnames";

interface JobDetailsSidebarItemProps {
   text: string;
   badgeNumber?: number;
   selected?: boolean;
   onClick?: () => void;
}

const JobDetailsSidebarItem: React.FC<JobDetailsSidebarItemProps> = (props) => {
   return (
      <div
         onClick={props.onClick}
         className={classNames("flex justify-between w-full cursor-pointer py-2 px-3.5 items-center", {
            "bg-primary-25": props.selected,
         })}
      >
         <div className={classNames("text-gray-500 font-semibold", { "text-primary-400": props.selected })}>
            {props.text}
         </div>
         {props.badgeNumber === undefined ? null : (
            <div
               className={classNames("py-0.5 px-2 text-gray-700 text-xs font-medium bg-gray-100 rounded-2xl h-fit", {
                  "bg-primary-400": props.selected,
                  "text-white": props.selected,
               })}
            >
               {props.badgeNumber?.toString()}
            </div>
         )}
      </div>
   );
};

export default JobDetailsSidebarItem;
