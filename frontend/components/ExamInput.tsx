import { useState } from "react";
import Input from "./Input";
import Select from "./Select";
import { icons } from "../utils/helpers";
import { useForm } from "../hooks/useForm";
import DialogWrapper from "./DialogWrapper";
import Checkbox from "./Checkbox";
interface LanguageInputProps {
   value: IExam;
   editing?: boolean;
   onChange: (value: IExam) => void;
   state: string;
}

const proficencyOptions = [
   {
      heading: "Basic",
      text: "I write clearly in this language",
      value: "Basic",
   },
   {
      heading: "Conversational",
      text: "I write & speak clearly in this language",
      value: "Conversational",
   },

   {
      heading: "Fluent",
      text: "I write & speak this language to a high level",
      value: "Fluent",
   },
   {
      heading: "Native",
      text: "I write & speak this language perfectly",
      value: "Native",
   },
];

const ExamInput: React.FC<LanguageInputProps> = (props) => {
   const [editing, setEditing] = useState(
      props.editing === true ? true : false
   );

   const { inputsData } = useForm<IExam, {}>({
      inputs: {
         language: { value: "" },
         optSubject: { value: "" },
         qualifiedForInterview: { value: false },
         qualifiedForMains: { value: false },
         state: { value: "UPSC" },
         yearOfAttempt: { value: "" },
      },
      // onAnyChange: (data) => {
      //    console.log(data, "data from on any dhange");
      //    props.onChange({
      //       language: data.language.value as string,
      //       proficiency: data.proficiency.value as string,
      //    });
      // },
   });
   const onClickOnSave = () => {
      props.onChange({
         language: inputsData.language.value,
         optSubject: inputsData.optSubject.value,
         qualifiedForInterview: inputsData.qualifiedForInterview.value,
         qualifiedForMains: inputsData.qualifiedForMains.value,
         state: props.state,
         yearOfAttempt: inputsData.yearOfAttempt.value,
      });
      setEditing(false);
   };
   if (editing) {
      return (
         <DialogWrapper className="md:w-160 px-4 pb-4 pt-5 w-full mx-4 flex-col">
            <>
               <div className="flex justify-between items-center w-full mb-6">
                  {icons.featured}
                  <div
                     className="cursor-pointer"
                     onClick={() => setEditing(false)}
                  >
                     {icons.close}
                  </div>
               </div>

               <div className="text-lg mb-5 font-semibold text-gray-900">
                  Add attempt
               </div>
               <div className="flex flex-col gap-8 mb-6">
                  <Input
                     {...inputsData.yearOfAttempt}
                     label="Year of attempt"
                     placeholder="Choose a year"
                     type="number"
                  ></Input>
                  <div className="flex items-center gap-6 w-full">
                     <Input
                        {...inputsData.language}
                        label="Medium"
                        placeholder="e.g. English"
                     ></Input>
                     <Input
                        {...inputsData.optSubject}
                        label="Optional subject"
                        placeholder="e.g. Sociology"
                     ></Input>
                  </div>
                  <div className="flex items-center gap-8">
                     <Checkbox
                        {...inputsData.qualifiedForMains}
                        label="Qualified for mains"
                     ></Checkbox>
                     <Checkbox
                        {...inputsData.qualifiedForInterview}
                        label="Qualified for mains"
                     ></Checkbox>
                  </div>
               </div>
               <button
                  className="btn btn-primary btn-lg"
                  onClick={onClickOnSave}
               >
                  Save
               </button>
            </>
         </DialogWrapper>
      );
   }
   return (
      <div className="flex rounded-lg py-2.5 px-3.5 justify-between border border-gray-300">
         <div className="text-gray-900">{props.value.yearOfAttempt}</div>
         <div className="cursor-pointer" onClick={() => setEditing(true)}>
            {icons.edit}
         </div>
      </div>
   );
};

export default ExamInput;
