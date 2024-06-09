"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const state_controller_1 = require("./state.controller");
exports.stateRouter = new hono_1.Hono();
//get all address      
exports.stateRouter.get("/states", state_controller_1.listState);
//get a single address   
exports.stateRouter.get("/states/:id", state_controller_1.getState);
// create a address 
exports.stateRouter.post("/states", (0, zod_validator_1.zValidator)('json', validators_1.stateSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), state_controller_1.createState);
exports.stateRouter.put("/states/:id", state_controller_1.updateState);
exports.stateRouter.delete("/states/:id", state_controller_1.deleteState);
exports.stateRouter.get('states/:id/cities', state_controller_1.getCitiesByStateController);
exports.stateRouter.get('states/:id/cities/:cityId/restaurants', state_controller_1.getRestaurantsByCityController);
