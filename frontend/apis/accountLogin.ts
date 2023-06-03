import { customFetch } from "../utils/helpers";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
interface AccountLoginBody {
   email: string;
   password: string;
}
interface SignUpResponse {
   success: boolean;
   message?: string;
   token?: string;
}
export const accountLogin = (data: AccountLoginBody) => {
   return customFetch<SignUpResponse>({
      method: "POST",
      path: "auth/login",
      data,
   });
};
