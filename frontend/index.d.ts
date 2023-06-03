interface IDropdownItem {
   text: string;
   icon?: JSX.Element;
   onClick: () => void;
}
interface INavbarItem {
   text: string;
   url?: string;
   icon: JSX.Element;
   subItems?: INavbarSubItem[];
   badge?: string;
   selected?: boolean;
}

type NamesObjectDefault = { [k in string]: IInputValue };

interface INavbarSubItem {
   text: string;
   url: string;
}

interface CustomFetchProps {
   data?: any;
   method: "GET" | "POST" | "PUT" | "DELETE";
   path: string;
}
type InputStateType = "error" | "warn" | "primary";
interface InputState {
   text: string;
   type: InputStateType;
}

interface InputCheck<Value extends IInputValue> {
   cond: (value?: Value) => boolean;
   state: InputState;
}
type InputType =
   | "number"
   | "text"
   | "select"
   | "checkbox"
   | "multiple-checkbox"
   | "password"
   | "radio";

interface IInput<Value extends IInputValue> {
   type?: InputType;
   state?: InputState;
   value?: Value;
   checks?: InputCheck<Value>[];
}

interface ErrorObject {
   statusCode: number;
   message: string;
   error: string;
}

type IInputValue =
   | string
   | boolean
   | string[]
   | (File | null)
   | ILanguage[]
   | IExam[]
   | IOtherExam[]
   | IWork[];
type Test = {
   email: string;
   password: string;
   rememberMe: boolean;
   works: string[];
};

type X = UseFormProps<Test>;

type UseFormProps<NamesObject extends NamesObjectDefault> = {
   [k in keyof NamesObject]: IInput<NamesObject[k]>;
};
type PartialFormProps<NamesObject extends NamesObjectDefault> = Partial<
   UseFormProps<NamesObject>
>;
type CreateStateObject<NamesObject extends NamesObjectDefault> = {
   [k in keyof Names]: InputState;
};

type GetArrayType<ArrType> = ArrType extends readonly (infer ElementType)[]
   ? ElementType
   : never;

type CreateFormObject<NamesObject extends NamesObjectDefault> = {
   [k in keyof NamesObject]: {
      setState: (val: InputState) => void;
      updateItem: (index: number, val: GetArrayType<NamesObject[k]>) => void;
      addItem: (val: GetArrayType<NamesObject[k]>) => void;
      onChange: (val: NamesObject[k]) => void;
      removeItem: (index: number) => void;
      value: NamesObject[k];
      state: InputState;
   };
};
type T = CreateFormObject<{
   email: string;
   password: string;
   rememberMe: boolean;
   jobs: string[];
}>;

// type ValueObject<NamesObject extends NamesObjectDefault> = {
//    [k in keyof NamesObject]: IInput<NamesObject[k]>;
// };

type IExperience = ValueObject<
   "compName" | "startDate" | "endDate" | "description" | "role"
>;
type IDegree = ValueObject<
   "currentStudying" | "degree" | "stream" | "college" | "yearOfGrad" | "marks"
>;
type IUPSCAttempt = ValueObject<
   | "yearOfAttempt"
   | "qualifiedForMains"
   | "qualifiedForInterview"
   | "optSubject"
   | "language"
>;

type StatePCNames =
   | "yearOfAttempt"
   | "qualifiedForMains"
   | "qualifiedForInterview"
   | "optSubject"
   | "language"
   | "state";

// type OtherExamNames = "title" | "yearOfAttempt" | "description";
// type IOtherExam = ValueObject<OtherExamNames>;

type IStatePCAttempt = ValueObject<StatePCNames>;

interface LoginResponse {
   access_token: string;
}
interface;

type TestId =
   | "input_email"
   | "input_password"
   | "btn_sign-in"
   | "signin-hire-talent"
   | "signin-apply-for-job"
   | "signin-get-started"
   | "signin-login-link"
   | `signup-${SignUpTestId}`;

type SignUpTestId =
   | "firstname"
   | "lastname"
   | "phone"
   | "email"
   | "password"
   | "submit";

