"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersByUserService = exports.deleteorderService = exports.updateorderyService = exports.createorderService = exports.getorderService = exports.orderService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const orderService = async (limit) => {
    if (limit) {
        return await db_1.default.query.order.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.order.findMany();
};
exports.orderService = orderService;
const getorderService = async (id) => {
    return await db_1.default.query.order.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.order.id, id)
    });
};
exports.getorderService = getorderService;
const createorderService = async (User) => {
    await db_1.default.insert(schema_1.order).values(User);
    return "order created successfully";
};
exports.createorderService = createorderService;
const updateorderyService = async (id, userData) => {
    await db_1.default.update(schema_1.order).set(userData).where((0, drizzle_orm_1.eq)(schema_1.order.id, id));
    return "order updated successfully";
};
exports.updateorderyService = updateorderyService;
const deleteorderService = async (id) => {
    await db_1.default.delete(schema_1.order).where((0, drizzle_orm_1.eq)(schema_1.order.id, id));
    return "order deleted successfully";
};
exports.deleteorderService = deleteorderService;
// Service to fetch orders by user ID
const getOrdersByUserService = async (userId) => {
    const orders = await db_1.default
        .select()
        .from(schema_1.order)
        .where((0, drizzle_orm_1.eq)(schema_1.order.userId, userId))
        .execute();
    return orders;
};
exports.getOrdersByUserService = getOrdersByUserService;
