interface ProfileSetupHeaderProps {
   icon: JSX.Element;
   text: string;
}

const ProfileSetupHeader: React.FC<ProfileSetupHeaderProps> = ({
   icon,
   text,
}) => {
   return (
      <div className="flex-col gap-6 items-center flex">
         {icon}
         <div className="text-center font-semibold text-3xl">{text}</div>
      </div>
   );
};

export default ProfileSetupHeader;
