import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { orderMenuItemSchema } from "../validators";
import { createorderMenuItem, deleteorderMenuItem, getorderMenuItem, listorderMenuItem, updateorderMenuItem } from "./order_menu_item.controller";
import { adminOrUserRoleAuth, adminRoleAuth } from "../middleware/bearAuth";
export const orderMenuItemRouter = new Hono();

//get all address      
orderMenuItemRouter.get("/orderMenuItem", adminOrUserRoleAuth, listorderMenuItem);
//get a single address   
orderMenuItemRouter.get("/orderMenuItem/:id", adminOrUserRoleAuth , getorderMenuItem)
// create a address 
orderMenuItemRouter.post("/orderMenuItem",   zValidator('json', orderMenuItemSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), adminRoleAuth , createorderMenuItem)
orderMenuItemRouter.put("/orderMenuItem/:id",adminRoleAuth , updateorderMenuItem)

orderMenuItemRouter.delete("/orderMenuItem/:id",adminRoleAuth , deleteorderMenuItem)
