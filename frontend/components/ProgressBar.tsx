interface ProgressBarProps {
   percentage: number;
   className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
   return (
      <div
         className={`bg-gray-200 rounded  h-1 md:h-1.5  relative w-full ${
            props.className || ""
         }`}
      >
         <div
            className={`bg-primary-400  rounded h-1 md:h-1.5 absolute left-0 top-0 ${
               props.className || 0
            }`}
            style={{
               width: props.percentage + "%",
            }}
         ></div>
      </div>
   );
};

export default ProgressBar;
