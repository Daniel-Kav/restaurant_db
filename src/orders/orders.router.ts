import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { orderSchema } from "../validators";
import { createOrder, deleteOrder, getDiscountedOrdersController, getOrder, getOrdersByUserController, listOrder, updateOrder } from "./orders.controller";
import { adminOrUserRoleAuth, adminRoleAuth, superuserRoleAuth, userRoleAuth } from "../middleware/bearAuth";
export const orderRouter = new Hono();

//get all address      
orderRouter.get("/orders", adminOrUserRoleAuth , listOrder);
//get a single address   
orderRouter.get("/orders/:id", adminOrUserRoleAuth , getOrder)
// create a address 
orderRouter.post("/orders",  zValidator('json', orderSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), userRoleAuth, createOrder)
//update aaddresscityRouterr.put("categories/:id", updateCity)
orderRouter.put("/restaurants/:id", userRoleAuth ,updateOrder)

orderRouter.delete("/orders/:id", adminOrUserRoleAuth , deleteOrder)
orderRouter.get('/orders/user/:id', adminRoleAuth , getOrdersByUserController);

// Route to get all discounted orders
orderRouter.get('/orders/discounted', adminOrUserRoleAuth , getDiscountedOrdersController);
