"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteorderMenuItemService = exports.updateorderMenuItemService = exports.createorderMenuItemService = exports.getorderMenuItemService = exports.orderMenuItemService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const orderMenuItemService = async (limit) => {
    if (limit) {
        return await db_1.default.query.orderMenuItem.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.orderMenuItem.findMany();
};
exports.orderMenuItemService = orderMenuItemService;
const getorderMenuItemService = async (id) => {
    return await db_1.default.query.orderMenuItem.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.orderMenuItem.id, id)
    });
};
exports.getorderMenuItemService = getorderMenuItemService;
const createorderMenuItemService = async (User) => {
    await db_1.default.insert(schema_1.orderMenuItem).values(User);
    return "orderMenuItem created successfully";
};
exports.createorderMenuItemService = createorderMenuItemService;
const updateorderMenuItemService = async (id, userData) => {
    await db_1.default.update(schema_1.orderMenuItem).set(userData).where((0, drizzle_orm_1.eq)(schema_1.orderMenuItem.id, id));
    return "orderMenuItem updated successfully";
};
exports.updateorderMenuItemService = updateorderMenuItemService;
const deleteorderMenuItemService = async (id) => {
    await db_1.default.delete(schema_1.orderMenuItem).where((0, drizzle_orm_1.eq)(schema_1.orderMenuItem.id, id));
    return "orderMenuItem deleted successfully";
};
exports.deleteorderMenuItemService = deleteorderMenuItemService;
