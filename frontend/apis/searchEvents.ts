import { customFetch } from "../utils/helpers";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
interface Response {
   data: IEvent[];
}
interface SearchEventBody {
   keyword?: string;
   types?: string[];
}

export const searchEvents = (data: SearchEventBody) => {
   return customFetch<Response>({
      method: "POST",
      path: "event/search",
      data,
   });
};
