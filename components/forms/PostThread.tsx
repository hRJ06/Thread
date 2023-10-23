"use client"

import * as z from "zod"
import { usePathname, useRouter } from "next/navigation"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Threadvalidation } from "@/lib/validations/thread";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { createThread } from "@/lib/actions/thread.actions";
function PostThread({userId}: {userId: any}) {
    const router = useRouter();
    const pathName = usePathname();
    const form = useForm<z.infer<typeof Threadvalidation>>({
        resolver: zodResolver(Threadvalidation),
        defaultValues: {
            thread: '',
            accountId: userId,
        }
    })
    const onSubmit = async(values: z.infer<typeof Threadvalidation>) => {
        await createThread({text: values.thread, author: userId, communityId: null, path: pathName});
    }
    return (
       <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-10 flex flex-col justify-start gap-10"
            >
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 w-full">
                            <FormLabel className="text-base-semibold text-light-2">
                                Content
                            </FormLabel>
                            <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                                <Textarea rows={15} {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="bg-primary-500">Post Thread</Button>      
            </form>
       </Form>
    )
}
export default PostThread