import { Context } from "hono";
import { createstatusCatalogService, deletestatusCatalogService, getstatusCatalogService, statusCatalogService, updatestatusCatalogService } from "./statuscatalog.service";

export const liststatusCatalog = async (c: Context) => {
    try {
        //limit the number of users to be returned

        const limit = Number(c.req.query('limit'))

        const data = await statusCatalogService(limit);
        if (data == null || data.length == 0) {
            return c.text("statusCatalog not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getstatusCatalog = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const City = await getstatusCatalogService(id);
    if (City == undefined) {
        return c.text("statusCatalog not found", 404);
    }
    return c.json(City, 200);
}
export const createstatusCatalog = async (c: Context) => {
    try {
        const Category = await c.req.json();
        const createdCity = await createstatusCatalogService(Category);
        //
        if (!createdCity) return c.text("statusCatalog not created", 404);
        return c.json({ msg: createdCity }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updatestatusCatalog = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const City = await c.req.json();
    try {
        // search for the user
        const searchedCategory = await getstatusCatalogService(id);
        if (searchedCategory == undefined) return c.text("statusCatalog not found", 404);
        // get the data and update it
        const res = await updatestatusCatalogService(id, City);
        // return a success message
        if (!res) return c.text("statusCatalog not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deletestatusCatalog = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const Category = await getstatusCatalogService(id);
        if (Category == undefined) return c.text("statusCatalog not found", 404);
        //deleting the user
        const res = await deletestatusCatalogService(id);
        if (!res) return c.text("statusCatalog not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}