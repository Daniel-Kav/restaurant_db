"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurantService = exports.updateRestaurantService = exports.createRestaurantService = exports.getRestaurantService = exports.limitrestaurantsService = exports.restaurantService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
// import { TIProfile, TSProfile } from '../drizzle/schema';
const schema_1 = require("../drizzle/schema");
const restaurantService = async () => {
    return await db_1.default.select().from(schema_1.restaurant);
};
exports.restaurantService = restaurantService;
const limitrestaurantsService = async (limit) => {
    if (limit) {
        return await db_1.default.query.restaurant.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.restaurant.findMany();
};
exports.limitrestaurantsService = limitrestaurantsService;
const getRestaurantService = async (id) => {
    return await db_1.default.query.restaurant.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.restaurant.id, id)
    });
};
exports.getRestaurantService = getRestaurantService;
const createRestaurantService = async (Restaurant) => {
    await db_1.default.insert(schema_1.restaurant).values(Restaurant);
    return "restaurant created successfully";
};
exports.createRestaurantService = createRestaurantService;
const updateRestaurantService = async (id, userData) => {
    await db_1.default.update(schema_1.restaurant).set(userData).where((0, drizzle_orm_1.eq)(schema_1.restaurant.id, id));
    return "restaurant updated successfully";
};
exports.updateRestaurantService = updateRestaurantService;
const deleteRestaurantService = async (id) => {
    await db_1.default.delete(schema_1.restaurant).where((0, drizzle_orm_1.eq)(schema_1.restaurant.id, id));
    return "restaurant deleted successfully";
};
exports.deleteRestaurantService = deleteRestaurantService;
