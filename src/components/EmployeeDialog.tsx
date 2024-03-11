
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Separator } from "./ui/separator";
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { RxAvatar } from "react-icons/rx";
import { MdOutlineAccessTime, MdOutlineCalendarToday } from "react-icons/md";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { getEmployeeClocks, verifyPin } from '@/lib/directus'
import { IEmployees, ClockData } from '@/app/types'
import TimeInButton from "./TimeInButton";

interface IValues {
    username: string,
    pin: string
}

export function EmployeeDialog({
    data,
    formValues,
    url,
    children,
    clocks
}: {
    children: React.ReactNode,
    data: IEmployees[],
    formValues: IValues | undefined,
    url: string,
    clocks: ClockData[]
}) {

    const filteredData = data.filter(item => item.Employee_Username === formValues?.username);
    const userLogs = clocks.filter(item => item.Clock_User === filteredData[0]?.id)

    // let userLogs
    // if (formValues !== undefined && filteredData !== undefined && f) {
    //     filteredData = data.filter(item => item.Employee_Username === formValues?.username);
    //     userLogs = clocks.filter(item => item.Clock_User === filteredData[0]?.id)
    // }

    // console.log(userLogs);


    const currentDate = new Date();

    // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const currentDayOfWeek = currentDate.getDay();

    // Calculate the number of days to add to reach the next Monday
    let daysToAdd;
    if (currentDayOfWeek >= 5) { // Friday, Saturday, or Sunday
        daysToAdd = 8 - currentDayOfWeek; // 8 - 5 = 3 (for Friday), 8 - 6 = 2 (for Saturday), 8 - 0 = 1 (for Sunday)
    } else {
        daysToAdd = 1; // Add 1 day to reach the next day
    }

    // Create a new date object with the date set to the next Monday or the next day
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + daysToAdd);

    // Format the next date as desired (optional)
    const formattedNextDate = nextDate.toDateString();
    const formattedCurrentDate = currentDate.toDateString();

    let isWorkingDay = true

    const dayOfWeek = currentDate.getDay();

    if (dayOfWeek === 6 || dayOfWeek === 0) {
        isWorkingDay = false
    }

    let lastlogDate
    let lastlogOut
    if (userLogs.length > 0) {
        lastlogDate = new Date(userLogs[0].Clock_In_Timestamp)
        lastlogOut = new Date(userLogs[0].Clock_Out_Timestamp)
    }

    function time(data: Date | undefined) {
        if (data) {
            let hours = data.getHours();
            const minutes = data.getMinutes();
            const amOrPm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            const formattedTime = hours.toString().padStart(2, '0') + ':' +
                minutes.toString().padStart(2, '0') + ':' +
                amOrPm;
            return formattedTime
        }
        return "--:-- --"

    }


    const formattedTimeIn = time(lastlogDate)
    const formattedTimeOut = time(lastlogOut)


    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {
                    children
                }
            </AlertDialogTrigger>
            {
                filteredData.length > 0 &&
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>

                            <p>
                                {
                                    filteredData[0].Clock_Status ? 'Time Out now' : 'Time In today?'
                                }
                            </p>


                        </AlertDialogTitle>
                    </AlertDialogHeader>

                    <div className="flex flex-col justify-center items-center gap-2 w-full">
                        {
                            filteredData !== undefined &&
                            <div className="relative max-w-48 w-full mx-auto mb-2">
                                <Image
                                    src={url + "/assets/" + filteredData[0].employee_icon}
                                    alt="avatar"
                                    width={200}
                                    height={200}
                                    className="rounded-full h-[100px] w-[100px] object-cover mx-auto"
                                />
                                <p className="absolute w-fit -bottom-4 inset-x-0 mx-auto bg-white border-2 flex gap-2 items-center px-2 py-1 rounded-xl">
                                    <RxAvatar size={20} />
                                    <span className="text-xs text-nowrap">{"G'day"}, {filteredData[0].employee_name}</span>
                                </p>
                            </div>
                        }

                        {/* filteredData !== undefined && */}
                        <div className="mt-4 grid grid-cols-3 text-center justify-between w-full items-center gap-2">
                            <div className="p-2 rounded-[5px] border flex flex-col gap-2 h-full">
                                <h2 className="font-semibold text-xs">Recent Activity</h2>
                                <Separator />
                                <div className="text-start">
                                    <div className="text-xs flex items-center gap-1"><MdOutlineCalendarToday /> <p>{lastlogDate ? lastlogDate.toDateString() : "-------"}</p></div>
                                    <div className="text-xs flex items-center gap-1"><IoIosLogIn /> TimeIn: {userLogs ? formattedTimeIn : "--:-- --"}</div>
                                    <div className="text-xs flex items-center gap-1"><IoIosLogOut /> Timeout: {userLogs ? formattedTimeOut : "--:-- --"}</div>
                                </div>
                            </div>
                            <div className="p-2 rounded-[5px] border flex flex-col gap-2 h-full">
                                <h2 className="font-semibold text-sm">{"Today's Shift"}</h2>
                                <Separator />
                                {
                                    isWorkingDay &&
                                    <>
                                        <div className="text-start">
                                            <div className="text-xs flex items-center gap-1"><MdOutlineCalendarToday />
                                                <p>
                                                    {formattedCurrentDate}
                                                </p>
                                            </div>
                                            <div className="text-xs flex items-center gap-1"><MdOutlineAccessTime /> <p>06:00 to 03:00, AWST UTC+8</p></div>
                                        </div>
                                        <div className="text-start">

                                            <div className="text-xs flex items-center gap-1"><IoIosLogIn /> TimeIn: </div>
                                            <div className="text-xs flex items-center gap-1"><IoIosLogOut /> Timeout: </div>
                                        </div>
                                    </>
                                }
                                {
                                    !isWorkingDay &&
                                    <div className="text-start">
                                        <p className="text-xs">
                                            Are you sure you want to work today??
                                        </p>
                                    </div>
                                }


                            </div>
                            <div className="p-2 rounded-[5px] border flex flex-col gap-2 h-full">
                                <h2 className="font-semibold text-xs">{"Next Shift"}</h2>
                                <Separator />
                                <div className="text-start">
                                    <div className="text-xs flex items-center gap-1"><MdOutlineCalendarToday /> <p>{formattedNextDate}</p></div>
                                    <div className="text-xs flex items-center gap-1"><MdOutlineAccessTime /> <p>06:00 to 03:00, AWST UTC+8</p></div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <AlertDialogFooter className="sm:justify-center">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <TimeInButton id={filteredData[0].id} />
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            }
        </AlertDialog>
    )
}
