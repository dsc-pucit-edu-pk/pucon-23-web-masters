import { useState } from "react";
import Input from "./Input";
import Select from "./Select";
import { icons } from "../utils/helpers";
import { useForm } from "../hooks/useForm";
import DialogWrapper from "./DialogWrapper";
import Checkbox from "./Checkbox";
import Textarea from "./Textarea";
interface LanguageInputProps {
   value: IOtherExam;
   editing?: boolean;
   onChange: (value: IOtherExam) => void;
   state: string;
}

const OtherExamInput: React.FC<LanguageInputProps> = (props) => {
   const [editing, setEditing] = useState(
      props.editing === true ? true : false
   );

   const { inputsData } = useForm<IOtherExam, {}>({
      inputs: {
         description: { value: "" },
         title: { value: "" },
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
         description: inputsData.description.value,
         title: inputsData.title.value,
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
                  <Input
                     {...inputsData.title}
                     label="Title"
                     placeholder="Enter title of exam"
                  ></Input>

                  <Textarea
                     {...inputsData.description}
                     rows={4}
                     label="Description"
                     placeholder="Write something about the exam"
                  ></Textarea>
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

export default OtherExamInput;
