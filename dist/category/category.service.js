"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCategoriesService = exports.deletecategoryService = exports.updatecategoryService = exports.createcategoryService = exports.getcategoryService = exports.categoryService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const categoryService = async (limit) => {
    if (limit) {
        return await db_1.default.query.category.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.category.findMany();
};
exports.categoryService = categoryService;
const getcategoryService = async (id) => {
    return await db_1.default.query.category.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.category.id, id)
    });
};
exports.getcategoryService = getcategoryService;
const createcategoryService = async (User) => {
    await db_1.default.insert(schema_1.category).values(User);
    return "category created successfully";
};
exports.createcategoryService = createcategoryService;
const updatecategoryService = async (id, userData) => {
    await db_1.default.update(schema_1.category).set(userData).where((0, drizzle_orm_1.eq)(schema_1.category.id, id));
    return "category updated successfully";
};
exports.updatecategoryService = updatecategoryService;
const deletecategoryService = async (id) => {
    await db_1.default.delete(schema_1.category).where((0, drizzle_orm_1.eq)(schema_1.category.id, id));
    return "category deleted successfully";
};
exports.deletecategoryService = deletecategoryService;
const searchCategoriesService = async (searchTerm) => {
    const categories = await db_1.default.select()
        .from(schema_1.category)
        .where((0, drizzle_orm_1.or)((0, drizzle_orm_1.ilike)(schema_1.category.name, `%${searchTerm}%`)));
    return categories;
};
exports.searchCategoriesService = searchCategoriesService;
