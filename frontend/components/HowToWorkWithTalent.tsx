import classNames from "classnames";
import { icons } from "../utils/helpers";

interface HowToWorkWithTalentProps {}
interface IListItem {
   title: string;
   description: string;
   icon: JSX.Element;
}
const items: IListItem[] = [
   {
      title: "1. Post a job",
      description:
         "You may ask candidates applying to your job for cover letters or even ask assessment questions. All applications can be viewed and managed from your dashboard.",
      icon: icons.howToWorkWithTalent.postAJob,
   },
   {
      title: "2. Assess candidates",
      description:
         "You may ask candidates applying to your job for cover letters or even ask assessment questions. All applications can be viewed and managed from your dashboard.",
      icon: icons.howToWorkWithTalent.postAJob,
   },
   {
      title: "3. Start working with talent",
      description:
         "If you like an application you can message them right on the platform to get to know them better or to give out tasks to evaluate them. If you’re happy with their skills you can directly start working with them. Happy hiring :)",
      icon: icons.howToWorkWithTalent.postAJob,
   },
];

const HowToWorkWithTalent: React.FC<HowToWorkWithTalentProps> = () => {
   return (
      <div className="flex flex-col rounded-xl gap-4 border border-gray-200 shadow-sm pt-8">
         <div className="flex flex-col px-8">
            <div className="text-gray-900 font-semibold text-xl">
               How to work with talent
            </div>
            <div className="text-gray-600 font-normal text-sm">
               Here are some tips to get you started
            </div>
         </div>
         {items.map((item, i) => (
            <div
               className={classNames(
                  "flex gap-5 pt-6 pr-16 pb-6 pl-6 border-gray-200",
                  {
                     "border-b": i !== items.length - 1,
                  }
               )}
            >
               {item.icon}
               <div className="flex flex-col gap-1">
                  <div className="text-gray-800 font-semibold text-base">
                     {item.title}
                  </div>
                  <div className="text-gray-600 font-normal text-base">
                     {item.description}
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
};

export default HowToWorkWithTalent;
