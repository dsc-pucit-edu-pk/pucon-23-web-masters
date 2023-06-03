import React from "react";
import { createCustomContext } from "../utils/CreateCustomContext";

interface IGlobalState {
   loading: boolean;
   swal?: {
      title: string;
      type: "error" | "success" | "info" | "warning";
      message: string;
      timeout?: number;
   };
   user: IUser | null;
   email: string;
}

export interface IUser {
   purpose: IAccountPurpose;
   name?: string;
   emai?: string;
}

const initialState: IGlobalState = {
   loading: false,
   email: "",
   user: null,
};

const functions = {
   setState: (
      state: IGlobalState,
      props: Partial<IGlobalState>
   ): IGlobalState => ({ ...state, ...props }),
};

const { Context, Provider, useContextHook } = createCustomContext<
   IGlobalState,
   typeof functions
>({
   initialState,
   functions,
});

export const GlobalContextProvider = Provider;
export const useGlobalContext = useContextHook;
