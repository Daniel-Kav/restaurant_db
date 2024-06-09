"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDriver = exports.updateDriver = exports.createDriver = exports.getDriver = exports.listDriver = void 0;
const driver_service_1 = require("./driver.service");
const listDriver = async (c) => {
    try {
        //limit the number of users to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, driver_service_1.driverService)(limit);
        if (data == null || data.length == 0) {
            return c.text("Driver not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listDriver = listDriver;
const getDriver = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const City = await (0, driver_service_1.getdriverService)(id);
    if (City == undefined) {
        return c.text("Driver not found", 404);
    }
    return c.json(City, 200);
};
exports.getDriver = getDriver;
const createDriver = async (c) => {
    try {
        const Category = await c.req.json();
        const createdCity = await (0, driver_service_1.createdriverService)(Category);
        //
        if (!createdCity)
            return c.text("Driver not created", 404);
        return c.json({ msg: createdCity }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createDriver = createDriver;
const updateDriver = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const City = await c.req.json();
    try {
        // search for the user
        const searchedCategory = await (0, driver_service_1.getdriverService)(id);
        if (searchedCategory == undefined)
            return c.text("Driver not found", 404);
        // get the data and update it
        const res = await (0, driver_service_1.updatedriverService)(id, City);
        // return a success message
        if (!res)
            return c.text("Driver not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateDriver = updateDriver;
const deleteDriver = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the user
        const Category = await (0, driver_service_1.getdriverService)(id);
        if (Category == undefined)
            return c.text("Driver not found", 404);
        //deleting the user
        const res = await (0, driver_service_1.deletedriverService)(id);
        if (!res)
            return c.text("Driver not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteDriver = deleteDriver;
