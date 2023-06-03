import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import {
   GlobalContextProvider,
   useGlobalContext,
} from "../../contexts/GlobalContext";
import { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/router";
import useSwal from "../../hooks/useSwal";
import { useForm } from "../../hooks/useForm";
import LoggedInNavbar from "../../components/LoggedInNavbar";
import PageWrapper from "../../components/PageWrapper";
import EventCard from "../../components/EventCard";
import { getMyEvents } from "../../apis/getMyEvents";
import { routes } from "../../utils/utils";

const MyEventsContent: React.FC = () => {
   const [state, dispatch] = useGlobalContext();
   const [checked, setChecked] = useState(false);
   const router = useRouter();
   useSwal();
   const [file, setFile] = useState<File | null>(null);
   const [events, setEvents] = useState<IEvent[]>([]);

   useEffect(() => {
      if (events.length === 0) {
         dispatch({ setState: { loading: true } });

         getMyEvents().then((res) => {
            if (res.status !== 200) {
               console.log(res, "response");
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
               setEvents(res.data);
            }
         });
      }
   }, []);
   return (
      <>
         <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <LoggedInNavbar selectedItem={1}></LoggedInNavbar>
         <div className="flex flex-col gap-4 px-36 items-center py-14">
            {events.length === 0 ? (
               <div className="flex flex-col gap-10 items-center text-center justify-center">
                  <div className="text-3xl font-semibold">
                     You haven't posted any events yet.{" "}
                  </div>
                  <div className="flex flex-col gap-3">
                     <div>Want to post a new one?</div>
                     <button
                        onClick={() => router.push(routes.createEvent)}
                        className="btn btn-primary btn-lg"
                     >
                        Create new event
                     </button>
                  </div>
               </div>
            ) : (
               events.map((event) => <EventCard {...event}></EventCard>)
            )}
         </div>
      </>
   );
};

const MyEvents: NextPage = () => {
   return <PageWrapper Component={MyEventsContent}></PageWrapper>;
};

export default MyEvents;
