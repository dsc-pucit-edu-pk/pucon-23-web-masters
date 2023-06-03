import moment from "moment";

export const errors = {
   requiredField: "Please fill this field!",
   wrongCredentials: "Wrong email or password",
   weakPassword: "Minimum 8 characters with at least one uppercase character",
   userAlreadyExist: "User already exists !",
   atleast90: "The description should be at least 90 characters long",
};

export const routes = {
   login: "/auth/login",
   home: "/",
   myEvents: "/my-events",
   createEvent: "/create-event",
   signup: {
      base: "/auth/signup",
   },
} as const;

export const fileToBase64 = (
   file: File
): Promise<string | ArrayBuffer | null> => {
   const reader = new FileReader();
   reader.readAsDataURL(file);
   return new Promise((res, rej) => {
      reader.onload = () => {
         res(reader.result);
      };
   });
};

export const getDurationStringForWork = (work: IWorkMini) => {
   const start = new Date(work.startDate);
   const end = work.currentlyWorking ? new Date() : new Date(work.startDate);
   return getDurationString(start, end);
};

export const getDurationString = (startDate: Date, endDate: Date): string => {
   const start = moment(new Date(startDate));
   const end = moment(new Date(endDate));
   const diff = moment.duration(end.diff(start));
   const seconds = diff.asSeconds();
   const mins = diff.asMinutes();
   const hours = diff.asHours();
   const days = diff.asDays();
   const months = diff.asMonths();
   const years = diff.asYears();

   let res = `${Math.floor(seconds)} second${
      Math.floor(seconds) > 1 ? "s" : ""
   }`;

   if (seconds >= 60) {
      res = `${Math.floor(mins)} minute${Math.floor(mins) > 1 ? "s" : ""}`;
   }
   if (mins >= 60) {
      res = `${Math.floor(hours)} hour${Math.floor(hours) > 1 ? "s" : ""}`;
   }
   if (hours >= 24) {
      res = `${Math.floor(days)} day${Math.floor(days) > 1 ? "s" : ""}`;
   }
   if (days >= 30) {
      res = `${Math.floor(months)} month${Math.floor(months) > 1 ? "s" : ""}`;
   }
   if (months >= 12) {
      res = `${Math.floor(years)} year${Math.floor(years) > 1 ? "s" : ""}`;
   }

   return res;
};

export const turncateStringByWords = (str: string, len: number) => {
   const words = str.split(" ");
   let res = "";
   while (words.length && res.length + words[0].length < len) {
      res += " " + words.shift();
   }
   return res;
};
