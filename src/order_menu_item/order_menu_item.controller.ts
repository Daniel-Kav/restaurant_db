import { Context } from "hono";
import { createorderMenuItemService, deleteorderMenuItemService, getorderMenuItemService, orderMenuItemService, updateorderMenuItemService } from "./order_menu_item.service";

export const listorderMenuItem = async (c: Context) => {
    try {
        //limit the number of users to be returned

        const limit = Number(c.req.query('limit'))

        const data = await orderMenuItemService(limit);
        if (data == null || data.length == 0) {
            return c.text("orderMenuItem not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getorderMenuItem = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const City = await getorderMenuItemService(id);
    if (City == undefined) {
        return c.text("orderMenuItem not found", 404);
    }
    return c.json(City, 200);
}
export const createorderMenuItem = async (c: Context) => {
    try {
        const Category = await c.req.json();
        const createdCity = await createorderMenuItemService(Category);
        //
        if (!createdCity) return c.text("orderMenuItem not created", 404);
        return c.json({ msg: createdCity }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateorderMenuItem = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const City = await c.req.json();
    try {
        // search for the user
        const searchedCategory = await getorderMenuItemService(id);
        if (searchedCategory == undefined) return c.text("orderMenuItem not found", 404);
        // get the data and update it
        const res = await updateorderMenuItemService(id, City);
        // return a success message
        if (!res) return c.text("orderMenuItem not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteorderMenuItem = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const Category = await getorderMenuItemService(id);
        if (Category == undefined) return c.text("orderMenuItem not found", 404);
        //deleting the user
        const res = await deleteorderMenuItemService(id);
        if (!res) return c.text("orderMenuItem not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}