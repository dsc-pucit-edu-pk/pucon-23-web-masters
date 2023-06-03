import { forwardRef, useState } from "react";
import Datepicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import Input from "./Input";
import classNames from "classnames";
import { icons } from "../utils/helpers";
interface DateInputProps {
   value: string;
   onChange: (val: string) => void;
   showFooter?: boolean;
}

const DateInput: React.FC<DateInputProps> = (props) => {
   const [focus, setFocus] = useState(false);
   const CustomInput = forwardRef(({ value, onClick }: any, ref: any) => {
      const finalValue = value
         ? moment(new Date(value)).format("DD/MM/YYYY")
         : "dd/mm/yyyy";
      return (
         <div
            className="input-wrapper input-primary"
            onClick={() => {
               onClick();
               setFocus(true);
            }}
         >
            <div
               className={classNames("input-base", {
                  focus: focus,
               })}
            >
               <input
                  placeholder="dd/mm/yyyy"
                  value={finalValue}
                  // onFocus={() => setFocus(true)}
                  // placeholder={props.placeholder}
                  autoComplete="off"
               />
               {icons.calendar}
            </div>
         </div>
      );
   });
   return (
      <Datepicker
         selected={props.value ? new Date(props.value) : null}
         onFocus={() => setFocus(true)}
         onBlur={() => setFocus(false)}
         onCalendarOpen={() => setFocus(true)}
         onCalendarClose={() => setFocus(false)}
         onChange={(val) => props.onChange((val || Date.now()).toString())}
         value={props.value}
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
                        onClick={() => setFocus(false)}
                        className="btn btn-gray btn-outlined btn-md"
                     >
                        Cancel
                     </button>
                     <button
                        className="btn btn-primary btn-md"
                        onClick={() => setFocus(false)}
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
            );
         }}
         customInput={<CustomInput></CustomInput>}
      ></Datepicker>
   );
};

export default DateInput;
