import classNames from "classnames";
import Radio from "./Radio";

import { useId } from "react";
interface RadioItem<Name extends string = string> {
   text: string;
   value: Name;
}
interface RadioGroupProps<Name extends string = string> {
   items: RadioItem<Name>[];
   onChange: (value: Name) => void;
   value: Name;
   label?: string;
   labelSubtext?: string;
   column?: boolean;
}

const RadioGroup = <Name extends string = string>(
   props: RadioGroupProps<Name>
) => {
   const id = useId();
   return (
      <div className="flex flex-col gap-4">
         {props.label && (
            <div className="text-sm text-gray-700 font-medium">
               {props.label}{" "}
               {props.labelSubtext ? (
                  <span className="text-gray-400 font-normal">
                     ({props.labelSubtext})
                  </span>
               ) : null}
            </div>
         )}
         <div
            className={classNames("flex md:flex-row flex-col gap-8", {
               "md:flex-col": props.column,
            })}
         >
            {props.items.map((item) => (
               <Radio<Name>
                  text={item.text}
                  onChange={props.onChange}
                  value={item.value}
                  checked={props.value === item.value}
                  name={id}
               ></Radio>
            ))}
         </div>
      </div>
   );
};

export default RadioGroup;
