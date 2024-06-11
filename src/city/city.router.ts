import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { citySchema } from "../validators";
import { createCity, deleteCity, getCity, getRestaurantsByCityController, listCity, searchCitiesController, updateCity } from "../city/city.controller";
import { adminRoleAuth, superuserRoleAuth, userRoleAuth } from "../middleware/bearAuth";
export const cityRouter = new Hono();

//get all address      
cityRouter.get("/cities",superuserRoleAuth ,listCity);
//get a single address   
cityRouter.get("/cities/:id", userRoleAuth , getCity)
// create a address 
cityRouter.post("/cities",  zValidator('json', citySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), adminRoleAuth , createCity)
//update aaddresscityRouterr.put("categories/:id", updateCity)

cityRouter.delete("/cities/:id", adminRoleAuth ,deleteCity)
cityRouter.get('/cities/:id/restaurants', superuserRoleAuth , getRestaurantsByCityController);
cityRouter.get('/search/cities',superuserRoleAuth, searchCitiesController);
