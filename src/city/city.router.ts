import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { citySchema } from "../validators";
import { createCity, deleteCity, getCity, getRestaurantsByCityController, listCity, searchCitiesController, updateCity } from "../city/city.controller";
import { adminOrUserRoleAuth, adminRoleAuth, superuserRoleAuth, userRoleAuth } from "../middleware/bearAuth";
export const cityRouter = new Hono();

//get all address      
cityRouter.get("/cities",adminOrUserRoleAuth ,listCity);
//get a single address   
cityRouter.get("/cities/:id", adminOrUserRoleAuth , getCity)
// create a address 
cityRouter.post("/cities",  zValidator('json', citySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), adminRoleAuth , createCity)
//update aaddresscityRouterr.put("categories/:id", updateCity)
cityRouter.put("cities/:id", adminRoleAuth , updateCity)
cityRouter.delete("/cities/:id", adminRoleAuth ,deleteCity)
cityRouter.get('/cities/:id/restaurants', adminOrUserRoleAuth , getRestaurantsByCityController);
cityRouter.get('/search/cities',adminOrUserRoleAuth , searchCitiesController);
