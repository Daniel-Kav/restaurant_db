"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusCatalogRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const statuscatalog_controller_1 = require("./statuscatalog.controller");
exports.statusCatalogRouter = new hono_1.Hono();
//get all address      
exports.statusCatalogRouter.get("/statusCatalog", statuscatalog_controller_1.liststatusCatalog);
//get a single address   
exports.statusCatalogRouter.get("/statusCatalog/:id", statuscatalog_controller_1.getstatusCatalog);
// create a address 
exports.statusCatalogRouter.post("/statusCatalog", (0, zod_validator_1.zValidator)('json', validators_1.statusCatalogSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), statuscatalog_controller_1.createstatusCatalog);
// update a status
exports.statusCatalogRouter.put("/statusCatalog/:id", statuscatalog_controller_1.updatestatusCatalog);
// delete  a status
exports.statusCatalogRouter.delete("/statusCatalog/:id", statuscatalog_controller_1.deletestatusCatalog);
