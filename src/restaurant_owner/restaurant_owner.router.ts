import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { restaurantOwnerSchema } from "../validators";
import { createrestaurantOwner, deleterestaurantOwner, getRestaurantOwnerController, getrestaurantOwner, listrestaurantOwner, updaterestaurantOwner } from "./restaurant_owner.controller";
export const restaurantOwnerRouter = new Hono();

//get all address      
restaurantOwnerRouter.get("/restaurantOwner", listrestaurantOwner);
//get a single address   
restaurantOwnerRouter.get("/restaurantOwner/:id", getrestaurantOwner)
// create a address 
restaurantOwnerRouter.post("/restaurantOwner", zValidator('json', restaurantOwnerSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createrestaurantOwner)

restaurantOwnerRouter.put("/restaurantOwner/:id", updaterestaurantOwner)


restaurantOwnerRouter.delete("/restaurantOwner/:id", deleterestaurantOwner)
restaurantOwnerRouter.get('/restaurants/:id/owner', getRestaurantOwnerController);
