import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { orderSchema } from "../validators";
import { createOrder, deleteOrder, getOrder, getOrdersByUserController, listOrder, updateOrder } from "./orders.controller";
import { adminRoleAuth, superuserRoleAuth, userRoleAuth } from "../middleware/bearAuth";
export const orderRouter = new Hono();

//get all address      
orderRouter.get("/orders",superuserRoleAuth , listOrder);
//get a single address   
orderRouter.get("/orders/:id", userRoleAuth, getOrder)
// create a address 
orderRouter.post("/orders",  zValidator('json', orderSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), userRoleAuth, createOrder)
//update aaddresscityRouterr.put("categories/:id", updateCity)
orderRouter.put("/restaurants/:id", userRoleAuth ,updateOrder)

orderRouter.delete("/orders/:id",superuserRoleAuth, deleteOrder)
orderRouter.get('/orders/user/:id', adminRoleAuth , getOrdersByUserController);