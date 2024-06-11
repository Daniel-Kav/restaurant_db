 import { Hono } from "hono";
import { createRestaurant, deleteRestaurant, getRestaurants, listRestaurants, updateRestaurant } from "./restaurant.controller";
import { restaurantSchema } from "../validators";
import { zValidator } from "@hono/zod-validator";
import { adminRoleAuth, superuserRoleAuth, userRoleAuth } from "../middleware/bearAuth";

export const restaurantRouter = new Hono();

restaurantRouter.get("/restaurants", superuserRoleAuth, listRestaurants);
//get a one restuarant    api/users/1
restaurantRouter.get("/restaurants/:id", userRoleAuth,getRestaurants);
// create a restaurant 
restaurantRouter.post("/restaurants", zValidator('json', restaurantSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),adminRoleAuth ,  createRestaurant)
//update a restaurant
restaurantRouter.put("/restaurants/:id",adminRoleAuth, updateRestaurant)

restaurantRouter.delete("/restaurants/:id", adminRoleAuth , deleteRestaurant)
