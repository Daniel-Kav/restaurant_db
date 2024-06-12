import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { restaurantOwnerSchema } from "../validators";
import { createrestaurantOwner, deleterestaurantOwner, getRestaurantOwnerController, getrestaurantOwner, listrestaurantOwner, updaterestaurantOwner } from "./restaurant_owner.controller";
import { adminOrUserRoleAuth, adminRoleAuth, superuserRoleAuth } from "../middleware/bearAuth";
export const restaurantOwnerRouter = new Hono();

//get all address      
restaurantOwnerRouter.get("/restaurantOwner",adminOrUserRoleAuth, listrestaurantOwner);
//get a single address   
restaurantOwnerRouter.get("/restaurantOwner/:id",adminOrUserRoleAuth, getrestaurantOwner)
// create a address 
restaurantOwnerRouter.post("/restaurantOwner", zValidator('json', restaurantOwnerSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), adminRoleAuth, createrestaurantOwner)

restaurantOwnerRouter.put("/restaurantOwner/:id", adminRoleAuth ,updaterestaurantOwner)


restaurantOwnerRouter.delete("/restaurantOwner/:id", adminRoleAuth, deleterestaurantOwner)
restaurantOwnerRouter.get('/restaurants/:id/owner', adminRoleAuth , getRestaurantOwnerController);
