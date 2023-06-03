import { icons } from "../utils/helpers";
import Textarea from "./Textarea";

interface AsssessmentQuestionProps {
   value: string;
   onChange: (val: string) => void;
   onClickOnRemove: () => void;
   index: number;
}

const AsssessmentQuestion: React.FC<AsssessmentQuestionProps> = (props) => {
   return (
      <div className="flex flex-col gap-3">
         <div className="flex justify-between items-center">
            <div className="text-gray-700 font-semibold">
               Assessment Question {props.index + 1}
            </div>
            <div
               onClick={props.onClickOnRemove}
               className="flex gap-2 items-center font-semibold btn btn-link btn-primary w-fit"
            >
               {icons.minus}
               Remove
            </div>
         </div>
         <div className="text-sm text-gray-500">
            If you want the applicants to upload a document as a part of the
            assessment question, please ask them to upload it on Dropbox or
            Google Drive and share the link in the answer.
         </div>
         <Textarea
            value={props.value}
            onChange={props.onChange}
            placeholder="Type your question here"
            rows={4}
         ></Textarea>
      </div>
   );
};

export default AsssessmentQuestion;
