"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const orders_controller_1 = require("./orders.controller");
exports.orderRouter = new hono_1.Hono();
//get all address      
exports.orderRouter.get("/orders", orders_controller_1.listOrder);
//get a single address   
exports.orderRouter.get("/orders/:id", orders_controller_1.getOrder);
// create a address 
exports.orderRouter.post("/orders", (0, zod_validator_1.zValidator)('json', validators_1.orderSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), orders_controller_1.createOrder);
//update aaddresscityRouterr.put("categories/:id", updateCity)
exports.orderRouter.put("/restaurants/:id", orders_controller_1.updateOrder);
exports.orderRouter.delete("/orders/:id", orders_controller_1.deleteOrder);
exports.orderRouter.get('/orders/user/:id', orders_controller_1.getOrdersByUserController);
