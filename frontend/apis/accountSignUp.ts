import { customFetch } from "../utils/helpers";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
interface AccountSignUpBody {
   email: string;
   password: string;
   username: string;
}
interface SignUpResponse {
   success: boolean;
   message?: string;
}
export const accountSignUp = (data: AccountSignUpBody) => {
   return customFetch<SignUpResponse>({
      method: "POST",
      path: "auth/register",
      data,
   });
};
