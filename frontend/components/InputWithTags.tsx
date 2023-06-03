import classNames from "classnames";
import { useState } from "react";
import { icons } from "../utils/helpers";
import InputTag from "./InputTag";
import InputLabel from "./InputLabel";
import SelectMenu from "./SelectMenu";

interface CustomInputProps {
   startIcon?: JSX.Element;
   labelSubtext?: string;
   endIcon?: JSX.Element;
   label?: string;
   helperText?: string;
   items: string[];
   placeholder?: string;
   value: string[];
   onChange: (val: string[]) => void;
   state?: InputState;
   suggestedTags?: string[];
   testId?: TestId;
   maxItems?: number;
   labelRightText?: string;
   startText?: string | JSX.Element;
}

const InputWithTags: React.FC<CustomInputProps> = (props) => {
   const [focus, setFocus] = useState(false);
   const [showMenu, setShowMenu] = useState(false);
   const [value, setValue] = useState("");
   const [selectedItem, setSelectedItem] = useState(0);

   const onKeyUpOnInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp") {
         setSelectedItem(
            selectedItem === 0 ? itemsToShow.length - 1 : selectedItem - 1
         );
      }
      if (e.key === "ArrowDown") {
         setSelectedItem(
            selectedItem === itemsToShow.length - 1 ? 0 : selectedItem + 1
         );
      }
      if (e.key === "Enter") {
         props.onChange([...props.value, itemsToShow[selectedItem]]);
      }
   };
   const onBlurOnInput = () => {
      setFocus(false);
      setTimeout(() => {
         setShowMenu(false);
      }, 200);
   };

   const addTag = (tag: string) => {
      if (props.maxItems && props.value.length >= props.maxItems) {
         return;
      }
      props.onChange([...props.value, tag]);
   };

   const renderInputBase = () => {
      return (
         <div
            className={classNames("input-base", {
               focus: focus,
            })}
         >
            {props.startIcon && props.startIcon}
            <input
               value={value}
               onChange={(e) => setValue(e.target.value)}
               onFocus={() => {
                  setFocus(true);
                  setShowMenu(true);
               }}
               onKeyUp={onKeyUpOnInput}
               onBlur={onBlurOnInput}
               placeholder={props.placeholder}
               autoComplete="off"
            />

            {props.endIcon && props.endIcon}
         </div>
      );
   };
   const itemsToShow = props.items
      .filter((item) => !props.value.includes(item))
      .filter((x) => x.toLowerCase().includes(value.toLowerCase()));
   const suggestedTagsToShow = props.suggestedTags?.filter(
      (x) => !props.value.includes(x)
   );
   const renderTags = () => {
      return (
         <>
            {props.value.length ? (
               <div className="flex gap-2 flex-wrap">
                  {props.value.map((tag) => (
                     <InputTag
                        key={tag}
                        text={tag}
                        icon={icons.closeSmall}
                        onClick={() =>
                           props.onChange(props.value.filter((x) => x !== tag))
                        }
                     />
                  ))}
               </div>
            ) : null}
         </>
      );
   };

   return (
      <div className="flex flex-col">
         <div
            className={classNames(
               "input-wrapper input-primary relative input-with-tags ",
               {
                  "input-error": props.state?.type === "error",
                  "input-primary": props.state === undefined,
                  "input-warn": props.state?.type === "warn",
               }
            )}
            data-testid={props.testId}
         >
            {props.label && (
               <InputLabel
                  rightText={props.labelRightText}
                  subText={props.labelSubtext}
                  text={props.label}
               ></InputLabel>
            )}
            {renderTags()}

            {renderInputBase()}
            <SelectMenu
               items={itemsToShow}
               open={showMenu}
               onItemSelect={addTag}
               selectedItem={selectedItem}
            ></SelectMenu>
            {props.state?.text && (
               <div className="text-sm helper-text">{props.state?.text}</div>
            )}
         </div>
         {suggestedTagsToShow?.length ? (
            <div className="mt-5 flex gap-4">
               <div className="text-primary-400 text-sm font-medium">
                  Suggested:{" "}
               </div>

               <div className="flex gap-2">
                  {suggestedTagsToShow?.map((tag) => (
                     <InputTag
                        onClick={() => addTag(tag)}
                        text={tag}
                        icon={icons.addSmall}
                     ></InputTag>
                  ))}
               </div>
            </div>
         ) : null}
      </div>
   );
};

export default InputWithTags;
