"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurantOwnerService = exports.deleterestaurantOwnerService = exports.updaterestaurantOwnerService = exports.createrestaurantOwnerService = exports.getrestaurantOwnerService = exports.restaurantOwnerService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const restaurantOwnerService = async (limit) => {
    if (limit) {
        return await db_1.default.query.restaurantOwner.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.restaurantOwner.findMany();
};
exports.restaurantOwnerService = restaurantOwnerService;
const getrestaurantOwnerService = async (id) => {
    return await db_1.default.query.restaurantOwner.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.restaurantOwner.id, id)
    });
};
exports.getrestaurantOwnerService = getrestaurantOwnerService;
const createrestaurantOwnerService = async (User) => {
    await db_1.default.insert(schema_1.restaurantOwner).values(User);
    return "restaurantOwner created successfully";
};
exports.createrestaurantOwnerService = createrestaurantOwnerService;
const updaterestaurantOwnerService = async (id, userData) => {
    await db_1.default.update(schema_1.restaurantOwner).set(userData).where((0, drizzle_orm_1.eq)(schema_1.restaurantOwner.id, id));
    return "restaurantOwner updated successfully";
};
exports.updaterestaurantOwnerService = updaterestaurantOwnerService;
const deleterestaurantOwnerService = async (id) => {
    await db_1.default.delete(schema_1.restaurantOwner).where((0, drizzle_orm_1.eq)(schema_1.restaurantOwner.id, id));
    return "restaurantOwner deleted successfully";
};
exports.deleterestaurantOwnerService = deleterestaurantOwnerService;
// Service to fetch the owner of a restaurant by restaurant ID
const getRestaurantOwnerService = async (restaurantId) => {
    const ownerData = await db_1.default
        .select()
        .from(schema_1.restaurantOwner)
        .innerJoin(schema_1.user, (0, drizzle_orm_1.eq)(schema_1.restaurantOwner.ownerId, schema_1.user.id))
        .where((0, drizzle_orm_1.eq)(schema_1.restaurantOwner.restaurantId, restaurantId))
        .execute();
    return ownerData;
};
exports.getRestaurantOwnerService = getRestaurantOwnerService;
