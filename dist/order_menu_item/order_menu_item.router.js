"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderMenuItemRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const order_menu_item_controller_1 = require("./order_menu_item.controller");
exports.orderMenuItemRouter = new hono_1.Hono();
//get all address      
exports.orderMenuItemRouter.get("/orderMenuItem", order_menu_item_controller_1.listorderMenuItem);
//get a single address   
exports.orderMenuItemRouter.get("/orderMenuItem/:id", order_menu_item_controller_1.getorderMenuItem);
// create a address 
exports.orderMenuItemRouter.post("/orderMenuItem", (0, zod_validator_1.zValidator)('json', validators_1.orderMenuItemSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), order_menu_item_controller_1.createorderMenuItem);
exports.orderMenuItemRouter.put("/orderMenuItem/:id", order_menu_item_controller_1.updateorderMenuItem);
exports.orderMenuItemRouter.delete("/orderMenuItem/:id", order_menu_item_controller_1.deleteorderMenuItem);
