import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import { useGlobalContext } from "../../contexts/GlobalContext";
import * as React from "react";
import PageWrapper from "../../components/PageWrapper";
import { useRouter } from "next/router";

import { useForm } from "../../hooks/useForm";
import SignupForm from "../../components/SignupForm";

const SignupContent: React.FC = () => {
   const [state, dispatch] = useGlobalContext();
   const [signupType, setSignupType] = useState("");
   const router = useRouter();
   const { inputsData, onSubmit } = useForm<
      {
         username: string;
         email: string;
         password: string;
      },
      {}
   >({
      inputs: {
         email: { value: "" },
         username: { value: "" },
         password: {
            value: "",
            state: {
               text: "Minimum 8 characters with at least one uppercase character",
               type: "primary",
            },
         },
      },
   });

   return (
      <>
         <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Navbar></Navbar>
         <SignupForm
            heading="Signup to create and join events"
            className="min-h-full justify-center px-4 my-16 border-none md:border md:w-160 mx-auto border-gray-200  md:px-20 pb-10"
         ></SignupForm>
      </>
   );
};

const Signup: NextPage = () => {
   return <PageWrapper Component={SignupContent}></PageWrapper>;
};

export default Signup;
