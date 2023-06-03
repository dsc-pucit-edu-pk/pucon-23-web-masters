import Checkbox from "./Checkbox";

interface OptionsListProps {
   value: string[];
   onChange: (val: string[]) => void;
   items: { text: string; value: string }[];
   label?: string;
   labelSubtext?: string;
}

const CheckboxList: React.FC<OptionsListProps> = (props) => {
   return (
      <div className="flex flex-col gap-6">
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
         <div className="grid-cols-2 grid gap-6">
            {props.items.map((item) => (
               <Checkbox
                  onChange={(val) => {
                     if (val) {
                        props.onChange([...props.value, item.value]);
                     } else {
                        props.onChange(
                           props.value.filter((x) => x !== item.value)
                        );
                     }
                  }}
                  label={item.text || item.value}
                  value={props.value.includes(item.value)}
               ></Checkbox>
            ))}
         </div>
      </div>
   );
};

export default CheckboxList;
