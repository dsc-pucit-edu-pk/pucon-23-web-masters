import Head from "next/head";
import PageWrapper from "../components/PageWrapper";
import CompanyNavbar from "./LoggedInNavbar";
import { icons } from "../utils/helpers";
import JobDetailsSidebarItem from "../components/JobDetailsSidebarItem";
import { useRouter } from "next/router";
import { routes } from "../utils/utils";
import { useEffect, useState } from "react";
import { IApplication, getApplications } from "../apis/getApplications";
import ApplicationCard from "../components/ApplicationCard";
import Input from "./Input";
import Select from "./Select";
import classNames from "classnames";
import Loader from "./Loader";
import { useGlobalContext } from "../contexts/GlobalContext";
import { updateApplication } from "../apis/updateApplication";
import CandidateHiredDialog from "../dialogs/CandidateHiredDialog";
import Checkbox from "./Checkbox";
import { relativeTimeRounding } from "moment";

type JobDetailsRoute = keyof typeof routes.company.jobDetails;
interface JobDetailsPageLayoutProps {
   jobId: string;
   selectedItem: number;
   selectedItemValue?: JobDetailsRoute;
   children?: React.ReactNode;
   hideHeader?: boolean;
   allApplications: IApplication[];
   myApplications: IApplication[];
   reloadApplications: () => void;
}

