import { useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import Swal from "sweetalert2";

export default function useSwal() {
   const [state, dispatch] = useGlobalContext();
   useEffect(() => {
      if (state.swal) {
         Swal.fire({
            title: state.swal.title || "",
            text: state.swal.message,
            icon: state.swal.type,
            confirmButtonText: "Ok",
         }).then(() => {
            dispatch({
               setState: { swal: undefined },
            });
         });
      }
   }, [state.swal]);
}
