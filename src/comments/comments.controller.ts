import { Context } from "hono";
import { commentService, createcommentService, deletecommentService, getcommentService, updatecommentService } from "./comments.service";

export const listComment = async (c: Context) => {
    try {
        //limit the number of users to be returned

        const limit = Number(c.req.query('limit'))

        const data = await commentService(limit);
        if (data == null || data.length == 0) {
            return c.text("Comment not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getComment = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const City = await getcommentService(id);
    if (City == undefined) {
        return c.text("Comment not found", 404);
    }
    return c.json(City, 200);
}
export const createComment = async (c: Context) => {
    try {
        const Comment = await c.req.json();
        const createdComment = await createcommentService(Comment);
        //
        if (!createdComment) return c.text("Comment not created", 404);
        return c.json({ msg: createdComment }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateComment = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const City = await c.req.json();
    try {
        // search for the user
        const searchedCategory = await getcommentService(id);
        if (searchedCategory == undefined) return c.text("Comment not found", 404);
        // get the data and update it
        const res = await updatecommentService(id, City);
        // return a success message
        if (!res) return c.text("Comment not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteComment = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const Category = await getcommentService(id);
        if (Category == undefined) return c.text("Comment not found", 404);
        //deleting the user
        const res = await deletecommentService(id);
        if (!res) return c.text("Comment not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}