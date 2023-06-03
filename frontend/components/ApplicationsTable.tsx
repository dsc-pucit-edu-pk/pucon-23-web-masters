import classNames from "classnames";
import moment from "moment";
import { useRouter } from "next/router";
import { routes } from "../utils/utils";
import { icons } from "../utils/helpers";
import { jobStatusToText } from "../utils/data";
import JobStatusBadge from "./ApplicationStatusBadge";
import { approveApplication } from "../apis/approveApplication";
import { useGlobalContext } from "../contexts/GlobalContext";
console.log("hello");

interface ApplicationTableProps {
   applications: IParticipant[];
   eventId: string;
}

const ApplicationsTable: React.FC<ApplicationTableProps> = (props) => {
   const [state, dispatch] = useGlobalContext();
   const router = useRouter();
   if (props.applications.length === 0)
      return (
         <div className="flex flex-col gap-8 w-904 items-center justify-center rounded-xl border border-gray-200 shadow-sm pt-12 pb-14">
            {icons.searchBig}
            <div className="flex flex-col gap-2 items-center">
               <div className="text-gray-900 font-semibold text-xl">
                  No Applications
               </div>
               <div className="text-gray-600 font-normal text-base">
                  No one has applied on this event yet.
               </div>
            </div>
            <button
               className="btn btn-md btn-primary w-fit"
               onClick={() => router.push(routes.createEvent)}
            >
               Post New Event?
            </button>
         </div>
      );
   return (
      <div className="flex flex-col  rounded-xl border border-gray-200 shadow-sm w-904 ">
         <div className="grid grid-cols-[1fr_1fr_1fr] items-center h-11">
            <div className="text-gray-600 font-medium text-xs pl-6">
               Applicant Name
            </div>
            <div className="text-gray-600 font-medium text-xs text-center">
               Status
            </div>

            <div className="text-gray-600 font-medium text-xs text-center">
               Action
            </div>
         </div>
         {props.applications.map((app) => (
            <div className="grid grid-cols-[1fr_1fr_1fr] items-center py-4 border-t border-gray-200">
               <div className="text-gray-900 font-medium text-sm pl-6">
                  {app.user}
               </div>
               <div className="flex items-center justify-center">
                  {/* @ts-ignore */}
                  <JobStatusBadge status={app.status}></JobStatusBadge>
               </div>

               {app.status === "pending" ? (
                  <div className="flex justify-end">
                     <div
                        className="btn btn-link btn-primary text-sm"
                        onClick={() => {
                           dispatch({ setState: { loading: true } });
                           approveApplication({
                              eventId: props.eventId,
                              userId: app.user,
                           }).then((res) => {
                              dispatch({ setState: { loading: false } });
                              router.reload();
                           });
                        }}
                     >
                        Approve
                     </div>
                  </div>
               ) : null}
            </div>
         ))}
      </div>
   );
};

export default ApplicationsTable;
