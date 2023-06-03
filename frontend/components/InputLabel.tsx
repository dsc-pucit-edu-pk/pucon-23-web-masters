interface InputLabelProps {
   text: string;
   subText?: string;
   rightText?: string;
}

const InputLabel: React.FC<InputLabelProps> = (props) => {
   return (
      <div className="flex justify-between">
         <div className="text-sm text-gray-700 font-medium">
            {props.text}{" "}
            {props.subText ? (
               <span className="text-gray-400 font-normal">
                  ({props.subText})
               </span>
            ) : null}
         </div>
         {props.rightText ? (
            <div className="text-sm text-gray-400 font-medium">
               {props.rightText}
            </div>
         ) : null}
      </div>
   );
};

export default InputLabel;
