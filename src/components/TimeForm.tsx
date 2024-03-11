'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Time from "./Time"
import { Separator } from "./ui/separator"
import { verifyPin } from '@/lib/directus'
import { timeUpdate } from "@/lib/server"
import { useEffect, useState } from "react"
import { EmployeeDialog } from "./EmployeeDialog"
import { ClockData, IEmployees } from '@/app/types'

interface IData {
    data: IEmployees
}

interface IValues {
    username: string,
    pin: string
}


//form data is an object with fields
const formSchema = z.object({
    username: z.string().min(1, {
        message: "Required",
    }),
    pin: z.string().min(3, { message: "Required" }),

})

//hashing
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const secretKey = "zanda";
const key = new TextEncoder().encode(secretKey);

export default function TimeForm({ data, url, clocks }: { data: IEmployees[], url: string, clocks: ClockData[] }) {

    const [employ, setEmploy] = useState<IValues>()
    const [userFound, setUserFound] = useState(true)

    const employees = data
    const api = url
    const clock = clocks

    //type safety, useForm is of generic function need to pass a type
    //map all fields and type to infer base on schema
    //since hookform and zod is not related resolver will get the schema and pass it to form
    //revalidate the data every data change
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            pin: "",
        }
    })

    const user = form.watch('username');
    const pinChecks = form.watch('pin');
    let filteredData

    useEffect(() => {
        function uservalidation() {
            filteredData = data.filter(item => item.Employee_Username === user);
            if (filteredData.length > 0) {
                const pinHash = bcrypt.compareSync(pinChecks, filteredData[0].bcrypt);
                if (pinHash) {
                    setUserFound(false)
                } else {
                    setUserFound(true)
                }
            } else {
                setUserFound(true)
            }
        }
        uservalidation()
    }, [user, pinChecks])

    // const toHash = '1234'
    // const hashed = bcrypt.hashSync(toHash, salt);
    // console.log(hashed);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        form.reset()
        setUserFound(true)
        setEmploy(values)
    }

    return (
        <>

            <main className='max-w-[305px] w-full mx-auto flex flex-col gap-5'>
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-semibold tracking-tight text-center">Time IN/OUT</h1>
                    <Time />
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2'>

                        <FormField control={form.control} name="username" render={({ field }) => {
                            return <FormItem>


                                {/* form control set the appropriate aria-label when there's an error message */}

                                <FormControl>
                                    <Input
                                        placeholder='Enter your username'
                                        type='text'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }} />

                        <FormField control={form.control} name="pin" render={({ field }) => {
                            return <FormItem>


                                {/* form control set the appropriate aria-label when there's an error message */}

                                <FormControl>
                                    <Input
                                        placeholder='Enter your pin'
                                        type='password'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }} />

                        {/* <FormField control={form.control} name="pinConfirm" render={({ field }) => {
                        return <FormItem>
                            <FormControl>
                                <Input
                                    placeholder='Confirm pin'
                                    type='password'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    }} /> */}
                        <p className="text-xs text-muted-foreground text-center mt-2 underline">New User</p>
                        <div className="my-5 grid grid-cols-3 items-center" >
                            <Separator />
                            <p className="bg-background text-xs px-2 text-muted-foreground text-center uppercase col-span-">IN / OUT</p>
                            <Separator />

                        </div>
                        <EmployeeDialog data={employees} url={api} formValues={employ} clocks={clock}>
                            <Button type="submit" disabled={userFound}>Time In/Out</Button>
                        </EmployeeDialog>
                        {/* formValues={employ} data={data} url={url} */}
                        {/* <div className="flex gap-5 ">
                            <Button type='submit' className="w-full">Time In</Button>
                            <Button type='submit' variant={"outline"} className="w-full">Time Out</Button>
                        </div> */}

                    </form>
                </Form>
            </main>
        </>
    );
}
