"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStatusRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const order_status_controller_1 = require("./order_status.controller");
exports.orderStatusRouter = new hono_1.Hono();
//get all address      
exports.orderStatusRouter.get("/orderStatus", order_status_controller_1.listorderStatus);
//get a single address   
exports.orderStatusRouter.get("/orderStatus/:id", order_status_controller_1.getorderStatus);
// create a address 
exports.orderStatusRouter.post("/orderStatus", (0, zod_validator_1.zValidator)('json', validators_1.orderStatusSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), order_status_controller_1.createorderStatus);
// update
exports.orderStatusRouter.put("/orderStatus/:id", order_status_controller_1.updateorderStatus);
//delete orderStatusRouter.post("/orderStatus
exports.orderStatusRouter.delete("/orderStatus/:id", order_status_controller_1.deleteorderStatus);
exports.orderStatusRouter.get('orderStatus/:id/status', order_status_controller_1.getOrderStatusController);
