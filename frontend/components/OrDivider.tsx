interface OrDividerProps {}

const OrDivider: React.FC<OrDividerProps> = () => {
   return (
      <div className="gap-2 flex items-center my-6">
         <hr className="bg-gray-200 w-full"></hr>
         <div className="text-gray-600 text-sm">OR</div>
         <hr className="bg-gray-200 w-full"></hr>
      </div>
   );
};

export default OrDivider;
