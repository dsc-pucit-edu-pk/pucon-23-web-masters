import classNames from "classnames";
import OtpInput from "react-otp-input";

interface CustomOTPInputProps {
   value: string;
   onChange: (val: string) => void;
   errorState?: boolean;
}

const CustomOTPInput: React.FC<CustomOTPInputProps> = ({
   value,
   onChange,
   errorState,
}) => {
   return (
      <OtpInput
         value={value}
         numInputs={4}
         onChange={(val: string) => onChange(val)}
         className={classNames(`otp-input gap-2`, {
            ["filled-" + value.length]: true,
            "error-state": Boolean(errorState),
         })}
         placeholder="0000"
         containerStyle={{ gap: "0.5rem" }}
         inputStyle={{ border: "1px solid black" }}
      ></OtpInput>
   );
};

export default CustomOTPInput;
