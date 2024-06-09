"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const comments_controller_1 = require("./comments.controller");
exports.commentsRouter = new hono_1.Hono();
//get all address      
exports.commentsRouter.get("/comments", comments_controller_1.listComment);
//get a single address   
exports.commentsRouter.get("/comments/:id", comments_controller_1.getComment);
// create a address 
exports.commentsRouter.post("/comments", (0, zod_validator_1.zValidator)('json', validators_1.commentSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), comments_controller_1.createComment);
//update aaddresscityRouterr.put("categories/:id", updateCity)
exports.commentsRouter.delete("/comments/:id", comments_controller_1.deleteComment);
