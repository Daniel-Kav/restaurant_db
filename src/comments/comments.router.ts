import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { commentSchema } from "../validators";
import { createComment, deleteComment, getComment, listComment } from "./comments.controller";
import { adminRoleAuth, superuserRoleAuth } from "../middleware/bearAuth";
export const commentsRouter = new Hono();

//get all address      
commentsRouter.get("/comments",adminRoleAuth ,listComment);
//get a single address   
commentsRouter.get("/comments/:id",superuserRoleAuth, getComment)
// create a address 
commentsRouter.post("/comments",   zValidator('json', commentSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),superuserRoleAuth, createComment)
//update aaddresscityRouterr.put("categories/:id", updateCity)

commentsRouter.delete("/comments/:id", adminRoleAuth, deleteComment)
