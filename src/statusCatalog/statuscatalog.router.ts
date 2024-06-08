import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { statusCatalogSchema} from "../validators";
import { createstatusCatalog, deletestatusCatalog, getstatusCatalog, liststatusCatalog, updatestatusCatalog } from "./statuscatalog.controller";
export const statusCatalogRouter = new Hono();

//get all address      
statusCatalogRouter.get("/statusCatalog", liststatusCatalog);
//get a single address   
statusCatalogRouter.get("/statusCatalog/:id", getstatusCatalog)
// create a address 
statusCatalogRouter.post("/statusCatalog", zValidator('json', statusCatalogSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createstatusCatalog)

// update a status
statusCatalogRouter.put("/statusCatalog/:id", updatestatusCatalog)
// delete  a status
statusCatalogRouter.delete("/statusCatalog/:id", deletestatusCatalog)
