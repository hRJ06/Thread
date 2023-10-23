"use client"
import { CommentValidation } from "@/lib/validations/thread"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "../ui/input"
import Image from "next/image"
import { Button } from "../ui/button"
import { addCommentToThread } from "@/lib/actions/thread.actions"
import { usePathname } from "next/navigation"
interface Props {
    threadId: string,
    currentUserId: any,
    currentUserImg: string
}  
const Comment = ({threadId, currentUserImg, currentUserId}: Props) => {
    const pathName = usePathname();
    const form = useForm({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            thread: ''
        }
    })
    const onSubmit = async(values: z.infer<typeof CommentValidation>) => {
        await addCommentToThread(
            threadId, values.thread, currentUserId, pathName
        )
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="comment-form"
            >
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className="flex gap-3 w-full items-center">
                            <FormLabel>
                                <Image src={currentUserImg} alt="Profile Image" width={48} height={48} className="rounded-full object-cover"/>
                            </FormLabel>
                            <FormControl className="border-none bg-transparent">
                                <Input type="text" placeholder="Comment..." {...field} className="no-focus text-light-1 outline-none"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="comment-form_btn">Reply</Button>      
            </form>
       </Form>
    )
}

export default Comment