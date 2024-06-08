import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { orderMenuItemSchema } from "../validators";
import { createorderMenuItem, deleteorderMenuItem, getorderMenuItem, listorderMenuItem, updateorderMenuItem } from "./order_menu_item.controller";
export const orderMenuItemRouter = new Hono();

//get all address      
orderMenuItemRouter.get("/orderMenuItem", listorderMenuItem);
//get a single address   
orderMenuItemRouter.get("/orderMenuItem/:id", getorderMenuItem)
// create a address 
orderMenuItemRouter.post("/orderMenuItem",   zValidator('json', orderMenuItemSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createorderMenuItem)
orderMenuItemRouter.put("/orderMenuItem/:id", updateorderMenuItem)

orderMenuItemRouter.delete("/orderMenuItem/:id", deleteorderMenuItem)
