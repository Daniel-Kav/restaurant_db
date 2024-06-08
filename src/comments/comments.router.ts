import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { commentSchema } from "../validators";
import { createComment, deleteComment, getComment, listComment } from "./comments.controller";
export const commentsRouter = new Hono();

//get all address      
commentsRouter.get("/comments", listComment);
//get a single address   
commentsRouter.get("/comments/:id", getComment)
// create a address 
commentsRouter.post("/comments",   zValidator('json', commentSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createComment)
//update aaddresscityRouterr.put("categories/:id", updateCity)

commentsRouter.delete("/comments/:id", deleteComment)
