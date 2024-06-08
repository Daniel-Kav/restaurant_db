import { Context } from "hono";
import { createdriverService, deletedriverService, driverService, getdriverService, updatedriverService } from "./driver.service";

export const listDriver = async (c: Context) => {
    try {
        //limit the number of users to be returned

        const limit = Number(c.req.query('limit'))

        const data = await driverService(limit);
        if (data == null || data.length == 0) {
            return c.text("Driver not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getDriver = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const City = await getdriverService(id);
    if (City == undefined) {
        return c.text("Driver not found", 404);
    }
    return c.json(City, 200);
}
export const createDriver = async (c: Context) => {
    try {
        const Category = await c.req.json();
        const createdCity = await createdriverService(Category);
        //
        if (!createdCity) return c.text("Driver not created", 404);
        return c.json({ msg: createdCity }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateDriver = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const City = await c.req.json();
    try {
        // search for the user
        const searchedCategory = await getdriverService(id);
        if (searchedCategory == undefined) return c.text("Driver not found", 404);
        // get the data and update it
        const res = await updatedriverService(id, City);
        // return a success message
        if (!res) return c.text("Driver not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteDriver = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const Category = await getdriverService(id);
        if (Category == undefined) return c.text("Driver not found", 404);
        //deleting the user
        const res = await deletedriverService(id);
        if (!res) return c.text("Driver not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}