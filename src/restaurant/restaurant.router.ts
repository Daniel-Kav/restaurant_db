 import { Hono } from "hono";
import { createRestaurant, deleteRestaurant, getRestaurants, listRestaurants, updateRestaurant } from "./restaurant.controller";
import { restaurantSchema } from "../validators";
import { zValidator } from "@hono/zod-validator";

export const restaurantRouter = new Hono();

restaurantRouter.get("/restaurants", listRestaurants);
//get a one restuarant    api/users/1
restaurantRouter.get("/restaurants/:id", getRestaurants);
// create a restaurant 
restaurantRouter.post("/restaurants", zValidator('json', restaurantSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),  createRestaurant)
//update a restaurant
restaurantRouter.put("/restaurants/:id", updateRestaurant)

restaurantRouter.delete("/restaurants/:id", deleteRestaurant)
