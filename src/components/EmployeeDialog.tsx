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
import { DateTime } from 'luxon';

interface IEmployees {
    id: string,
    employee_pin: string,
    Employee_Username: string,
    employee_icon: string,
    employee_name: string
}


interface IValues {
    username: string,
    pin: string
}

export function EmployeeDialog() {
    // { data, formValues, url }: { data: IEmployees[], formValues: IValues | undefined, url: string }
    // let filteredData
    // if (formValues !== undefined) {
    //     filteredData = data.filter(item => item.Employee_Username === formValues?.username);
    // }
    // if (filteredData !== undefined) {
    //     console.log(filteredData);
    // }
    const nowInPerth = DateTime.now();

    // Check if today is Friday, Saturday, or Sunday
    if (nowInPerth.weekday >= 5) {
        while (nowInPerth.weekday !== 1) {
            nowInPerth.plus({ days: 1 });
        }
    }

    // Format the date
    const formattedDate = nowInPerth.toFormat("EEE MMM dd, yyyy HH:mm 'GMT'ZZZ (z)");



    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Show Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>

                {/* <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle> */}
                <div className="flex flex-col justify-center items-center gap-2 w-full">
                    {/* {
                        filteredData !== undefined &&
                        <div className="relative max-w-48 w-full mx-auto">
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
                    } */}

                    {/* filteredData !== undefined && */}
                    <div className="mt-4 grid grid-cols-3 text-center justify-between w-full items-center gap-2">
                        <div className="p-2 rounded-[5px] border">
                            <h2 className="font-semibold text-xs">{"Yesterday's Shift"}</h2>
                        </div>
                        <div className="p-2 rounded-[5px] border">
                            <h2 className="font-semibold text-sm">{"Today's Shift"}</h2>
                        </div>
                        <div className="p-2 rounded-[5px] border flex flex-col gap-2">
                            <h2 className="font-semibold text-xs">{"Next Shift"}</h2>
                            <Separator />
                            <div>
                                {formattedDate}
                            </div>
                        </div>
                    </div>

                </div>

                <AlertDialogFooter className="sm:justify-center">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
