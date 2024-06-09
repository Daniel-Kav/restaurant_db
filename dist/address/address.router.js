"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const adress_controller_1 = require("./adress.controller");
exports.AddressRouter = new hono_1.Hono();
//get all address      
exports.AddressRouter.get("/address", adress_controller_1.listAddress);
//get a single address   
exports.AddressRouter.get("/address/:id", adress_controller_1.getAddress);
// create a address 
exports.AddressRouter.post("/address", (0, zod_validator_1.zValidator)('json', validators_1.addressSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), adress_controller_1.createAddress);
//update aaddress
exports.AddressRouter.put("address/:id", adress_controller_1.updateAddress);
exports.AddressRouter.delete("/address/:id", adress_controller_1.deleteAddress);
exports.AddressRouter.get("/search/address", adress_controller_1.searchAddress);
