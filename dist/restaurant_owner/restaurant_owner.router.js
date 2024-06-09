"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantOwnerRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const restaurant_owner_controller_1 = require("./restaurant_owner.controller");
exports.restaurantOwnerRouter = new hono_1.Hono();
//get all address      
exports.restaurantOwnerRouter.get("/restaurantOwner", restaurant_owner_controller_1.listrestaurantOwner);
//get a single address   
exports.restaurantOwnerRouter.get("/restaurantOwner/:id", restaurant_owner_controller_1.getrestaurantOwner);
// create a address 
exports.restaurantOwnerRouter.post("/restaurantOwner", (0, zod_validator_1.zValidator)('json', validators_1.restaurantOwnerSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), restaurant_owner_controller_1.createrestaurantOwner);
exports.restaurantOwnerRouter.put("/restaurantOwner/:id", restaurant_owner_controller_1.updaterestaurantOwner);
exports.restaurantOwnerRouter.delete("/restaurantOwner/:id", restaurant_owner_controller_1.deleterestaurantOwner);
exports.restaurantOwnerRouter.get('/restaurants/:id/owner', restaurant_owner_controller_1.getRestaurantOwnerController);
