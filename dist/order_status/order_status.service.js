"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderStatusService = exports.deleteorderStatusService = exports.updateorderStatusService = exports.createorderStatusService = exports.getorderStatusService = exports.orderStatusService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const orderStatusService = async (limit) => {
    if (limit) {
        return await db_1.default.query.orderStatus.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.orderStatus.findMany();
};
exports.orderStatusService = orderStatusService;
const getorderStatusService = async (id) => {
    return await db_1.default.query.orderStatus.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.orderStatus.id, id)
    });
};
exports.getorderStatusService = getorderStatusService;
const createorderStatusService = async (User) => {
    await db_1.default.insert(schema_1.orderStatus).values(User);
    return "orderStatus created successfully";
};
exports.createorderStatusService = createorderStatusService;
const updateorderStatusService = async (id, userData) => {
    await db_1.default.update(schema_1.orderStatus).set(userData).where((0, drizzle_orm_1.eq)(schema_1.orderStatus.id, id));
    return "orderStatus updated successfully";
};
exports.updateorderStatusService = updateorderStatusService;
const deleteorderStatusService = async (id) => {
    await db_1.default.delete(schema_1.orderStatus).where((0, drizzle_orm_1.eq)(schema_1.orderStatus.id, id));
    return "orderStatus deleted successfully";
};
exports.deleteorderStatusService = deleteorderStatusService;
// Service to fetch the status of a particular order by order ID
const getOrderStatusService = async (orderId) => {
    const orderStatusData = await db_1.default
        .select()
        .from(schema_1.orderStatus)
        .where((0, drizzle_orm_1.eq)(schema_1.orderStatus.orderId, orderId))
        .execute();
    return orderStatusData;
};
exports.getOrderStatusService = getOrderStatusService;
