import classNames from "classnames";
import { jobStatusToText } from "../utils/data";

interface EventTypeBadgeProps {
   status: EventType;
}

const EventTypeBadge: React.FC<EventTypeBadgeProps> = ({ status }) => {
   return (
      <div
         className={classNames(
            "flex justify-center items-center rounded-2xl h-fit px-3 py-0.5 w-fit font-medium text-xs",
            {
               "text-purple-700": status === "sports",
               "bg-purple-50": status === "sports",
               "text-secondary-700": status === "religion",
               "bg-secondary-50": status === "religion",
               "text-primary-700": status === "politics",
               "bg-primary-50": status === "politics",
               "text-error-700": status === "music",
               "bg-error-50": status === "music",
               "text-success-700": status === "motivation",
               "bg-success-50": status === "motivation",
               "text-cyan-700": status === "concert",
               "bg-cyan-50": status === "concert",
               "text-indigo-700-700": status === "competition",
               "bg-indigo-50": status === "competition",
            }
         )}
      >
         {status[0].toUpperCase() + status.slice(1)}
      </div>
   );
};

export default EventTypeBadge;
