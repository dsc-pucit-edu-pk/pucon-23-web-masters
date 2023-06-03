import { useId } from "react";
interface RadioProps<Name extends string = string> {
   value: Name;
   text: string;
   name: string;
   checked?: boolean;
   onChange: (value: Name) => void;
}

const Radio = <Name extends string = string>(props: RadioProps<Name>) => {
   const id = useId();
   return (
      <div className="flex gap-3 items-center">
         <input
            id={id}
            type="radio"
            name={props.name}
            value={props.value}
            checked={props.checked}
            onChange={(e) => props.onChange(e.target.value as Name)}
         ></input>
         <label htmlFor={id}>{props.text}</label>
      </div>
   );
};

export default Radio;
