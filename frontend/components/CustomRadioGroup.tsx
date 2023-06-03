import classNames from "classnames";
import { icons } from "../utils/helpers";

interface IRadio {
   heading: string;
   icon: JSX.Element;
   iconSmall: JSX.Element;
   text: string;
   value: string;
   testId: TestId;
}

interface CustomRadioGroupProps {
   value: string;
   items: IRadio[];
   onChange: (value: string) => void;
}

const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({
   value,
   items,
   onChange,
}) => {
   return (
      <div className="flex flex-col md:flex-row md:gap-10 gap-6 w-full">
         {items.map((item) => (
            <div
               data-testid={item.testId}
               onClick={() => onChange(item.value)}
               className={classNames(
                  "flex relative cursor-pointer w-full flex-row md:flex-col items-center md:px-6 md:pt-14 md:pb-10 px-4 py-6 rounded-xl gap-5 md:gap-10 border bg-white border-gray-200",
                  {
                     "border-primary-400": item.value === value,
                     "bg-primary-50": item.value === value,
                     "selected-item": item.value === value,
                  }
               )}
            >
               {item.icon}

               <div className="flex flex-grow md:flex-grow-0 flex-col gap-3 md:text-center md:items-center">
                  <div className="text-gray-900 font-semibold md:text-2xl text-xl">
                     {item.heading}
                  </div>
                  <div className="text-gray-600 text-sm md:text-base">
                     {item.text}
                  </div>
               </div>
               <div className="md:absolute top-4 right-4 ">
                  {item.value === value
                     ? icons.customCheckbox.filledCheckbox
                     : icons.customCheckbox.unfilledCheckbox}
               </div>
            </div>
         ))}
      </div>
   );
};

export default CustomRadioGroup;
