import { useRouter } from "next/router";
import ProgressBar from "./ProgressBar";
import { icons } from "../utils/helpers";

interface ProfileLevelCardProps {
   completedPercentage: number;
   items: IProfileLevelCardItem[];
}

export interface IProfileLevelCardItem {
   icon: JSX.Element;
   text: string;
   url: string;
   isLast?: boolean;
}

const ProfileLevelCardItem: React.FC<IProfileLevelCardItem> = (props) => {
   const router = useRouter();
   return (
      <div
         className={`p-6 flex gap-3 items-center border-b cursor-pointer ${
            props.isLast ? "" : "border-b border-gray-200"
         } `}
         onClick={() => router.push(props.url)}
      >
         {props.icon}
         <div className="font-medium text-sm text-gray-900">{props.text}</div>
      </div>
   );
};

const ProfileLevelCard: React.FC<ProfileLevelCardProps> = (props) => {
   return (
      <div className="flex flex-col rounded-xl gap-3 pt-6 border-gray-200 border bg-white">
         <div className="flex flex-col px-6">
            <div className="text-xl font-semibold text-gray-900 mb-2">
               Profile level: {props.completedPercentage}%
            </div>
            <ProgressBar
               percentage={props.completedPercentage}
               className="md:h-1"
            ></ProgressBar>

            <div className="mt-8 text-sm font-medium text-gray-500">
               Fill in more details to boost your chances of getting hired:
            </div>
         </div>
         {props.items.map((x) => (
            <ProfileLevelCardItem {...x}></ProfileLevelCardItem>
         ))}
      </div>
   );
};

export default ProfileLevelCard;
