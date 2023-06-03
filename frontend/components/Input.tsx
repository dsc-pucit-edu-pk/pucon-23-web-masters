import classNames from "classnames";
import { useState } from "react";
import { icons } from "../utils/helpers";
import SelectMenu from "./SelectMenu";

interface CustomInputProps {
   startIcon?: JSX.Element;
   labelSubtext?: string;
   endIcon?: JSX.Element;
   label?: string;
   helperText?: string;
   endButton?: JSX.Element;
   dropdownStart?: boolean;
   dropdownEnd?: boolean;
   placeholder?: string;
   value: string;
   onChange: (val: string) => void;
   state?: InputState;
   showEye?: boolean;
   testId?: TestId;
   type?: InputType;
   tags?: boolean;

   options?: string[];
   startText?: string | JSX.Element;
   className?: string;
}

const Input: React.FC<CustomInputProps> = (props) => {
   const [focus, setFocus] = useState(false);
   const [showPass, setShowPass] = useState(false);
   const [showMenu, setShowMenu] = useState(false);
   const [selectedItem, setSelectedItem] = useState(0);
   const renderEye = () => (showPass ? icons.eyeClose : icons.eye);
   const renderType = () => {
      if (!props.showEye) {
         return props.type || "text";
      } else {
         return showPass ? "text" : "password";
      }
   };
   const onBlurOnInput = () => {
      setFocus(false);
      setTimeout(() => {
         setShowMenu(false);
      }, 200);
   };
   const renderInputBase = () => {
      const tags = props.tags ? props.value.split(":") : [];
      const value = props.tags ? tags[tags.length - 1] : props.value;

      return (
         <div
            className={classNames("input-base", {
               focus: focus,
            })}
         >
            {props.startIcon && props.startIcon}
            <input
               onKeyUp={(e) => {
                  if (e.key === "Enter") {
                     if (props.tags) {
                        props.onChange(props.value + ":");
                     }
                  }
               }}
               value={value}
               onChange={(e) => {
                  const onChangeValue = props.tags
                     ? tags.slice(0, -1).join(":") + ":" + e.target.value
                     : e.target.value;
                  console.log("On change value tags", onChangeValue);
                  props.onChange(onChangeValue);
               }}
               type={renderType()}
               onFocus={() => {
                  setFocus(true);
                  setShowMenu(true);
               }}
               onBlur={onBlurOnInput}
               placeholder={props.placeholder}
               autoComplete="off"
            />
            <div onClick={() => setShowPass(!showPass)} className="cursor-pointer">
               {props.showEye && renderEye()}
            </div>

            {props.endIcon && props.endIcon}
         </div>
      );
   };
   const renderTags = () => {
      const tags = props.tags ? props.value.split(":") : [];

      return (
         <>
            {tags?.slice(0, -1).filter((x) => x.trim()).length ? (
               <div className="flex gap-2 mb-4 mt-4">
                  {tags
                     .slice(0, -1)
                     .filter((x) => x.trim())
                     .map((tag) => (
                        <div className="flex gap-1 rounded-3xl bg-gray-100 items-center py-0.5 px-2">
                           <div className="font-medium text-sm text-gray-700">{tag}</div>
                           <div
                              onClick={() =>
                                 props.onChange(
                                    props.value
                                       .split(":")
                                       .filter((x) => x !== tag)
                                       .join(":")
                                 )
                              }
                           >
                              {icons.closeSmall}
                           </div>
                        </div>
                     ))}
               </div>
            ) : null}
         </>
      );
   };
   const itemsToShow = props.options?.filter((x) => x.toLowerCase().includes(props.value.toLowerCase())) || [];

   return (
      <div
         className={classNames("input-wrapper input-primary relative " + (props.className || ""), {
            "input-error": props.state?.type === "error",
            "input-primary": props.state === undefined,
            "input-warn": props.state?.type === "warn",
         })}
         data-testid={props.testId}
      >
         {props.label && (
            <div className="text-sm text-gray-700 font-medium">
               {props.label}{" "}
               {props.labelSubtext ? <span className="text-gray-400 font-normal">({props.labelSubtext})</span> : null}
            </div>
         )}
         {props.tags && renderTags()}
         {props.startText ? (
            <div className="grid grid-flow-col input-inner-wrapper">
               <div className="px-3 border text-gray-500 flex items-center h-full rounded-l-lg border-r-0 border-gray-300">
                  {props.startText}
               </div>
               {renderInputBase()}
            </div>
         ) : (
            renderInputBase()
         )}

         {props.options ? (
            <SelectMenu
               items={itemsToShow}
               open={showMenu}
               onItemSelect={(item) => {
                  console.log("On item select called", item);
                  props.onChange(item);
               }}
               selectedItem={selectedItem}
            ></SelectMenu>
         ) : null}
         {props.state?.text && <div className="text-sm helper-text">{props.state?.text}</div>}
         {/* {props.state?.text && (
            <div className="text-sm helper-text">{props.state?.text}</div>
         )} */}
      </div>
   );
};

export default Input;
