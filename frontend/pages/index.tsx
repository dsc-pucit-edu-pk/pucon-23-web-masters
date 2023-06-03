import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import {
   GlobalContextProvider,
   useGlobalContext,
} from "../contexts/GlobalContext";
import { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/router";
import useSwal from "../hooks/useSwal";
import { useForm } from "../hooks/useForm";
import LoggedInNavbar from "../components/LoggedInNavbar";
import PageWrapper from "../components/PageWrapper";
import Input from "../components/Input";
import InputWithTags from "../components/InputWithTags";
import { eventTypes } from "./create-event";
import { customFetch, icons } from "../utils/helpers";
import { searchEvents } from "../apis/searchEvents";
import { getAllEvents } from "../apis/getAllEvents";
import Loader from "../components/Loader";
import EventCard from "../components/EventCard";

const HomeContent: React.FC = () => {
   const { onSubmit, inputsData, setData, data } = useForm<
      { search: string; types: string[] },
      {}
   >({
      inputs: {
         search: {
            type: "text",
            value: "",
         },
         types: {
            type: "text",
            value: [],
         },
      },
   });
   const [events, setEvents] = useState<IEvent[]>([]);
   const onSearch = () => {
      searchEvents({
         keyword: inputsData.search.value,
         types: inputsData.types.value,
      }).then((res) => {
         setEvents(res.data);
      });
   };
   useEffect(() => {
      getAllEvents().then((res) => {
         setEvents(res.data);
      });
   }, []);
   if (!events) return <Loader></Loader>;
   return (
      <>
         <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <LoggedInNavbar selectedItem={0}></LoggedInNavbar>
         <div className="flex flex-col w-904 mx-auto my-10">
            <div className="flex gap-6 flex-col w-full">
               <Input
                  startIcon={icons.searchInput}
                  placeholder="Search any keyword"
                  {...inputsData.search}
               ></Input>
               <InputWithTags
                  label="Search through tags"
                  placeholder="Start writing the tag here"
                  items={eventTypes}
                  {...inputsData.types}
                  suggestedTags={eventTypes}
               ></InputWithTags>
               <div
                  onClick={onSearch}
                  className="btn btn-primary btn-lg text-base gap-3 mt-8"
               >
                  {icons.searchInput}
                  Apply Filters
               </div>
            </div>
            <div className="flex flex-col gap-4 mt-4">
               {events.length === 0 ? (
                  <div className="text-center text-4xl mt-10 font-semibold">
                     No jobs found
                  </div>
               ) : (
                  events.map((e) => (
                     <EventCard {...e} owner={false}></EventCard>
                  ))
               )}
            </div>
         </div>
      </>
   );
};

const Home: NextPage = () => {
   return <PageWrapper Component={HomeContent}></PageWrapper>;
};

export default Home;
