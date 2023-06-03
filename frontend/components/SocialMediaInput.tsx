import { icons } from "../utils/helpers";

interface SocialMediaInputProps {
   iconUrl: string;
   value: string;
   placeholder: string;
   onChange: (val: string) => void;
}

const SocialMediaInput: React.FC<SocialMediaInputProps> = ({
   iconUrl,
   placeholder,
   value,
}) => {
   return (
      <div className="border cursor-pointer  border-gray-300 px-3.5 py-2.5 flex items-center rounded-3xl w-full justify-between">
         <div className="flex items-center gap-1.5">
            <img src={iconUrl} className="h-6 w-6"></img>
            <div className="text-gray-500 text-sm">{value || placeholder}</div>
         </div>
         {icons.addCircle}
      </div>
   );
};

export default SocialMediaInput;
