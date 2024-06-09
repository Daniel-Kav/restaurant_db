"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cityRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const city_controller_1 = require("../city/city.controller");
exports.cityRouter = new hono_1.Hono();
//get all address      
exports.cityRouter.get("/cities", city_controller_1.listCity);
//get a single address   
exports.cityRouter.get("/cities/:id", city_controller_1.getCity);
// create a address 
exports.cityRouter.post("/cities", (0, zod_validator_1.zValidator)('json', validators_1.citySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), city_controller_1.createCity);
//update aaddresscityRouterr.put("categories/:id", updateCity)
exports.cityRouter.delete("/cities/:id", city_controller_1.deleteCity);
exports.cityRouter.get('/cities/:id/restaurants', city_controller_1.getRestaurantsByCityController);
exports.cityRouter.get('/search/cities', city_controller_1.searchCitiesController);
