import { customFetch } from "../utils/helpers";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
interface AccountSignUpBody {
   email: string;
   password: string;
   username: string;
}
interface MyEventsResponse {
   success: boolean;
   message?: string;
   data: IEvent[];
}
export const getMyEvents = () => {
   return customFetch<MyEventsResponse>({
      method: "GET",
      path: "event/myevents",
   });
};
