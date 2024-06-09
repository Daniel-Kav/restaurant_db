"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const category_controller_1 = require("../category/category.controller");
exports.categoryRouter = new hono_1.Hono();
//get all address      
exports.categoryRouter.get("/categories", category_controller_1.listCategory);
//get a single address   
exports.categoryRouter.get("/categories/:id", category_controller_1.getCategory);
// create a address 
exports.categoryRouter.post("/categories", (0, zod_validator_1.zValidator)('json', validators_1.categorySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), category_controller_1.createCategory);
//update aaddresscityRouterr.put("categories/:id", updateCity)
exports.categoryRouter.delete("/categories/:id", category_controller_1.deleteCategory);
exports.categoryRouter.get("/search/categories", category_controller_1.searchCategories);
