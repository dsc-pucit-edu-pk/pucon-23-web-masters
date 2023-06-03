import classNames from "classnames";
import { jobStatusToText } from "../utils/data";

interface ApplicationStatusBadgeProps {
   status: "pending" | "confirmed";
}

const ApplicationStatusBadge: React.FC<ApplicationStatusBadgeProps> = ({
   status,
}) => {
   return (
      <div
         className={classNames(
            "flex justify-center items-center rounded-2xl py-0.5 w-28 font-medium text-xs",
            {
               "text-secondary-700": status === "pending",
               "bg-secondary-50": status === "pending",
               "text-success-700": status === "confirmed",
               "bg-success-50": status === "confirmed",
            }
         )}
      >
         {status[0].toUpperCase() + status.slice(1)}
      </div>
   );
};

export default ApplicationStatusBadge;
