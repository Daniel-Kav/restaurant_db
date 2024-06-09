"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurantsByCityService = exports.getCitiesByStateService = exports.deletestateService = exports.updatestateService = exports.createstateService = exports.getstateService = exports.stateService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const stateService = async (limit) => {
    if (limit) {
        return await db_1.default.query.state.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.state.findMany();
};
exports.stateService = stateService;
const getstateService = async (id) => {
    return await db_1.default.query.state.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.state.id, id)
    });
};
exports.getstateService = getstateService;
const createstateService = async (User) => {
    await db_1.default.insert(schema_1.state).values(User);
    return "state created successfully";
};
exports.createstateService = createstateService;
const updatestateService = async (id, userData) => {
    await db_1.default.update(schema_1.state).set(userData).where((0, drizzle_orm_1.eq)(schema_1.state.id, id));
    return "state updated successfully";
};
exports.updatestateService = updatestateService;
const deletestateService = async (id) => {
    await db_1.default.delete(schema_1.state).where((0, drizzle_orm_1.eq)(schema_1.state.id, id));
    return "state deleted successfully";
};
exports.deletestateService = deletestateService;
// Service to fetch cities by state ID
const getCitiesByStateService = async (stateId) => {
    const cities = await db_1.default
        .select()
        .from(schema_1.city)
        .where((0, drizzle_orm_1.eq)(schema_1.city.stateId, stateId))
        .execute();
    return cities;
};
exports.getCitiesByStateService = getCitiesByStateService;
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
