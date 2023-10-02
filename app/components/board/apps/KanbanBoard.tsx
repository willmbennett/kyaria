import { useState } from "react";
import AppItem from "./AppItem";

export default function Kanban(
    {
        jobApps,
        jobStates
    }: {
        jobApps: any,
        jobStates: string[]
    }) {

    return (
        <>
            <div className="box-border w-full mt-4 overflow-scroll rounded-xl bg-slate-100">
                <div className="box-border inline-flex min-h-screen overflow-scroll p-4">
                    {jobStates.map((state: string) => {
                        const activeApps = jobApps.filter((app: any) => app.state == state && app.active);
                        const inActiveApps = jobApps.filter((app: any) => app.state == state && !app.active);
                        const [showInactive, setShowInactive] = useState(false);

                        const toggleInactive = () => {
                            setShowInactive(!showInactive);
                        };
                        return (
                            <div className="w-80 rounded-xl bg-white mx-2 text-center items-center p-2" key={state}>
                                <h5 className="text-xl font-medium leading-tight py-2">
                                    {state}
                                </h5>
                                <div className="flex flex-row w-full">
                                    <div className="text-center w-1/2">
                                        <h5 className="text-xl font-medium leading-tight py-2 text-green-300">
                                            Active: {activeApps.length}
                                        </h5>
                                    </div>
                                    <div className="text-center w-1/2 ">
                                        <h5 className="text-xl font-medium leading-tight py-2 text-red-300">
                                            Inactive: {inActiveApps.length}
                                        </h5>
                                    </div>
                                </div>
                                {activeApps && activeApps.map((app: any) => (
                                    <div key={app._id} className="w-full">
                                        <AppItem
                                            app={app}
                                            jobStates={jobStates}
                                        />
                                    </div>
                                ))}
                                {inActiveApps.length > 0 && (<>
                                    <h5 className="text-xl font-medium leading-tight py-2">
                                        Inactive Apps
                                    </h5>
                                    <button
                                        className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                                        onClick={toggleInactive}
                                    > Show Inactive
                                        <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    {showInactive && inActiveApps.map((app: any) => (
                                        <div key={app._id} className="w-full">
                                            <AppItem
                                                app={app}
                                                jobStates={jobStates}
                                            />
                                        </div>
                                    ))}
                                </>)}
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
}