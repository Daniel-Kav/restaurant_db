"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurantMenuByCategoryNameService = exports.getMenuItemsByCategoryService = exports.getMenuItemsByRestaurantService = exports.deletemenuItemService = exports.updatemenuItemService = exports.createmenuItemService = exports.getmenuItemService = exports.menuItemService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const menuItemService = async (limit) => {
    if (limit) {
        return await db_1.default.query.menuItem.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.menuItem.findMany();
};
exports.menuItemService = menuItemService;
const getmenuItemService = async (id) => {
    return await db_1.default.query.menuItem.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.menuItem.id, id)
    });
};
exports.getmenuItemService = getmenuItemService;
const createmenuItemService = async (User) => {
    await db_1.default.insert(schema_1.menuItem).values(User);
    return "menuItem created successfully";
};
exports.createmenuItemService = createmenuItemService;
const updatemenuItemService = async (id, userData) => {
    await db_1.default.update(schema_1.menuItem).set(userData).where((0, drizzle_orm_1.eq)(schema_1.menuItem.id, id));
    return "menuItem updated successfully";
};
exports.updatemenuItemService = updatemenuItemService;
const deletemenuItemService = async (id) => {
    await db_1.default.delete(schema_1.menuItem).where((0, drizzle_orm_1.eq)(schema_1.menuItem.id, id));
    return "menuItem deleted successfully";
};
exports.deletemenuItemService = deletemenuItemService;
// Service to fetch menu items by restaurant ID
const getMenuItemsByRestaurantService = async (restaurantId) => {
    const menuItems = await db_1.default
        .select()
        .from(schema_1.menuItem)
        .where((0, drizzle_orm_1.eq)(schema_1.menuItem.restaurantId, restaurantId))
        .execute();
    return menuItems;
};
exports.getMenuItemsByRestaurantService = getMenuItemsByRestaurantService;
// Service to fetch menu items by category ID
const getMenuItemsByCategoryService = async (categoryId) => {
    const menuItems = await db_1.default
        .select()
        .from(schema_1.menuItem)
        .where((0, drizzle_orm_1.eq)(schema_1.menuItem.categoryId, categoryId))
        .execute();
    return menuItems;
};
exports.getMenuItemsByCategoryService = getMenuItemsByCategoryService;
// Service to fetch menu items by category name for a specific restaurant
const getRestaurantMenuByCategoryNameService = async (restaurantId, categoryName) => {
    const menuItems = await db_1.default.query.restaurant.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.restaurant.id, restaurantId),
        with: {
            menuItems: {
                where: (0, drizzle_orm_1.eq)(schema_1.menuItem.categoryId, db_1.default
                    .select({ id: schema_1.category.id })
                    .from(schema_1.category)
                    .where((0, drizzle_orm_1.eq)(schema_1.category.name, categoryName))),
                with: {
                    category: true,
                },
            },
        },
    });
    return menuItems;
};
exports.getRestaurantMenuByCategoryNameService = getRestaurantMenuByCategoryNameService;
