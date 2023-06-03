import { customFetch } from "../utils/helpers";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

interface CreateEventBody {
   title: string;
   description: string;
   date: string;
   poster: string;
   startTime: string;
   endTime: string;
   maxParticipants: number;
   type: string;
   participants: { user: string; status: string }[];
}
interface Response {
   success: boolean;
   message?: string;
   token?: string;
}
export const createEvent = (data: CreateEventBody) => {
   return customFetch<Response>({
      method: "POST",
      path: "event/create",
      data,
   });
};
