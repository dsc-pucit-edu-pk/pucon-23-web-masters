import { ColorRing, Audio } from "react-loader-spinner";
import { useGlobalContext } from "../contexts/GlobalContext";
import { colors } from "../utils/helpers";
interface LoaderProps {}

const Loader: React.FC<LoaderProps> = () => {
   const [state, dispatch] = useGlobalContext();
   return state.loading ? (
      <div className="fixed pt-36 top-0 left-0 h-full w-full flex justify-center bg-white z-50">
         <ColorRing
            colors={[
               colors.primary[400],
               colors.primary[400],
               colors.primary[400],
               colors.primary[400],
               colors.primary[400],
            ]}
            height={56}
            width={56}
         ></ColorRing>
      </div>
   ) : null;
};

export default Loader;
