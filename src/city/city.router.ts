import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { citySchema } from "../validators";
import { createCity, deleteCity, getCity, getRestaurantsByCityController, listCity, searchCitiesController, updateCity } from "../city/city.controller";
export const cityRouter = new Hono();

//get all address      
cityRouter.get("/cities", listCity);
//get a single address   
cityRouter.get("/cities/:id", getCity)
// create a address 
cityRouter.post("/cities",  zValidator('json', citySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),  createCity)
//update aaddresscityRouterr.put("categories/:id", updateCity)

cityRouter.delete("/cities/:id", deleteCity)
cityRouter.get('/cities/:id/restaurants', getRestaurantsByCityController);
cityRouter.get('/search/cities', searchCitiesController);
