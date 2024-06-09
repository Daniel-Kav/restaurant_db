"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurantsByCityService = exports.searchCitiesService = exports.deletecityService = exports.updatecityService = exports.createcityService = exports.getcityService = exports.cityService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const cityService = async (limit) => {
    if (limit) {
        return await db_1.default.query.city.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.city.findMany();
};
exports.cityService = cityService;
const getcityService = async (id) => {
    return await db_1.default.query.city.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.city.id, id)
    });
};
exports.getcityService = getcityService;
const createcityService = async (User) => {
    await db_1.default.insert(schema_1.city).values(User);
    return "city created successfully";
};
exports.createcityService = createcityService;
const updatecityService = async (id, userData) => {
    await db_1.default.update(schema_1.city).set(userData).where((0, drizzle_orm_1.eq)(schema_1.city.id, id));
    return "city updated successfully";
};
exports.updatecityService = updatecityService;
const deletecityService = async (id) => {
    await db_1.default.delete(schema_1.city).where((0, drizzle_orm_1.eq)(schema_1.city.id, id));
    return "city deleted successfully";
};
exports.deletecityService = deletecityService;
// Service to search for a city by name using a search term
const searchCitiesService = async (searchTerm) => {
    const cities = await db_1.default.select()
        .from(schema_1.city)
        .where((0, drizzle_orm_1.ilike)(schema_1.city.name, `%${searchTerm}%`));
    return cities;
};
exports.searchCitiesService = searchCitiesService;
// Service to fetch restaurants by city ID
const getRestaurantsByCityService = async (cityId) => {
    const restaurants = await db_1.default
        .select()
        .from(schema_1.restaurant)
        .where((0, drizzle_orm_1.eq)(schema_1.restaurant.cityId, cityId))
        .execute();
    return restaurants;
};
exports.getRestaurantsByCityService = getRestaurantsByCityService;
