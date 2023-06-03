import { useState } from "react";
import Input from "./Input";
import Select from "./Select";
import { icons } from "../utils/helpers";
import { useForm } from "../hooks/useForm";
import DialogWrapper from "./DialogWrapper";
interface LanguageInputProps {
   value: ILanguage;
   onChange: (value: ILanguage) => void;
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

const LanguageInput: React.FC<LanguageInputProps> = (props) => {
   const [editing, setEditing] = useState(false);

   const { inputsData } = useForm<
      { language: string; proficiency: string },
      {}
   >({
      inputs: { language: { value: "" }, proficiency: { value: "" } },
      onAnyChange: (data) => {
         console.log(data, "data from on any dhange");
         props.onChange({
            language: data.language.value as string,
            proficiency: data.proficiency.value as string,
         });
      },
   });
   if (editing) {
      if (window.innerWidth < 768) {
         return (
            <DialogWrapper className=" px-4 pb-4 pt-5 w-full mx-4 flex-col">
               <>
                  <div className="flex justify-between items-center w-full mb-6">
                     <div className="text-lg font-semibold text-gray-900">
                        Add language
                     </div>
                     <div
                        className="cursor-pointer"
                        onClick={() => setEditing(false)}
                     >
                        {icons.close}
                     </div>
                  </div>
                  <div className="flex flex-col gap-8 mb-6">
                     <Input
                        {...inputsData.language}
                        placeholder="Name of language"
                     ></Input>
                     <Select
                        {...inputsData.proficiency}
                        options={proficencyOptions}
                        placeholder="Proficiency"
                     ></Select>
                  </div>
                  <button
                     className="btn btn-primary btn-lg"
                     onClick={() => setEditing(false)}
                  >
                     Save
                  </button>
               </>
            </DialogWrapper>
         );
      }
      return (
         <div className="flex gap-6 items-center">
            <Input
               {...inputsData.language}
               placeholder="Name of language"
            ></Input>
            <Select
               {...inputsData.proficiency}
               options={proficencyOptions}
               placeholder="Proficiency"
            ></Select>

            <div
               className="btn btn-link btn-primary w-fit"
               onClick={() => setEditing(false)}
            >
               Save
            </div>
         </div>
      );
   }
   return (
      <div className="flex rounded-lg py-2.5 px-3.5 justify-between border border-gray-300">
         <div className="text-gray-900">
            {props.value.language} - {props.value.proficiency}
         </div>
         <div className="cursor-pointer" onClick={() => setEditing(true)}>
            {icons.edit}
         </div>
      </div>
   );
};

export default LanguageInput;
