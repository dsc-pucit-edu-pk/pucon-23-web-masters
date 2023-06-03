import * as React from "react";

import { useRouter } from "next/router";
import { routes } from "../utils/utils";
import { useGlobalContext } from "../contexts/GlobalContext";
import { customFetch } from "../utils/helpers";
import { verifyToken } from "../apis/verifyToken";

interface AuthenticatedRouteProps {
   children: React.ReactNode;
   purpose: IAccountPurpose;
}

const PrivateRoute: React.FC<AuthenticatedRouteProps> = ({
   children,
   purpose,
}) => {
   const [state, dispatch] = useGlobalContext();

   const router = useRouter();

   React.useEffect(() => {
      if (!state.user) {
         if (localStorage.getItem("token") === "true") {
            verifyToken({ purpose }).then((res) => {
               if (res.status === 401) {
                  router.push(routes.login);
                  return;
               }
               if (res.verified) {
                  dispatch({ setState: { user: { purpose } } });
               }
            });
         } else {
            router.push(routes.login);
         }
      }
   }, [state.user, router]);

   if (state.user !== null) {
      return <>{children}</>;
   }
   return null;
};

export default PrivateRoute;
