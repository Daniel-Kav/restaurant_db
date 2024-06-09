"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuItemRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const menu_item_contoller_1 = require("./menu_item.contoller");
exports.menuItemRouter = new hono_1.Hono();
//get all address      
exports.menuItemRouter.get("/menuItem", menu_item_contoller_1.listmenuItem);
//get a single address   
exports.menuItemRouter.get("/menuItem/:id", menu_item_contoller_1.getmenuItem);
// create a address 
exports.menuItemRouter.post("/menuItem", (0, zod_validator_1.zValidator)('json', validators_1.menuItemSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), menu_item_contoller_1.createmenuItem);
exports.menuItemRouter.put("/menuItem/:id", menu_item_contoller_1.updatemenuItem);
exports.menuItemRouter.delete("/menuItem/:id", menu_item_contoller_1.deletemenuItem);
exports.menuItemRouter.get('/restaurants/:id/menu_items', menu_item_contoller_1.getMenuItemsByRestaurantController);
exports.menuItemRouter.get('/categories/:id/menu_items', menu_item_contoller_1.getMenuItemsByCategoryController);
exports.menuItemRouter.get('/restaurant/:restaurantId/category', menu_item_contoller_1.getRestaurantMenuByCategoryNameController);
