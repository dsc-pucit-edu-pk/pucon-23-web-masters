import { customFetch } from "../utils/helpers";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
interface MyEventsResponse {
   success: boolean;
   message?: string;
   data: IEvent[];
}
export const deleteEvent = (eventId: string) => {
   return customFetch<MyEventsResponse>({
      method: "DELETE",
      path: `event/delete/${eventId}/`,
   });
};
