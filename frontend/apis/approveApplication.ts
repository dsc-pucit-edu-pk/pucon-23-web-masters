import { customFetch } from "../utils/helpers";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
interface AccountLoginBody {
   userId: string;
   eventId: string;
}
interface ApproveApplicationResponse {
   success: boolean;
   message?: string;
}
export const approveApplication = (data: AccountLoginBody) => {
   return customFetch<ApproveApplicationResponse>({
      method: "POST",
      path: "event/confirm",
      data,
   });
};
