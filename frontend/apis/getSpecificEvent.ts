import { customFetch } from "../utils/helpers";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
interface SpecificEventIdResponse {
   success: boolean;
   message?: string;
   data: IEvent;
}
export const getSpecificEvent = (eventId: string) => {
   return customFetch<SpecificEventIdResponse>({
      method: "GET",
      path: `event/specific/${eventId}`,
   });
};
