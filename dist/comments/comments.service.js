"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletecommentService = exports.updatecommentService = exports.createcommentService = exports.getcommentService = exports.commentService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const commentService = async (limit) => {
    if (limit) {
        return await db_1.default.query.comment.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.comment.findMany();
};
exports.commentService = commentService;
const getcommentService = async (id) => {
    return await db_1.default.query.comment.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.comment.id, id)
    });
};
exports.getcommentService = getcommentService;
const createcommentService = async (User) => {
    await db_1.default.insert(schema_1.comment).values(User);
    return "comment created successfully";
};
exports.createcommentService = createcommentService;
const updatecommentService = async (id, userData) => {
    await db_1.default.update(schema_1.comment).set(userData).where((0, drizzle_orm_1.eq)(schema_1.comment.id, id));
    return "comment updated successfully";
};
exports.updatecommentService = updatecommentService;
const deletecommentService = async (id) => {
    await db_1.default.delete(schema_1.comment).where((0, drizzle_orm_1.eq)(schema_1.comment.id, id));
    return "comment deleted successfully";
};
exports.deletecommentService = deletecommentService;
