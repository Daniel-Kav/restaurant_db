import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { orderSchema } from "../validators";
import { createOrder, deleteOrder, getOrder, getOrdersByUserController, listOrder, updateOrder } from "./orders.controller";
export const orderRouter = new Hono();

//get all address      
orderRouter.get("/orders", listOrder);
//get a single address   
orderRouter.get("/orders/:id", getOrder)
// create a address 
orderRouter.post("/orders",  zValidator('json', orderSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),  createOrder)
//update aaddresscityRouterr.put("categories/:id", updateCity)
orderRouter.put("/restaurants/:id", updateOrder)

orderRouter.delete("/orders/:id", deleteOrder)
orderRouter.get('/orders/user/:id', getOrdersByUserController);