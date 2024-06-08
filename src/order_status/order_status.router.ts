import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { orderStatusSchema } from "../validators";
import { createorderStatus, deleteorderStatus, getOrderStatusController, getorderStatus, listorderStatus, updateorderStatus } from "./order_status.controller";
export const orderStatusRouter = new Hono();

//get all address      
orderStatusRouter.get("/orderStatus", listorderStatus);
//get a single address   
orderStatusRouter.get("/orderStatus/:id", getorderStatus)
// create a address 
orderStatusRouter.post("/orderStatus",  zValidator('json', orderStatusSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),  createorderStatus)
// update
orderStatusRouter.put("/orderStatus/:id", updateorderStatus)
//delete orderStatusRouter.post("/orderStatus
orderStatusRouter.delete("/orderStatus/:id", deleteorderStatus)
orderStatusRouter.get('orderStatus/:id/status', getOrderStatusController);
