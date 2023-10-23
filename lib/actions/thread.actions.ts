"use server"
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"
import Community from "../models/community.model";

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string
}
export async function createThread({text, author, communityId, path}: Params) {
    try {
        connectToDB();
        const communityIdObject = await Community.findOne(
          { id: communityId },
          { _id: 1 }
        );
        const createdThread = await Thread.create({
            text,
            author,
            community: communityIdObject, 
        });
        await User.findByIdAndUpdate(author, {
          $push: { threads: createdThread._id },
        });
    
        if(communityIdObject) {
          await Community.findByIdAndUpdate(communityIdObject, {
            $push: { threads: createdThread._id },
          });
        }
        revalidatePath("/");
    } 
    catch (error: any) {
        throw new Error(`Failed to create thread: ${error.message}`);
    }
}


export async function fetchThreads(pageNumber = 1, pageSize = 20) {
    try {
        connectToDB();
        const page = (pageNumber - 1) * pageSize;
        const threads = await Thread.find({parentId: { $in: [null, undefined]}}).sort({ createdAt: 'desc'}).skip(page).limit(pageSize).populate({path: 'author', model: User}).populate({path: "community", model: Community}).populate({
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