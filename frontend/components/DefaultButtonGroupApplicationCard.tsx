import classNames from "classnames";
import { icons } from "../utils/helpers";
import Dropdown from "./Dropdown";
import { IApplication } from "../apis/getApplications";
import { updateApplication } from "../apis/updateApplication";

interface DefaultButtonGroupApplicationCardProps {
   isAnySelected?: boolean;
   application: IApplication;
   jobId: string;
}

const DefaultButtonGroupApplicationCard: React.FC<DefaultButtonGroupApplicationCardProps> = (props) => {
   const hire = () => {
      updateApplication(props.jobId, { type: "HIRE", applicationIDs: [props.application._id] });
   };
   const dropdownItems: IDropdownItem[] = [
      { text: "Send Assignment", icon: icons.nextSteps.sendAssignment, onClick: () => {} },
      { text: "Start Chat", icon: icons.nextSteps.startChat, onClick: () => {} },
      { text: "Hire", icon: icons.nextSteps.hire, onClick: hire },
   ];
   return (
      <>
         <div className="flex flex-col w-full gap-4 md:hidden">
            <div className="flex gap-1.5 items-center w-full justify-center py-3.5 ">
               <div className="cursor-pointer flex gap-2 text-gray-500 font-semibold text-sm flex-grow w-full justify-center ">
                  {icons.jobCardCompany.message}
                  Message
               </div>
               <div className="border-r border-gray-300 h-6"></div>
               <div className="cursor-pointer flex gap-2 text-gray-500 font-semibold text-sm flex-grow  w-full justify-center">
                  {icons.jobCardCompany.notes}
                  Notes
               </div>
               <div className="border-r border-gray-300 h-6"></div>
               <div className="cursor-pointer flex gap-2 text-gray-500 font-semibold text-sm flex-grow w-full justify-center">
                  {icons.jobCardCompany.shortlist}
                  Shortlist
               </div>
            </div>
            <Dropdown
               elm={
                  <button className="btn-primary btn btn-sm w-full gap-2">
                     Next steps {icons.jobCardCompany.caretDown}
                  </button>
               }
               menuClassName="w-full"
               items={dropdownItems}
            ></Dropdown>
            <button className="btn btn-gray btn-outlined gap-2 btn-sm">
               {icons.jobCardCompany.notInterested}
               Not interested
            </button>
         </div>
         <div className="md:flex hidden md:mt-2 justify-between w-full">
            <div className="flex gap-6">
               <div className="cursor-pointer flex items-center gap-1">
                  {icons.jobCardCompany.message}
                  <div className="text-gray-500 font-semibold text-sm">Message</div>
               </div>
               <div className="cursor-pointer flex items-center gap-1">
                  {icons.jobCardCompany.notes}
                  <div className="text-gray-500 font-semibold text-sm">Add notes</div>
               </div>
            </div>
            <div className={classNames("flex gap-3", { "opacity-0": props.isAnySelected })}>
               <button className="btn btn-gray btn-outlined gap-2 btn-sm whitespace-nowrap">
                  {icons.jobCardCompany.notInterested}
                  Not interested
               </button>

               <button className="btn btn-gray btn-outlined gap-2 btn-sm">
                  {icons.jobCardCompany.shortlist}
                  Shortlist
               </button>

               <Dropdown
                  elm={
                     <button className="btn-primary btn-outlined btn btn-sm w-full gap-2 whitespace-nowrap">
                        Next steps {icons.jobCardCompany.caretDownPrimary}
                     </button>
                  }
                  items={dropdownItems}
               ></Dropdown>
            </div>
         </div>
      </>
   );
};

export default DefaultButtonGroupApplicationCard;
