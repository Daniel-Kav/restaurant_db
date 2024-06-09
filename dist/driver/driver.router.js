"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driversRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const driver_controller_1 = require("./driver.controller");
exports.driversRouter = new hono_1.Hono();
//get all address      
exports.driversRouter.get("/drivers", driver_controller_1.listDriver);
//get a single address   
exports.driversRouter.get("/drivers/:id", driver_controller_1.getDriver);
// create a address 
exports.driversRouter.post("/drivers", (0, zod_validator_1.zValidator)('json', validators_1.driverSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), driver_controller_1.createDriver);
exports.driversRouter.put("/drivers/:id", driver_controller_1.updateDriver);
exports.driversRouter.delete("/drivers/:id", driver_controller_1.deleteDriver);
