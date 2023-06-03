import { useMemo } from "react";
import { icons } from "../utils/helpers";
import moment from "moment";

interface ITag {
   text: string;
   icon: JSX.Element;
}

const timeAvailToStringObject: { [k in IJobDuration]: string } = {
   FR: "Freelance",
   "": "",
   FT: "Full-time",
   PT: "Part-time",
};

const locationToStringObject: { [k in IJobLocation]: string } = {
   FLEXIBLE: "Flexible",
   OFFICE: "",
   REMOTE: "Remote",
   "": "",
};
const JobCard: React.FC<IJobApplication> = (props) => {
   const location =
      props.locationType === "OFFICE"
         ? props.city + ", " + props.state
         : locationToStringObject[props.locationType];
   const timeAvail = timeAvailToStringObject[props.timeAvail];
   const stipend = useMemo(() => {
      if (props.stipendType === "FIXED") {
         return `${props.stipend} /${props.stipendPeriod.toLowerCase()}`;
      } else {
         return `${props.stipend} - ${
            props.maxStipend
         } /${props.stipendPeriod.toLowerCase()}`;
      }
   }, [props.stipend, props.stipendPeriod, props.stipendType]);
   console.log(props, "Job card props");
   return (
      <div className="md:p-6 md:pb-8 py-5 px-4 border-gray-200 rounded-2xl w-full border">
         <div className="flex flex-col gap-4">
            <div className="gap-1 flex flex-col pb-4 border-b border-b-gray-200">
               <div className="text-gray-900 text-lg font-semibold">
                  {props.position}
               </div>
               <div className="text-sm text-gray-500 font-medium">
                  {props.description}
               </div>
            </div>
            <div className="flex gap-2">
               <div className="text-gray-500">Exam: </div>
               <div className="text-gray-800 font-medium">{props.exam}</div>
            </div>
            <div className="flex gap-2">
               <div className="text-gray-500">Subject expertise:</div>
               <div className="text-gray-800 font-medium">{props.subjects}</div>
            </div>
            <div className="flex gap-2">
               <div className="text-gray-500">Language:</div>
               <div className="text-gray-800 font-medium">
                  {props.workLanguage.join(", ")}
               </div>
            </div>
            <div className="flex gap-2 flex-wrap">
               <div className="text-gray-500">Skills:</div>
               {props.skillSets.map((x) => (
                  <div className="bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded-3xl">
                     {x}
                  </div>
               ))}
            </div>
            <div className="pt-6 border-t border-gray-200 grid grid-cols-2 md:flex items-center gap-8">
               <div className="gap-1.5 flex items-center">
                  {icons.jobCard.location}
                  <div className="font-medium text-gray-600">{location}</div>
               </div>
               <div className="gap-1.5 flex items-center">
                  {icons.jobCard.clock}
                  <div className="font-medium text-gray-600">{timeAvail}</div>
               </div>
               <div className="gap-1.5 flex items-center">
                  {icons.jobCard.indianRuppee}
                  <div className="font-medium text-gray-600">{stipend}</div>
               </div>
               <div className="gap-1.5 flex items-center">
                  {icons.jobCard.deadline}
                  <div className="font-medium text-gray-600">
                     Apply by{" "}
                     {moment(new Date(props.deadline)).format("DD MMM YYYY")}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default JobCard;
