import { useState, useMemo, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import { icons } from "../utils/helpers";
import { fileToBase64 } from "../utils/utils";

interface UploadFileProps {
   value: File | null;
   onChange: (file: File) => void;
}

const UploadFile: React.FC<UploadFileProps> = ({ value, onChange }) => {
   const [uri, setUri] = useState<string | null>(null);
   useEffect(() => {
      if (value) {
         fileToBase64(value).then((x) => {
            console.log(x, "Image uri final");
            setUri(x as string);
         });
      }
   }, [value]);
   return (
      <FileUploader
         handleChange={(file: File) => {
            console.log(file);
            onChange(file);
         }}
         classes="w-full custom-upload-file"
         children={
            <div className="w-full bg-white border border-gray-200 py-6 rounded-xl flex flex-col items-center">
               {typeof uri === "string" ? (
                  <img
                     className="rounded-full h-16 w-16 object-cover"
                     src={uri}
                  ></img>
               ) : (
                  icons.uploadImage
               )}
               <div className="flex gap-1 mt-3 mb-1">
                  {icons.upload}
                  <div className="text-primary-400">Upload your poster</div>
                  <div className="text-gray-400">(optional)</div>
               </div>

               <div className="text-gray-600 text-sm">
                  or drag and drop here (max size: 5mb)
               </div>
            </div>
         }
      ></FileUploader>
   );
};

export default UploadFile;
