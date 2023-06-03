import { customFetch } from "../utils/helpers";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
interface Response {
   data: IEvent[];
}

export const getAllEvents = () => {
   return customFetch<Response>({
      method: "GET",
      path: "event/all",
   });
};
