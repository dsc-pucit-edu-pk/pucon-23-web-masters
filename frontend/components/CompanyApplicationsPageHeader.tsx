import classNames from "classnames";
import Checkbox from "./Checkbox";
import React from "react";

interface CompanyApplicationsPageHeaderProps {
   selectAllValue: boolean;
   setSelectAllValue: (val: boolean) => void;
   children: React.ReactNode;
}

const CompanyApplicationsPageHeader: React.FC<CompanyApplicationsPageHeaderProps> = (props) => {
   return (
      <div className="flex flex-col justify-center gap-3 py-6 px-4 bg-white top-0 w-screen left-0 z-20 border-b border-gray-200">
         <Checkbox label="Select All" onChange={props.setSelectAllValue} value={props.selectAllValue}></Checkbox>

         <button className="btn btn-outlined btn-gray btn-sm">Hire</button>
         <div className="grid grid-cols-2 gap-3">
            <button className="btn btn-outlined btn-gray btn-sm">Message</button>
            <button className="btn btn-outlined btn-gray btn-sm">Send Assignment</button>
            <button className="btn btn-outlined btn-gray btn-sm">Shortlist</button>
            <button className="btn btn-outlined btn-gray btn-sm">Not interested</button>
         </div>
      </div>
   );
};

export default CompanyApplicationsPageHeader;
