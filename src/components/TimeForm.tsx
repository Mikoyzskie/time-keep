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
import { getEmployees } from '@/lib/directus'
import { useEffect, useState } from "react"

//form data is an object with fields
const formSchema = z.object({
    username: z.string().min(1, {
        message: "Required",
    }),
    pin: z.string().min(3, { message: "Required" }),

})

export default function TimeForm() {

    const [employ, setEmploy] = useState()

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

    useEffect(() => {
        async function gather() {
            try {
                const response = await fetch("https://zandatestcms.azurewebsites.net/items/Employees", {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer YQRwVAFUn-LlC_IOPoOkpVLeH75QBlyI",
                    },
                })
                const result = await response.json()
                setEmploy(result)
            } catch (error) {
                console.error(error);

            }
        }
        gather()
    }, [employ])

    console.log(employ);


    async function onSubmit(values: z.infer<typeof formSchema>) {

        const result = await getEmployees()
        console.log(await result);

    }

    return (
        <main className='max-w-md mx-auto flex flex-col gap-5'>

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
                    <div className="my-5 grid grid-cols-3 items-center" >
                        <Separator />
                        <p className="bg-background text-xs px-2 text-muted-foreground text-center uppercase col-span-">IN / OUT</p>
                        <Separator />

                    </div>
                    <div className="flex gap-5 ">
                        <Button type='submit' className="w-full">Time In</Button>
                        <Button type='submit' variant={"outline"} className="w-full">Time Out</Button>
                    </div>

                </form>
            </Form>
        </main>
    );
}
