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
import { getSpecificEvent } from "../../apis/getSpecificEvent";
import Loader from "../../components/Loader";
import ApplicationsTable from "../../components/ApplicationsTable";

const MyEvent: React.FC<{ eventId: string }> = (props) => {
   const [state, dispatch] = useGlobalContext();
   const [checked, setChecked] = useState(false);
   const router = useRouter();
   useSwal();

   const [event, setEvent] = useState<IEvent>();
   useEffect(() => {
      if (!event && props.eventId) {
         getSpecificEvent(props.eventId).then((res) => {
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
               setEvent(res.data);
            }
         });
      }
   }, [props.eventId]);
   if (!event) {
      <Loader></Loader>;
   }
   return (
      <>
         <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <LoggedInNavbar selectedItem={1}></LoggedInNavbar>
         <div className="flex flex-col gap-4 px-36 items-center py-14">
            <EventCard {...(event as IEvent)}></EventCard>
            <ApplicationsTable
               applications={event?.participants || []}
               eventId={event?._id as string}
            ></ApplicationsTable>
         </div>
      </>
   );
};

const MyEvents: NextPage = () => {
   const router = useRouter();

   console.log(router.query, "query");
   const [eventId, setEventId] = useState<string>();
   useEffect(() => {
      setEventId(router.query.id as string);
   }, [router.query.id]);
   return (
      <PageWrapper
         Component={<MyEvent eventId={eventId as string}></MyEvent>}
      ></PageWrapper>
   );
};

export default MyEvents;
