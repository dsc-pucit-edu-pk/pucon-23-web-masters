import classNames from "classnames";
import { useState } from "react";
import { icons } from "../utils/helpers";
import Input from "./Input";

interface CustomInputProps {
   label?: string;
   helperText?: string;
   placeholder?: string;
   value: string;
   onChange: (val: string) => void;
   state?: InputState;
   testId?: TestId;
   type?: InputType;
   rows?: number;
   rightLabel?: string;
}

const Textarea: React.FC<CustomInputProps> = (props) => {
   const [focus, setFocus] = useState(false);
   return (
      <div
         className={classNames("input-wrapper input-primary", {
            "input-error": props.state?.type === "error",
            "input-primary": props.state === undefined,
            "input-warn": props.state?.type === "warn",
         })}
         data-testid={props.testId}
      >
         <div className="flex w-full justify-between">
            <div className="text-sm text-gray-700 font-medium">
               {props.label}
            </div>

            <div className="text-sm text-gray-500 ">{props.rightLabel}</div>
         </div>
         <div
            className={classNames("input-base", {
               focus: focus,
            })}
         >
            <textarea
               rows={props.rows || 3}
               value={props.value}
               onChange={(e) => props.onChange(e.target.value)}
               onFocus={() => setFocus(true)}
               onBlur={() => setFocus(false)}
               placeholder={props.placeholder}
               autoComplete="off"
               className="text-gray-900"
            />
         </div>
         <div className="text-sm helper-text">{props.state?.text}</div>
      </div>
   );
};

export default Textarea;
