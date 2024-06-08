import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { driverSchema } from "../validators";
import { createDriver, deleteDriver, getDriver, listDriver, updateDriver } from "./driver.controller";
export const driversRouter = new Hono();

//get all address      
driversRouter.get("/drivers", listDriver);
//get a single address   
driversRouter.get("/drivers/:id", getDriver)
// create a address 
driversRouter.post("/drivers",  zValidator('json', driverSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),  createDriver)
driversRouter.put("/drivers/:id", updateDriver)


driversRouter.delete("/drivers/:id", deleteDriver)
