import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { driverSchema } from "../validators";
import { createDriver, deleteDriver, getDriver, getDriverByOrder, listDriver, updateDriver } from "./driver.controller";
import { adminOrUserRoleAuth, adminRoleAuth } from "../middleware/bearAuth";
export const driversRouter = new Hono();

//get all address      
driversRouter.get("/drivers", adminOrUserRoleAuth ,listDriver);
//get a single address   
driversRouter.get("/drivers/:id", adminOrUserRoleAuth , getDriver)
// create a address 
driversRouter.post("/drivers",  zValidator('json', driverSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), adminRoleAuth , createDriver)
driversRouter.put("/drivers/:id", adminRoleAuth , updateDriver)


driversRouter.delete("/drivers/:id", adminRoleAuth , deleteDriver)

// Route to get driver by order ID
driversRouter.get('/order/:orderId/driver', adminRoleAuth , getDriverByOrder);
