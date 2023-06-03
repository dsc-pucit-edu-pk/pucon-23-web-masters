import { icons } from "../utils/helpers";

interface SuccessMessageProps {
   text: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = (props) => {
   return (
      <div className="flex flex-col gap-6 items-center">
         {icons.success}
         <div className="text-gray-900 text-center text-3xl font-semibold">
            {props.text}
         </div>
      </div>
   );
};

export default SuccessMessage;
