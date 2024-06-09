"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantRouter = void 0;
const hono_1 = require("hono");
const restaurant_controller_1 = require("./restaurant.controller");
const validators_1 = require("../validators");
const zod_validator_1 = require("@hono/zod-validator");
exports.restaurantRouter = new hono_1.Hono();
exports.restaurantRouter.get("/restaurants", restaurant_controller_1.listRestaurants);
//get a one restuarant    api/users/1
exports.restaurantRouter.get("/restaurants/:id", restaurant_controller_1.getRestaurants);
// create a restaurant 
exports.restaurantRouter.post("/restaurants", (0, zod_validator_1.zValidator)('json', validators_1.restaurantSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), restaurant_controller_1.createRestaurant);
//update a restaurant
exports.restaurantRouter.put("/restaurants/:id", restaurant_controller_1.updateRestaurant);
exports.restaurantRouter.delete("/restaurants/:id", restaurant_controller_1.deleteRestaurant);
