import moment from "moment";
import { useRouter } from "next/router";
import { deleteEvent } from "../apis/deleteEvent";
import { useGlobalContext } from "../contexts/GlobalContext";
import { joinEvent } from "../apis/joinEvent";
import useSwal from "../hooks/useSwal";
import EventTypeBadge from "./EventTypeBadge";

const EventCard: React.FC<IEvent & { owner?: boolean }> = ({
   owner = true,
   ...props
}) => {
   const router = useRouter();
   const [state, dispatch] = useGlobalContext();
   useSwal();
   const onClickOnDelete = () => {
      deleteEvent(props._id).then((res) => {
         if (res.status === 200) {
            dispatch({
               setState: {
                  swal: {
                     message: "Event Deleted Successully",
                     title: "Success",
                     type: "success",
                  },
               },
            });
            router.reload();
         } else {
            dispatch({
               setState: {
                  swal: {
                     message: res.message || "",
                     title: "Error",
                     type: "error",
                  },
               },
            });
         }
      });
   };
   const onClickOnApply = () => {
      joinEvent(props._id).then((res) => {
         if (res.status === 200) {
            console.log("Success");
            router.reload();
            dispatch({
               setState: {
                  swal: {
                     message:
                        "Applied to the event Successully. Now wait for the owner to accept your application",
                     title: "Success",
                     type: "success",
                  },
               },
            });
         } else {
            dispatch({
               setState: {
                  swal: {
                     message: res.message || "",
                     title: "Error",
                     type: "error",
                  },
               },
            });
         }
      });
   };
   return (
      <div className="flex gap-4 bg-white rounded-2xl p-6 shadow-md w-904 ">
         <img
            src={
               "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvnyV-zewEmsz23VGPzD12DGYVQPPeOVimvA&usqp=CAU"
            }
            className="h-40 w-40 rounded-lg object-cover"
            alt="Poster image"
         ></img>
         <div className="flex flex-col justify-between w-full">
            <div className="gap-3">
               <div className="flex justify-between w-full">
                  <div className="flex gap-1 flex-col">
                     <div className="flex gap-3 items-center">
                        <div className="text-2xl text-gray-900 font-semibold">
                           {props.title}
                        </div>
                        <EventTypeBadge status={props.type}></EventTypeBadge>
                     </div>
                     <div className="text-base text-gray-500">
                        {moment(new Date(props.date)).format("MMM DD YYYY")} (
                        <>
                           {props.startTime} to {props.endTime}
                        </>
                        )
                     </div>
                  </div>
                  <div className="text-base text-gray-500">
                     {props.participants?.length}/{props.maxParticipants}
                  </div>
               </div>
               <div
                  className="text-gray-500 text-sm mt-6"
                  style={{ overflowWrap: "anywhere" }}
               >
                  {props.description}
               </div>
            </div>
            <div className="w-full justify-end flex gap-3 mt-4">
               {owner ? (
                  <>
                     <button
                        onClick={() => router.push(`/my-events/${props._id}`)}
                        className="btn btn-sm btn-primary w-fit text-sm"
                     >
                        View Applications
                     </button>
                     <button className="btn  btn-sm btn-primary w-fit text-sm">
                        Update
                     </button>
                     <button
                        onClick={onClickOnDelete}
                        className="btn btn-outlined btn- btn-sm btn-primary w-fit text-sm"
                     >
                        Delete
                     </button>
                  </>
               ) : (
                  <button
                     onClick={onClickOnApply}
                     className="btn btn-outlined btn- btn-sm btn-primary w-fit text-sm"
                  >
                     Apply
                  </button>
               )}
            </div>
         </div>
      </div>
   );
};

export default EventCard;
