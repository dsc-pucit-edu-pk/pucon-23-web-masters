interface InputTagProps {
   icon: JSX.Element;
   text: string;
   onClick: () => void;
}

const InputTag: React.FC<InputTagProps> = (props) => {
   return (
      <div className="flex cursor-pointer gap-1 rounded-3xl bg-gray-100 items-center py-0.5 px-2">
         <div className="font-medium text-sm text-gray-700">{props.text}</div>
         <div className="cursor-pointer" onClick={props.onClick}>
            {props.icon}
         </div>
      </div>
   );
};

export default InputTag;
