import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { stateSchema, userSchema } from "../validators";
import { createState, deleteState, getCitiesByStateController, getRestaurantsByCityController, getState, listState, updateState } from "./state.controller";
export const stateRouter = new Hono();

//get all address      
stateRouter.get("/states", listState);
//get a single address   
stateRouter.get("/states/:id", getState)
// create a address 
stateRouter.post("/states",  zValidator('json', stateSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),createState)
stateRouter.put("/states/:id", updateState)


stateRouter.delete("/states/:id", deleteState)

stateRouter.get('states/:id/cities', getCitiesByStateController);
stateRouter.get('states/:id/cities/:cityId/restaurants', getRestaurantsByCityController);

