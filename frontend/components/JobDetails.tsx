import { useMemo } from "react";
import { icons } from "../utils/helpers";

interface IJobDetailsProps {
   details: IJobApplication;
   companyDetails: ICompanyDetails;
}

const minQualificationToTextObject: { [k in IJobQualification]: string } = {
   "": "",
   INTERVIEW: "Candidates who have cleared the interview",
   MAIN: "Candidates who have qualified for mains",
   NONE: "Not any qualification required",
};
const stipendTypeToTextObject: { [k in IStipendType]: string } = {
   "": "",
   FIXED: "Fixed stipend",
   FREELACE_BASED: "Freelance based stipend",
   NEGOTIABLE: "Negotiable stipend: ",
};

const JobDetails: React.FC<IJobDetailsProps> = ({
   details,
   companyDetails,
}) => {
   const stipend = useMemo(() => {
      if (details.stipendType === "FIXED") {
         return `${details.stipend} /${details.stipendPeriod.toLowerCase()}`;
      } else {
         return `${details.stipend} - ${
            details.maxStipend
         } /${details.stipendPeriod.toLowerCase()}`;
      }
   }, [details.stipend, details.stipendPeriod, details.stipendType]);
   return (
      <div className="p-6 gap-6 flex flex-col rounded-2xl mt-8 border border-gray-200">
         <div className="gap-4 flex flex-col pb-4 items-start border-b border-b-gray-200">
            <div className="text-gray-900 text-xl font-semibold">
               About {companyDetails?.organisationName}
            </div>
            <div
               onClick={() => {
                  window.location.href = companyDetails?.url || "";
               }}
               className="btn btn-primary btn-link flex gap-2 w-fit"
            >
               <div>Company Website</div>
               {icons.externalWebsite}
            </div>
            <div className="text-gray-700">{companyDetails?.description}</div>
         </div>
         <div className="gap-4 pb-4 flex flex-col border-b border-b-gray-200">
            <div className="text-gray-900 text-xl font-semibold">
               Job Description
            </div>
            <div className="text-gray-700">{details.description}</div>
         </div>
         <div className="gap-4 pb-4 flex flex-col border-b border-b-gray-200">
            <div className="text-gray-900 text-xl font-semibold">
               Who can apply
            </div>
            <div className="flex gap-2 items-center">
               <div className="text-gray-500">Min. qualification:</div>
               <div className="text-gray-800">
                  Candidates who have{" "}
                  {minQualificationToTextObject[details.minQualification]}
               </div>
            </div>

            {details.noOfMainsAttempted ? (
               <div className="flex gap-2 items-center">
                  <div className="text-gray-500">
                     Min. no. of mains attempts:
                  </div>
                  <div className="text-gray-800">{details.minMainAttempts}</div>
               </div>
            ) : null}
            <div className="flex gap-2 items-center">
               <div className="text-gray-500">Years of experience: </div>
               <div className="text-gray-800">{details.workExp}</div>
            </div>
         </div>
         <div className="gap-4 flex flex-col pb-4 ">
            <div className="text-gray-900 text-xl font-semibold">
               Stipend & Perks
            </div>

            <div className="flex gap-2 items-center">
               <div className="text-gray-500">
                  {stipendTypeToTextObject[details.stipendType]}
               </div>
               <div className="text-gray-800 font-medium">₹{stipend}</div>
            </div>
            <div className="flex gap-2 flex-wrap">
               <div className="text-gray-500">Language:</div>
               {details.perks.map((x) => (
                  <div className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-3xl">
                     {x}
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default JobDetails;
