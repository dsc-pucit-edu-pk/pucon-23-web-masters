import { customFetch } from "../utils/helpers";

interface SignUpResponse {
   success: boolean;
   message?: string;
   token?: string;
}
export const joinEvent = (eventId: string) => {
   return customFetch<SignUpResponse>({
      method: "GET",
      path: `event/join/${eventId}`,
   });
};
