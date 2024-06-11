import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { categorySchema } from "../validators";
import { createCategory, deleteCategory, getCategory, listCategory, searchCategories } from "../category/category.controller";
// import { adminRoleAuth } from "../middleware/bearAuth";
export const categoryRouter = new Hono();

//get all address      
categoryRouter.get("/categories",listCategory);
//get a single address   
categoryRouter.get("/categories/:id", getCategory)
// create a address 
categoryRouter.post("/categories",  zValidator('json', categorySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),  createCategory)
//update aaddresscityRouterr.put("categories/:id", updateCity)
categoryRouter.delete("/categories/:id", deleteCategory)

categoryRouter.get("/search/categories", searchCategories)
