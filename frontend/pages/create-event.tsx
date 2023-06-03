import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { checks, icons } from "../utils/helpers";
import * as React from "react";
import { useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import { useRouter } from "next/router";

import { errors, fileToBase64, routes } from "../utils/utils";
import { useForm } from "../hooks/useForm";
import Input from "../components/Input";
import Loader from "../components/Loader";
import UploadFile from "../components/UploadFile";
import ProfileSetupHeader from "../components/ProfileSetupHeader";
import Select from "../components/Select";
import Textarea from "../components/Textarea";
import DateInput from "../components/DateInput";
import { createEvent } from "../apis/createEvent";
import useSwal from "../hooks/useSwal";
import LoggedInNavbar from "../components/LoggedInNavbar";
export const eventTypes = [
   "sports",
   "music",
   "religion",
   "motivation",
   "concert",
   "politics",
   "competition",
];

const CreateEventContent: React.FC = () => {
   const [state, dispatch] = useGlobalContext();
   const [signupType, setSignupType] = useState("");
   const router = useRouter();
   const [logoUrl, setLogoUrl] = useState("");
   useSwal();
   const { inputsData, onSubmit } = useForm<
      {
         poster: File | null;
         title: string;
         description: string;
         date: string;
         maxParticipants: string;
         type: string;
         startHours: string;
         startMins: string;
         endHours: string;
         endMins: string;
      },
      {}
   >({
      inputs: {
         date: { value: "", checks: [checks.required.string] },
         type: { value: "", checks: [checks.required.string] },
         description: { value: "", checks: [checks.required.string] },
         startHours: { value: "", checks: [checks.required.string] },
         startMins: { value: "", checks: [checks.required.string] },
         endHours: { value: "", checks: [checks.required.string] },
         endMins: { value: "", checks: [checks.required.string] },
         maxParticipants: { value: "", checks: [checks.required.string] },
         poster: { value: null },
         title: { value: "", checks: [checks.required.string] },
      },
   });
   useEffect(() => {
      if (inputsData.poster.value) {
         fileToBase64(inputsData.poster.value as File).then((res) => {
            setLogoUrl(res as string);
         });
      }
   }, [inputsData.poster.value]);

   const onClickOnContinue = async () => {
      const error = onSubmit();
      console.log("Function on click on cont called");
      if (!error) {
         console.log("Enmtered into if");
         const startTime = `${inputsData.startHours.value}:${inputsData.startMins.value}`;
         const endTime = `${inputsData.startHours.value}:${inputsData.startMins.value}`;
         createEvent({
            description: inputsData.description.value,
            date: inputsData.date.value,
            startTime,
            endTime,
            maxParticipants: Number(inputsData.maxParticipants.value),
            participants: [],
            poster: logoUrl,
            title: inputsData.title.value,
            type: inputsData.type.value,
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
               console.log("In selse");
               dispatch({
                  setState: {
                     swal: {
                        message: "Event created successfully",
                        title: "Success",
                        type: "success",
                     },
                  },
               });
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
         <LoggedInNavbar selectedItem={2}></LoggedInNavbar>

         <div className="setup-wrapper md:pb-28 pb-10">
            <Loader></Loader>
            <div className="flex flex-col gap-12 mb-12">
               <ProfileSetupHeader
                  text="Welcome. Lets start creating new event"
                  icon={icons.profileSetup.company}
               ></ProfileSetupHeader>
               <UploadFile {...inputsData.poster}></UploadFile>
            </div>
            <div className="flex flex-col gap-10 mb-12">
               <Input
                  {...inputsData.title}
                  placeholder="Name your event"
               ></Input>
               <Select
                  {...inputsData.type}
                  placeholder="Select"
                  options={eventTypes.map((type) => ({
                     value: type,
                     heading: type,
                  }))}
               ></Select>
               <Textarea
                  label="Description"
                  rightLabel="At least 90 characters"
                  {...inputsData.description}
               ></Textarea>

               <Input
                  {...inputsData.maxParticipants}
                  type="number"
                  placeholder="Max participants"
               ></Input>
               <DateInput {...inputsData.date}></DateInput>
               <Input
                  {...inputsData.startHours}
                  type="number"
                  placeholder="Starting time(hrs)"
               ></Input>
               <Input
                  {...inputsData.startMins}
                  type="number"
                  placeholder="Starting time(mins)"
               ></Input>
               <Input
                  {...inputsData.endHours}
                  type="number"
                  placeholder="Ending time(hrs)"
               ></Input>
               <Input
                  {...inputsData.endMins}
                  type="number"
                  placeholder="End time(mins)"
               ></Input>
            </div>

            <button
               onClick={onClickOnContinue}
               className="btn btn-primary w-full btn-xl"
            >
               Continue
            </button>
         </div>
      </>
   );
};

const CreateEvent: NextPage = () => {
   return <PageWrapper Component={CreateEventContent}></PageWrapper>;
};

export default CreateEvent;
