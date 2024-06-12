import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { menuItemSchema } from "../validators";
import { createmenuItem, deletemenuItem, getMenuItemsByRestaurantController, getmenuItem, listmenuItem, updatemenuItem , getMenuItemsByCategoryController, getRestaurantMenuByCategoryNameController} from "./menu_item.contoller";
import { adminOrUserRoleAuth, adminRoleAuth } from "../middleware/bearAuth";
export const menuItemRouter = new Hono();

//get all address      
menuItemRouter.get("/menuItem", adminOrUserRoleAuth , listmenuItem);
//get a single address   
menuItemRouter.get("/menuItem/:id", adminOrUserRoleAuth , getmenuItem)
// create a address 
menuItemRouter.post("/menuItem",  zValidator('json', menuItemSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), adminRoleAuth , createmenuItem)
menuItemRouter.put("/menuItem/:id", adminRoleAuth ,updatemenuItem)


menuItemRouter.delete("/menuItem/:id",adminRoleAuth, deletemenuItem)
menuItemRouter.get('/restaurants/:id/menu_items',adminOrUserRoleAuth, getMenuItemsByRestaurantController);
menuItemRouter.get('menuItem/categories/:id/menu_items', adminOrUserRoleAuth , getMenuItemsByCategoryController);

menuItemRouter.get('/restaurant/:restaurantId/category',adminOrUserRoleAuth , getRestaurantMenuByCategoryNameController);
