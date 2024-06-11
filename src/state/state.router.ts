import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { stateSchema, userSchema } from "../validators";
import { createState, deleteState, getCitiesByStateController, getRestaurantsByCityController, getState, listState, updateState } from "./state.controller";
import { adminRoleAuth, superuserRoleAuth, userRoleAuth } from "../middleware/bearAuth";
export const stateRouter = new Hono();

//get all address      
stateRouter.get("/states", adminRoleAuth ,  listState);
//get a single address   
stateRouter.get("/states/:id",userRoleAuth , getState)
// create a address 
stateRouter.post("/states",  zValidator('json', stateSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), adminRoleAuth ,createState)
stateRouter.put("/states/:id", adminRoleAuth , updateState)


stateRouter.delete("/states/:id",adminRoleAuth, deleteState)

stateRouter.get('states/:id/cities', superuserRoleAuth,getCitiesByStateController);
stateRouter.get('states/:id/cities/:cityId/restaurants', superuserRoleAuth,getRestaurantsByCityController);

