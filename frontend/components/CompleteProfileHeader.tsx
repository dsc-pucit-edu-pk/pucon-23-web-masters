import { icons } from "../utils/helpers";
import ProgressBar from "./ProgressBar";

interface CompleteProfileHeaderProps {
   totalSteps: number;
   completedSteps: number;
}

const CompleteProfileHeader: React.FC<CompleteProfileHeaderProps> = ({
   totalSteps,
   completedSteps,
}) => {
   return (
      <div className="bg-white">
         <div className="gap-8 rounded-2xl py-6 px-8 flex flex-col border-gray-300 border">
            <div className="flex justify-between w-full items-center">
               <div className="flex gap-4">
                  <div className="flex items-center justify-center rounded-full h-14 w-14 bg-gray-100">
                     {icons.noProfileImage}
                  </div>
                  <div className="flex gap-1.5 flex-col">
                     <div className="text-xl text-gray-900 font-semibold">
                        Complete your profile to hired easily
                     </div>
                     <div className="text-gray-600">
                        The more details you provide the higher your chances of
                        getting hired
                     </div>
                  </div>
               </div>
               <div className="btn btn-gray btn-sm btn-outlined w-fit">
                  Complete Profile
               </div>
            </div>

            <div className="flex gap-6 items-center">
               <ProgressBar percentage={56}></ProgressBar>
               <div className="text-gray-600 whitespace-nowrap">
                  {completedSteps}/{totalSteps} steps remaining
               </div>
            </div>
         </div>
      </div>
   );
};

export default CompleteProfileHeader;
