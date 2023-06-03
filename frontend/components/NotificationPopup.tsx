import { icons } from "../utils/helpers";

interface NotificationPopupProps {
   icon: JSX.Element;
   title: string;
   description: string;
   acceptText: string;
   className?: string;
   onClose: () => void;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({
   acceptText,
   description,
   icon,
   title,
   className = "",
   onClose,
}) => {
   return (
      <div
         className={`flex gap-3 p-4 bg-white border border-gray-300 shadow-lg rounded-xl z-10 md:absolute fixed md:w-106 w-full ${className}`}
      >
         <div className="w-10 h-10">{icon}</div>
         <div className="flex flex-col flex-grow ">
            <div className="text-gray-700 mb-4 text-sm font-semibold">
               {title}
            </div>
            <div className="text-gray-600 text-sm mb-3">{description}</div>
            <div
               onClick={onClose}
               className="btn btn-link w-fit pl-0 btn- btn-primary font-semibold btn-sm"
            >
               {acceptText}
            </div>
         </div>
         <div className="flex cursor-pointer" onClick={() => onClose()}>
            {icons.close}
         </div>
      </div>
   );
};

export default NotificationPopup;