type CompanyProfileSetupTestId =
   | "name"
   | "type"
   | "description"
   | "url"
   | "address"
   | "city"
   | "state"
   | "pincode"
   | "verify-checkbox"
   | "understand-checkbox";
declare global {
   namespace Cypress {
      interface Chainable {
         state(state: any): any;
      }
   }
}

interface ILanguage {
   language: string;
   proficiency: string;
}
type IExam = {
   state: string;
   yearOfAttempt: string;
   qualifiedForMains: boolean;
   qualifiedForInterview: boolean;
   optSubject: string;
   language: string;
};

type IOtherExam = {
   title: string;
   yearOfAttempt: string;
   description: string;
};

type IGrad = {
   type: string;
   status: string;
   college: string;
   degree: string;
   yearOfPassing: string;
   marks: string;
   totalCgpa: string;
   stream: string;
};

type IWorkMini = {
   compName: string;
   role: string;
   description: string;
   currentlyWorking: boolean;
   startDate: string;
   endDate: string;
};

type IWork = {
   compName: string;
   role: string;
   description: string;
   currentlyWorking: boolean;
   startMonth: string;
   startYear: string;
   endMonth: string;
   endYear: string;
   state: string;
   location: string;
};

interface ISelectOption<Name extends string = string> {
   heading?: string;
   text?: string;
   value: Name;
   badge?: string;
}

interface cy {
   state: State;
}

type IAccountPurpose = "CANDIDATE" | "COMPANY";
type IJobLocation = "OFFICE" | "REMOTE" | "FLEXIBLE" | "";
type IStipendType = "FIXED" | "NEGOTIABLE" | "FREELACE_BASED" | "";
type IJobDuration = "FT" | "PT" | "FR" | "";
type IJobQualification = "INTERVIEW" | "MAIN" | "NONE" | "";
type IJobExperience = "NONE" | "1" | "2" | "3" | "";
type IJobApplication = {
   opportunityType: "Academic" | "Other" | "";
   position: string;
   description: string;
   exam: string;
   subjects: string[];
   workLanguage: string[];
   locationType: IJobLocation;
   city: string;
   state: string;
   stipendType: IStipendType;
   stipend: string;
   maxStipend: string;
   stipendPeriod: string;
   skillSets: string[];
   noOfMainsAttempted: string;
   workExp: IJobExperience;
   minQualification: IJobQualification;
   openings: string;
   perks: string[];
   deadline: string;
   isCoverLetterRequired: boolean;
   questions: string[];
   status: string;
   minMainAttempts: string;
   timeAvail: IJobDuration;
};

interface ICompanyDetails {
   _id: string;
   email: string;
   onboardingState: string;
   jobPostings: any[];
   __v: number;
   address: {
      firstLine: string;
      secondLine: string;
      landmark: string;
      city: string;
      state: string;
      pincode: string;
      _id: string;
   };
   name: {
      firstName: string;
      lastName: string;
      _id: string;
   };
   phoneNum: string;
   url: string;
   description: string;
   logo: string;
   organisationName: string;
   socialLinks: string[];
   type: string;
   updatedAt: string;
}
type IJobStatus = "UNDER_REVIEW" | "HOLD" | "OPEN" | "CLOSED";
type IApplicationStatus =
   | "UNDER_REVIEW"
   | "HIRED"
   | "REJECTED"
   | "UNDER_EVALUATION"
   | "SHORTLISTED";
interface IJobPostMini {
   _id: string;
   position: string;
   status: IJobStatus;
   createdAt: string;
   applications: number;
}

type EventType =
   | "sports"
   | "music"
   | "religion"
   | "motivation"
   | "concert"
   | "politics"
   | "competition";

interface IParticipant {
   user: string;
   status: string;
}
interface IEvent {
   _id: string;
   title: string;
   description: string;
   date: string;
   poster: string;
   startTime: string;
   endTime: string;
   maxParticipants: number;
   type: EventType;
   participants: IParticipant[];
}
