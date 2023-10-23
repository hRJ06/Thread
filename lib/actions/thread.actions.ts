"use server"
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string
}
export async function createThread({text, author, communityId, path}: Params) {
    try {
        connectToDB();
        const thread = await Thread.create({
            text,author,community: null,

        });
        await User.findByIdAndUpdate(author, {
            $push: {
                threads: thread._id
            }
        })
        revalidatePath("/");
    }
    catch (err : any) {
        throw new Error(`Failed to create thread: ${err.message}`);
    }
}

export async function fetchThreads(pageNumber = 1, pageSize = 20) {
    try {
        connectToDB();
        const page = (pageNumber - 1) * pageSize;
        const threads = await Thread.find({parentId: { $in: [null, undefined]}}).sort({ createdAt: 'desc'}).skip(page).limit(pageSize).populate({path: 'author', model: User}).populate({
            path: 'children',
            populate: {
                path: 'author',
                model: User,
                select: "_id name parentId image"
            }
        }).exec();
        const totalThreads= await Thread.countDocuments({parentId: { $in: [null, undefined]}})
        const isNext = totalThreads > page + threads.length; 
        return { threads, isNext }
    }
    catch (err: any) {
        throw new Error(`Failed to fetch threads: ${err.message}`);
    }
}

export async function fetchThreadById(id: string) {
    try {
        connectToDB();
        const thread = await Thread.findById(id).populate({
            path: 'author',
            model: User,
            select: "_id id name image"
        }).populate({
            path: 'children',
            populate: [
                {
                    path: 'author',
                    model: User,
                    select: "_id id name parentId image"
                },
                {
                    path: 'children',
                    model: Thread,
                    populate: {
                        path: 'author',
                        model: User,
                        select: "_id id name parentId image"
                    }
                }
            ]
        }).exec();
        return thread;
    }
    catch (err: any) {
        throw new Error(`Failed to fetch thread: ${err.message}`);
    }
}

export async function addCommentToThread(threadId: string, commentText: string, userId: any, path: string) {
    try {
        connectToDB()
        const originalThread = await Thread.findById(threadId);
        if(!originalThread) {
            throw new Error("Thread Not Found");
        }
        const commentThread = new Thread({text: commentText, parentId: threadId, author: userId})
        const savedCommentThread = await commentThread.save();
        originalThread.children.push(savedCommentThread._id);
        await originalThread.save();
        revalidatePath(path);
    }
    catch (err: any) {
        throw new Error(`Failed to add comment to thread: ${err.message}`);
    }
}