import { forwardRef, useState } from "react";
import Datepicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import Input from "./Input";
import classNames from "classnames";
import { icons } from "../utils/helpers";
import { on } from "events";
interface DateInputRangeProps {
   startDate: Date | null;
   endDate: Date | null;
   onChange: (dates: [Date | null, Date | null]) => void;
   showFooter?: boolean;
   defaultText?: string;
}
const DateInputRange: React.FC<DateInputRangeProps> = (props) => {
   const [focus, setFocus] = useState(false);
   const [tempStartDate, setTempStartDate] = useState<Date | null>(props.startDate);
   const [tempEndDate, setTempEndDate] = useState<Date | null>(props.endDate);
   const renderButtonContent = () => {
      if (props.startDate === null && props.endDate === null) {
         return <div className="text-gray-500 font-semibold text-sm">{props.defaultText}</div>;
      } else {
         const startDate = props.startDate ? moment(props.startDate).format("MMM D") : "";
         const endDate = props.endDate ? moment(props.endDate).format("MMM D") : "";
         return (
            <div className="text-gray-700 font-semibold text-sm">
               {startDate || ""} - {endDate || ""}
            </div>
         );
      }
   };
   const CustomInput = forwardRef(({ value, onClick }: any, ref: any) => {
      const finalValue = value ? moment(new Date(value)).format("DD/MM/YYYY") : "dd/mm/yyyy";
      return (
         <button
            className="btn w-fit flex gap-2 btn-md btn-gray btn-outlined"
            onClick={() => {
               onClick();
               setFocus(true);
            }}
         >
            {icons.calendar}
            <div className="text-gray-500 font-semibold text-sm">{renderButtonContent()}</div>
         </button>
      );
   });
   return (
      <Datepicker
         selected={tempStartDate}
         startDate={tempStartDate}
         endDate={tempEndDate}
         selectsRange
         onFocus={() => setFocus(true)}
         onBlur={() => setFocus(false)}
         onCalendarOpen={() => setFocus(true)}
         onClickOutside={() => setFocus(false)}
         onChange={(res) => {
            setTempStartDate(res[0]);
            setTempEndDate(res[1]);
         }}
         dateFormat="dd/MM/yyyy"
         placeholderText="dd/mm/yyyy"
         showPopperArrow={false}
         open={focus}
         calendarContainer={(data) => (
            <div className="bg-white rounded-lg datepicker-custom-wrapper flex flex-col">
               {data.children}
               {props.showFooter && (
                  <div className="flex p-4 bg-white gap-3 border-t border-gray-200">
                     <button
                        onClick={() => {
                           setTempStartDate(props.startDate);
                           setTempEndDate(props.endDate);
                           setFocus(false);
                        }}
                        className="btn btn-gray btn-outlined btn-md"
                     >
                        Cancel
                     </button>
                     <button
                        className="btn btn-primary btn-md"
                        onClick={() => {
                           props.onChange([tempStartDate, tempEndDate]);
                           setFocus(false);
                        }}
                     >
                        Apply
                     </button>
                  </div>
               )}
            </div>
         )}
         renderCustomHeader={(props) => {
            const year = props.date.getFullYear();
            const month = moment(props.date).format("MMMM");
            return (
               <div className="flex flex-col w-full">
                  <div className="flex justify-between items-center">
                     <div className="cursor-pointer" onClick={props.decreaseMonth}>
                        {icons.calendarLeftIcon}
                     </div>
                     <div className="text-gray-700 font-semibold">
                        {month} {year}
                     </div>
                     <div className="cursor-pointer" onClick={props.increaseMonth}>
                        {icons.calendarRightIcon}
                     </div>
                  </div>
                  <div className="flex w-full justify-between items-center mt-4">
                     <div className="w-fit">
                        <Input
                           className="w-36"
                           value={tempStartDate ? moment(tempStartDate).format("MMM D, YYYY") : "-"}
                           onChange={() => {}}
                        ></Input>
                     </div>
                     <div className="text-gray-500 font-normal text-base">-</div>
                     <div className="w-fit">
                        <Input
                           className="w-36"
                           value={tempEndDate ? moment(tempEndDate).format("MMM D, YYYY") : "-"}
                           onChange={() => {}}
                        ></Input>
                     </div>
                  </div>
               </div>
            );
         }}
         customInput={<CustomInput></CustomInput>}
      ></Datepicker>
   );
};
export default DateInputRange;
