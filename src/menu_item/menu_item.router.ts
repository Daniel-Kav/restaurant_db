import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { menuItemSchema } from "../validators";
import { createmenuItem, deletemenuItem, getMenuItemsByRestaurantController, getmenuItem, listmenuItem, updatemenuItem , getMenuItemsByCategoryController, getRestaurantMenuByCategoryNameController} from "./menu_item.contoller";
export const menuItemRouter = new Hono();

//get all address      
menuItemRouter.get("/menuItem", listmenuItem);
//get a single address   
menuItemRouter.get("/menuItem/:id", getmenuItem)
// create a address 
menuItemRouter.post("/menuItem",  zValidator('json', menuItemSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),  createmenuItem)
menuItemRouter.put("/menuItem/:id", updatemenuItem)


menuItemRouter.delete("/menuItem/:id", deletemenuItem)
menuItemRouter.get('/restaurants/:id/menu_items', getMenuItemsByRestaurantController);
menuItemRouter.get('/categories/:id/menu_items', getMenuItemsByCategoryController);

menuItemRouter.get('/restaurant/:restaurantId/category', getRestaurantMenuByCategoryNameController);
