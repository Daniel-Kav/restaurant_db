import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { orderStatusSchema } from "../validators";
import { createorderStatus, deleteorderStatus, getOrderStatusController, getorderStatus, listorderStatus, updateorderStatus } from "./order_status.controller";
import { adminOrUserRoleAuth, adminRoleAuth } from "../middleware/bearAuth";
export const orderStatusRouter = new Hono();

//get all address      
orderStatusRouter.get("/orderStatus", adminRoleAuth ,listorderStatus);
//get a single address   
orderStatusRouter.get("/orderStatus/:id",adminOrUserRoleAuth , getorderStatus)
// create a address 
orderStatusRouter.post("/orderStatus",  zValidator('json', orderStatusSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), adminRoleAuth ,  createorderStatus)
// update
orderStatusRouter.put("/orderStatus/:id", adminRoleAuth ,updateorderStatus)
//delete orderStatusRouter.post("/orderStatus
orderStatusRouter.delete("/orderStatus/:id", adminRoleAuth , deleteorderStatus)
orderStatusRouter.get('orderStatus/:id/status', adminOrUserRoleAuth , getOrderStatusController);
