import classNames from "classnames";
import { icons } from "../utils/helpers";
import ProgressBar from "./ProgressBar";

interface ProfileSetupFooterProps {
   stepNo: number;
   disableNext?: boolean;
   onClickOnNext?: () => void;
   onClickOnBack?: () => void;
   totalSteps?: number;
   buttonText?: string;
}

const ProfileSetupFooter: React.FC<ProfileSetupFooterProps> = ({
   stepNo,
   disableNext = false,
   onClickOnNext,
   onClickOnBack,
   totalSteps = 4,
   buttonText = "Next",
}) => {
   return (
      <div className="w-full flex flex-col   fixed bottom-0 bg-white z-20">
         <ProgressBar percentage={(stepNo / totalSteps) * 100}></ProgressBar>
         <div className="flex gap-6  md:p-0 p-4 justify-center md:pb-12 md:pt-8">
            {stepNo > 1 ? (
               <div
                  onClick={onClickOnBack}
                  className="btn btn-gray btn-outlined w-72 btn-sm  gap-1.5 flex items-center justify-center text-gray-700"
               >
                  {icons.chevronLeft}
                  Back
               </div>
            ) : null}
            <button
               onClick={onClickOnNext}
               disabled={disableNext}
               className={classNames("w-72 btn btn-primary btn-xl", {})}
            >
               {buttonText}
            </button>
         </div>
      </div>
   );
};

export default ProfileSetupFooter;
