
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {TIComment, TSComment, comment } from "../drizzle/schema";

export const commentService = async (limit?: number): Promise<TSComment[] | null> => {
    if (limit) {
        return await db.query.comment.findMany({
            limit: limit
        });
    }
    return await db.query.comment.findMany();
}

export const getcommentService = async (id: number):Promise<TIComment[] | any> => {
    return await db.query.comment.findFirst({
        where: eq(comment.id, id)
    })
}

export const createcommentService = async (User: TIComment) => {
    await db.insert(comment).values(User)
    return "comment created successfully";
}

export const updatecommentService = async (id: number, userData: TIComment) => {
    await db.update(comment).set(userData).where(eq(comment.id, id))
    return "comment updated successfully";
}

export const deletecommentService = async (id: number) => {
    await db.delete(comment).where(eq(comment.id, id))
    return "comment deleted successfully";
}
