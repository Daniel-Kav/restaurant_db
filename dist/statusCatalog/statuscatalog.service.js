"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletestatusCatalogService = exports.updatestatusCatalogService = exports.createstatusCatalogService = exports.getstatusCatalogService = exports.statusCatalogService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const statusCatalogService = async (limit) => {
    if (limit) {
        return await db_1.default.query.state.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.statusCatalog.findMany();
};
exports.statusCatalogService = statusCatalogService;
const getstatusCatalogService = async (id) => {
    return await db_1.default.query.statusCatalog.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.statusCatalog.id, id)
    });
};
exports.getstatusCatalogService = getstatusCatalogService;
const createstatusCatalogService = async (User) => {
    await db_1.default.insert(schema_1.statusCatalog).values(User);
    return "statusCatalog created successfully";
};
exports.createstatusCatalogService = createstatusCatalogService;
const updatestatusCatalogService = async (id, userData) => {
    await db_1.default.update(schema_1.statusCatalog).set(userData).where((0, drizzle_orm_1.eq)(schema_1.statusCatalog.id, id));
    return "statusCatalog updated successfully";
};
exports.updatestatusCatalogService = updatestatusCatalogService;
const deletestatusCatalogService = async (id) => {
    await db_1.default.delete(schema_1.statusCatalog).where((0, drizzle_orm_1.eq)(schema_1.statusCatalog.id, id));
    return "statusCatalog deleted successfully";
};
exports.deletestatusCatalogService = deletestatusCatalogService;
