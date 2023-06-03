import { customFetch } from "../utils/helpers";

interface VerifyTokenBody {
   purpose: IAccountPurpose;
}
export const verifyToken = (data: VerifyTokenBody) => {
   return customFetch<{ verified: boolean }>({
      method: "POST",
      path: "account/verify-token",
      data,
   });
};
