import deepClone from "deep-clone";
import { useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { host } from "../utils/helpers";

interface Props<
   NamesObject extends NamesObjectDefault,
   ResponseData extends any
> {
   inputs: UseFormProps<NamesObject>;
   onSuccess?: (data: ResponseData) => void;
   onFail?: (data: ErrorObject) => void;

   onAnyChange?: (data: UseFormProps<NamesObject>) => void;
   onAnyChangeWithoutData?: () => void;

   checkForErrors?: (data: UseFormProps<NamesObject>) => boolean;
   api?: string;
}

export function useForm<
   NamesObject extends NamesObjectDefault,
   ResponseData extends any
>(props: Props<NamesObject, ResponseData>) {
   const [state, dispatch] = useGlobalContext();
   const [data, setData] = useState(props.inputs);

   const inputsData = Object.fromEntries(
      Object.keys(props.inputs).map((x: keyof NamesObject) => [
         x as keyof NamesObject,
         {
            onChange: (val: unknown) => {
               const newData = {
                  ...data,
                  [x]: { ...data[x], value: val },
               } as UseFormProps<NamesObject>;
               setData(newData);
               props.onAnyChange?.(newData);
            },
            setState: (val: InputState) => {
               setData({ ...data, [x]: { ...data[x], state: val } });
            },
            value: data[x].value,
            state: data[x].state,
            updateItem: (index: number, value: unknown) => {
               if (Array.isArray(data[x].value)) {
                  const newArr = deepClone(data[x].value) as unknown[];
                  newArr[index] = value;
                  const newData = {
                     ...data,
                     [x]: { ...data[x], value: newArr },
                  } as UseFormProps<NamesObject>;

                  setData(newData);
                  props.onAnyChange?.(newData);
               }
            },
            addItem: (value: unknown) => {
               if (Array.isArray(data[x].value)) {
                  const newData = {
                     ...data,
                     [x]: {
                        ...data[x],
                        value: [...(data[x].value as unknown[]), value],
                     },
                  };
                  setData(newData);
                  props.onAnyChange?.(newData);
               }
            },
            removeItem: (index: number) => {
               if (Array.isArray(data[x].value)) {
                  const newData = {
                     ...data,
                     [x]: {
                        ...data[x],
                        value: [
                           ...(data[x].value as unknown[]).slice(0, index),
                           ...(data[x].value as unknown[]).slice(index + 1),
                        ],
                     },
                  };
                  setData(newData);
                  props.onAnyChange?.(newData);
               }
            },
         },
      ])
   ) as CreateFormObject<NamesObject>;

   const onSubmit = () => {
      const newData = { ...data };
      let error = false;
      for (let key in data) {
         const k = key;
         const input = data[k];
         if (input.checks) {
            let stateChanged = false;
            for (let check of input.checks) {
               if (check.cond(input.value)) {
                  newData[k].state = check.state;
                  if (check.state.type === "error") {
                     error = true;
                  }
                  stateChanged = true;
                  break;
               }
            }
            if (!stateChanged) {
               newData[k].state = undefined;
            }
         }
         setData({ ...newData });
      }
      if (error) {
         return error;
      }
      if (!props.api) {
         return error;
      }
      dispatch({ setState: { loading: true } });
      fetch(`${host}${props.api}`, {
         method: "POST",
         body: JSON.stringify(
            Object.fromEntries(
               Object.entries(inputsData).map(([k, v]) => [k, v.value])
            )
         ),
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
         },
      })
         .then((res) => res.json())
         .then((data) => {
            // console.log(data, "Response from api");
            if (data.statusCode === undefined) {
               if (props.onSuccess) {
                  props.onSuccess(data);
               }
            } else {
               props?.onFail?.(data as ErrorObject);
            }
         })
         .catch((err) => {})
         .finally(() => {
            dispatch({ setState: { loading: false } });
         });
   };
   const setPartialData = (props: PartialFormProps<NamesObject>) => {
      const newData = Object.fromEntries(
         Object.keys(data).map((k) => [k, { ...data[k], ...(props[k] || {}) }])
      );
      setData({ ...data, ...newData });
   };
   const checkForErrors = (
      myData?: UseFormProps<NamesObject>,
      include?: (keyof NamesObject)[]
   ) => {
      const newData = { ...data };
      let error = false;
      myData = myData || data;
      include = include || Object.keys(myData);
      console.log(myData, "myData");
      for (let key in myData) {
         if (!include.includes(key)) {
            continue;
         }

         const k = key;
         const input = myData[k];
         if (input.checks) {
            console.log("has checks", input.checks);
            let stateChanged = false;
            for (let check of input.checks) {
               if (check.cond(input.value)) {
                  if (check.state.type === "error") {
                     error = true;
                     console.log("Error is true for key: ", key);
                  }
                  stateChanged = true;
                  break;
               }
            }
         }
      }
      return error;
   };

   return {
      checkForErrors,
      onSubmit,
      inputsData,
      data,
      setData: setPartialData,
   };
}
