import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import AuthPageWrapper from "../../components/AuthPageWrapper";
import Checkbox from "../../components/Checkbox";
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { useForm } from "../../hooks/useForm";
import { checks, icons } from "../../utils/helpers";
import * as React from "react";
import PageWrapper from "../../components/PageWrapper";
import { useRouter } from "next/router";
import { errors, routes } from "../../utils/utils";
import { accountLogin } from "../../apis/accountLogin";
import useSwal from "../../hooks/useSwal";

const LoginComponent: React.FC = () => {
   const [state, dispatch] = useGlobalContext();
   const [checked, setChecked] = useState(false);
   const router = useRouter();
   useSwal();
   const [file, setFile] = useState<File | null>(null);
   const { onSubmit, inputsData, setData, data } = useForm<
      { email: string; password: string; rememberMe: boolean },
      LoginResponse
   >({
      inputs: {
         email: {
            type: "text",
            value: "",
            checks: [checks.required.string],
         },
         password: {
            type: "text",
            value: "",
            checks: [checks.required.string],
         },
         rememberMe: {
            type: "checkbox",
            value: false,
         },
      },
   });
   const handleSubmit = () => {
      const error = onSubmit();
      if (!error) {
         accountLogin({
            email: inputsData.email.value,
            password: inputsData.password.value,
         }).then((res) => {
            if (res.status !== 200) {
               dispatch({
                  setState: {
                     swal: {
                        message: res.message || "",
                        type: "error",
                        title: "Error",
                     },
                  },
               });
            } else {
               localStorage.setItem("token", res.token || "");
               router.push(routes.home);
            }
         });
      }
   };
   return (
      <>
         <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Navbar></Navbar>

         <AuthPageWrapper
            icon={icons.authPage.login}
            heading="Log in to your account"
            subHeading="Welcome back! Please enter your details."
         >
            <Loader></Loader>

            <div className="inputs-y">
               <Input
                  {...inputsData.email}
                  testId="input_email"
                  label="Email"
                  placeholder="Enter your email"
               ></Input>
               <Input
                  {...inputsData.password}
                  testId="input_password"
                  label="Password"
                  placeholder="Enter your password"
                  helperText="This is a hint text to help user."
                  endIcon={icons.input.question}
               ></Input>
            </div>
            <div className="flex  checkbox justify-between w-full my-6">
               <Checkbox
                  {...inputsData.rememberMe}
                  label="Remember for 30 days"
                  className="checkbox-sm"
               ></Checkbox>
            </div>
            <button
               className="btn-primary btn btn-sm mb-4"
               data-testid="btn_sign-in"
               onClick={handleSubmit}
            >
               Sign in
            </button>
         </AuthPageWrapper>
      </>
   );
};

const Login: NextPage = () => {
   return <PageWrapper Component={LoginComponent}></PageWrapper>;
};

export default Login;
