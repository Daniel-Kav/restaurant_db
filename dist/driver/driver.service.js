"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletedriverService = exports.updatedriverService = exports.createdriverService = exports.getdriverService = exports.driverService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const driverService = async (limit) => {
    if (limit) {
        return await db_1.default.query.driver.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.driver.findMany();
};
exports.driverService = driverService;
const getdriverService = async (id) => {
    return await db_1.default.query.driver.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.driver.id, id)
    });
};
exports.getdriverService = getdriverService;
const createdriverService = async (User) => {
    await db_1.default.insert(schema_1.driver).values(User);
    return "driver created successfully";
};
exports.createdriverService = createdriverService;
const updatedriverService = async (id, driverData) => {
    await db_1.default.update(schema_1.driver).set(driverData).where((0, drizzle_orm_1.eq)(schema_1.driver.id, id));
    return "driver updated successfully";
};
exports.updatedriverService = updatedriverService;
const deletedriverService = async (id) => {
    await db_1.default.delete(schema_1.driver).where((0, drizzle_orm_1.eq)(schema_1.driver.id, id));
    return "driver deleted successfully";
};
exports.deletedriverService = deletedriverService;
