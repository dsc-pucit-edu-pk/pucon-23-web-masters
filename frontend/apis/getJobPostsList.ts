import { customFetch } from "../utils/helpers";

export const getJobPostsList = () => {
   return customFetch<{ docs: IJobPostMini[] }>({
      method: "GET",
      path: "job/company",
   });
};