const JobDetailsPageLayout: React.FC<JobDetailsPageLayoutProps> = (props) => {
   const router = useRouter();
   const [searchValue, setSearchValue] = useState("");

   const [selectedApplicatoins, setSelectedApplications] = useState<
      Set<string>
   >(new Set());
   const [selectAllValue, setSelectAllValue] = useState(false);
   const [state, dispatch] = useGlobalContext();

   const handleApplicationSelect = (id: string, value: boolean) => {
      const newSelected = new Set(selectedApplicatoins);
      if (!value) {
         newSelected.delete(id);
      } else {
         newSelected.add(id);
      }
      setSelectedApplications(newSelected);
   };
   const handleSelectAllChange = (val: boolean) => {
      if (val) {
         const newSet = new Set([...props.myApplications.map((x) => x._id)]);
         setSelectedApplications(newSet);
      } else {
         setSelectedApplications(new Set());
      }
      setSelectAllValue(val);
   };
   const onClickOnHire = () => {
      dispatch({ setState: { loading: true } });
      updateApplication(props.jobId, {
         type: "HIRE",
         applicationIDs: Array.from(selectedApplicatoins),
      }).then(() => {
         setTimeout(() => {
            dispatch({
               setState: { loading: false, dialog: CandidateHiredDialog },
            });
            setSelectAllValue(false);
            setSelectedApplications(new Set());
            props.reloadApplications();
         }, 1000);
      });
   };
   const onClickOnShortList = () => {
      dispatch({ setState: { loading: true } });
      updateApplication(props.jobId, {
         type: "SHORTLIST",
         applicationIDs: Array.from(selectedApplicatoins),
      }).then(() => {
         setTimeout(() => {
            dispatch({ setState: { loading: false } });
            setSelectAllValue(false);
            setSelectedApplications(new Set());
            props.reloadApplications();
         }, 1000);
      });
   };

   return (
      <>
         <Loader></Loader>
         <div
            className={classNames(
               "flex flex-col w-full items-start py-6 px-4 md:p-8 gap-4 border-b border-gray-200",
               {
                  hidden: props.hideHeader,
                  "md:flex": true,
               }
            )}
         >
            <button className="btn btn-md btn-gray btn-link flex gap-2 w-fit px-0">
               {icons.arrowLeft}
               Back to dashboard
            </button>
            <div className="flex gap-4 md:gap-0 md:justify-between md:items-center md:flex-row w-full flex-col">
               <div className="font-semibold text-3xl text-gray-900">Title</div>
               <Input
                  className="md:w-fit w-full"
                  onChange={setSearchValue}
                  value={searchValue}
                  startIcon={icons.searchInput}
                  placeholder="Search for applicants by name"
               />
            </div>
         </div>
         <div className="grid grid-rows-[auto] h-full md:grid md:grid-cols-[17.5rem_auto] w-full overflow-auto">
            <div className="md:flex flex-col w-full p-4 hidden">
               <JobDetailsSidebarItem
                  text="Overview"
                  onClick={() =>
                     router.push(
                        routes.company.jobDetails.base(
                           router.query.id as string
                        )
                     )
                  }
                  selected={props.selectedItem === 0}
               ></JobDetailsSidebarItem>
               <JobDetailsSidebarItem
                  text="Applications received"
                  badgeNumber={
                     props.allApplications.filter(
                        (x) => x.status === "UNDER_REVIEW"
                     ).length
                  }
                  onClick={() =>
                     router.push(
                        routes.company.jobDetails.applications(
                           router.query.id as string
                        )
                     )
                  }
                  selected={props.selectedItem === 1}
               ></JobDetailsSidebarItem>
               <JobDetailsSidebarItem
                  text="Shortlisted"
                  badgeNumber={
                     props.allApplications.filter(
                        (x) => x.status === "SHORTLISTED"
                     ).length
                  }
                  onClick={() =>
                     router.push(
                        routes.company.jobDetails.applications(
                           router.query.id as string
                        )
                     )
                  }
                  selected={props.selectedItem === 2}
               ></JobDetailsSidebarItem>
               <JobDetailsSidebarItem
                  text="Hired"
                  badgeNumber={
                     props.allApplications.filter(
                        (x) => x.status === "UNDER_EVALUATION"
                     ).length
                  }
                  onClick={() =>
                     router.push(
                        routes.company.jobDetails.applications(
                           router.query.id as string
                        )
                     )
                  }
                  selected={props.selectedItem === 3}
               ></JobDetailsSidebarItem>
               <JobDetailsSidebarItem
                  text="Not interested"
                  badgeNumber={
                     props.myApplications.filter((x) => x.status === "REJECTED")
                        .length
                  }
                  onClick={() =>
                     router.push(
                        routes.company.jobDetails.applications(
                           router.query.id as string
                        )
                     )
                  }
                  selected={props.selectedItem === 4}
               ></JobDetailsSidebarItem>
               <div className="border-t border-gray-200 w-full"></div>
               <JobDetailsSidebarItem
                  text="Assignments"
                  badgeNumber={10}
                  onClick={() =>
                     router.push(
                        routes.company.jobDetails.applications(
                           router.query.id as string
                        )
                     )
                  }
                  selected={props.selectedItem === 5}
               ></JobDetailsSidebarItem>
               <JobDetailsSidebarItem
                  text="Chat messages"
                  badgeNumber={10}
                  onClick={() =>
                     router.push(
                        routes.company.jobDetails.applications(
                           router.query.id as string
                        )
                     )
                  }
                  selected={props.selectedItem === 5}
               ></JobDetailsSidebarItem>
            </div>
            <div className="bg-gray-100 overflow-auto">
               <div
                  className={classNames(
                     "flex md:sticky flex-col md:px-28 md:h-17 justify-center md:justify-start gap-3 md:gap-8 py-6 px-4 md:py-0 bg-white top-0 w-full left-0 z-20 border-b border-gray-200 md:flex-row",
                     {
                        hidden: selectedApplicatoins.size === 0,
                        "md:flex": true,
                     }
                  )}
               >
                  <Checkbox
                     label="Select All"
                     onChange={handleSelectAllChange}
                     value={selectAllValue}
                  ></Checkbox>
                  <div
                     className={classNames(
                        "flex flex-col gap-3 md:flex-row md:items-center",
                        {
                           "md:hidden": selectedApplicatoins.size === 0,
                        }
                     )}
                  >
                     <button
                        className="btn btn-outlined btn-gray btn-sm "
                        onClick={onClickOnHire}
                     >
                        Hire
                     </button>
                     <div className="grid grid-cols-2 gap-3 md:flex whitespace-nowrap">
                        <button className="btn btn-outlined btn-gray btn-sm">
                           Message
                        </button>
                        <button className="btn btn-outlined btn-gray btn-sm">
                           Send Assignment
                        </button>
                        <button
                           className="btn btn-outlined btn-gray btn-sm"
                           onClick={onClickOnShortList}
                        >
                           Shortlist
                        </button>
                        <button className="btn btn-outlined btn-gray btn-sm">
                           Not interested
                        </button>
                     </div>
                  </div>
               </div>
               <div className="flex flex-col items-center justify-center gap-2 md:gap-8 p-4 pb-24 md:pb-14 md:pt-10 md:px-28 md:overflow-auto">
                  {props.myApplications
                     .filter((x) => x.status === "UNDER_REVIEW")
                     .map((app) => (
                        <>
                           <ApplicationCard
                              jobId={props.jobId}
                              selected={selectedApplicatoins.has(app._id)}
                              onChange={(val) =>
                                 handleApplicationSelect(app._id, val)
                              }
                              application={app}
                              isAnySelected={selectedApplicatoins.size !== 0}
                           ></ApplicationCard>
                        </>
                     ))}
               </div>
            </div>
            <div className="gap-2 md:hidden p-4 bg-white border-t border-gray-200 fixed bottom-0 left-0 w-full">
               <Select<JobDetailsRoute>
                  placeholder="Select"
                  options={[
                     { value: "base", heading: "Overview" },
                     {
                        value: "applications",
                        heading: "Applications Recieved",
                     },
                     { value: "shortlisted", heading: "Shortlisted" },
                     { value: "hired", heading: "Hired" },
                     { value: "notInterested", heading: "Not interested" },
                     { value: "assignments", heading: "Assignments" },
                     { value: "chat", heading: "Chat messages" },
                  ]}
                  onChange={() => {}}
                  value={props.selectedItemValue || "base"}
                  openOnTop
                  menuClassName="w-screen top-0 shadow-none rounded-none pb-0.5"
                  relativeParent={false}
               ></Select>
            </div>
         </div>
      </>
   );
};

export default JobDetailsPageLayout;
