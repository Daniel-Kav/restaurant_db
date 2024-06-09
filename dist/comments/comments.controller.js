"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.createComment = exports.getComment = exports.listComment = void 0;
const comments_service_1 = require("./comments.service");
const listComment = async (c) => {
    try {
        //limit the number of users to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, comments_service_1.commentService)(limit);
        if (data == null || data.length == 0) {
            return c.text("Comment not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listComment = listComment;
const getComment = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const City = await (0, comments_service_1.getcommentService)(id);
    if (City == undefined) {
        return c.text("Comment not found", 404);
    }
    return c.json(City, 200);
};
exports.getComment = getComment;
const createComment = async (c) => {
    try {
        const Comment = await c.req.json();
        const createdComment = await (0, comments_service_1.createcommentService)(Comment);
        //
        if (!createdComment)
            return c.text("Comment not created", 404);
        return c.json({ msg: createdComment }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createComment = createComment;
const updateComment = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const City = await c.req.json();
    try {
        // search for the user
        const searchedCategory = await (0, comments_service_1.getcommentService)(id);
        if (searchedCategory == undefined)
            return c.text("Comment not found", 404);
        // get the data and update it
        const res = await (0, comments_service_1.updatecommentService)(id, City);
        // return a success message
        if (!res)
            return c.text("Comment not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateComment = updateComment;
const deleteComment = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the user
        const Category = await (0, comments_service_1.getcommentService)(id);
        if (Category == undefined)
            return c.text("Comment not found", 404);
        //deleting the user
        const res = await (0, comments_service_1.deletecommentService)(id);
        if (!res)
            return c.text("Comment not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteComment = deleteComment;
