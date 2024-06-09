"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurantsByOwnerService = exports.getAddressesByUserService = exports.getUsersByOrderService = exports.searchUsersService = exports.deleteUserService = exports.updateUserService = exports.createUserService = exports.getUserService = exports.usersService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
// import { Client } from "pg";
const schema_1 = require("../drizzle/schema");
// export const client = new Client({
//     connectionString: process.env.Database_URL as string,   //get the database url from the environment
// })
// client.connect();
const usersService = async (limit) => {
    if (limit) {
        return await db_1.default.query.user.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.user.findMany();
};
exports.usersService = usersService;
const getUserService = async (id) => {
    return await db_1.default.query.user.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.user.id, id)
    });
};
exports.getUserService = getUserService;
const createUserService = async (User) => {
    await db_1.default.insert(schema_1.user).values(User);
    return "User created successfully";
};
exports.createUserService = createUserService;
const updateUserService = async (id, userData) => {
    await db_1.default.update(schema_1.user).set(userData).where((0, drizzle_orm_1.eq)(schema_1.user.id, id));
    return "User updated successfully";
};
exports.updateUserService = updateUserService;
const deleteUserService = async (id) => {
    await db_1.default.delete(schema_1.user).where((0, drizzle_orm_1.eq)(schema_1.user.id, id));
    return "User deleted successfully";
};
exports.deleteUserService = deleteUserService;
// export const searchUsersService = async (searchTerm: string) => {
//     const query = `
//         SELECT * FROM users
//         WHERE name ILIKE $1 OR email ILIKE $1
//     `;
//     const values = [`%${searchTerm}%`];
//     const results = await client.query(query, values);
//     return results.rows;
// };
const searchUsersService = async (searchTerm) => {
    const users = await db_1.default.select()
        .from(schema_1.user)
        .where((0, drizzle_orm_1.or)((0, drizzle_orm_1.ilike)(schema_1.user.name, `%${searchTerm}%`), (0, drizzle_orm_1.ilike)(schema_1.user.email, `%${searchTerm}%`)));
    return users;
};
exports.searchUsersService = searchUsersService;
// Service to fetch users by order ID
const getUsersByOrderService = async (orderId) => {
    const users = await db_1.default
        .select()
        .from(schema_1.user)
        .innerJoin(schema_1.order, (0, drizzle_orm_1.eq)(schema_1.user.id, schema_1.order.userId))
        .where((0, drizzle_orm_1.eq)(schema_1.order.id, orderId))
        .execute();
    return users;
};
exports.getUsersByOrderService = getUsersByOrderService;
// Service to fetch addresses by user ID
const getAddressesByUserService = async (userId) => {
    const addresses = await db_1.default
        .select()
        .from(schema_1.address)
        .where((0, drizzle_orm_1.eq)(schema_1.address.userId, userId))
        .execute();
    return addresses;
};
exports.getAddressesByUserService = getAddressesByUserService;
// Service to fetch all restaurants owned by a particular user
const getRestaurantsByOwnerService = async (userId) => {
    const restaurants = await db_1.default
        .select()
        .from(schema_1.restaurant)
        .innerJoin(schema_1.restaurantOwner, (0, drizzle_orm_1.eq)(schema_1.restaurant.id, schema_1.restaurantOwner.restaurantId))
        .where((0, drizzle_orm_1.eq)(schema_1.restaurantOwner.ownerId, userId))
        .execute();
    return restaurants;
};
exports.getRestaurantsByOwnerService = getRestaurantsByOwnerService;
