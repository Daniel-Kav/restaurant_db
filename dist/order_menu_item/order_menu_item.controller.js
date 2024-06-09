"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteorderMenuItem = exports.updateorderMenuItem = exports.createorderMenuItem = exports.getorderMenuItem = exports.listorderMenuItem = void 0;
const order_menu_item_service_1 = require("./order_menu_item.service");
const listorderMenuItem = async (c) => {
    try {
        //limit the number of users to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, order_menu_item_service_1.orderMenuItemService)(limit);
        if (data == null || data.length == 0) {
            return c.text("orderMenuItem not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listorderMenuItem = listorderMenuItem;
const getorderMenuItem = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const City = await (0, order_menu_item_service_1.getorderMenuItemService)(id);
    if (City == undefined) {
        return c.text("orderMenuItem not found", 404);
    }
    return c.json(City, 200);
};
exports.getorderMenuItem = getorderMenuItem;
const createorderMenuItem = async (c) => {
    try {
        const Category = await c.req.json();
        const createdCity = await (0, order_menu_item_service_1.createorderMenuItemService)(Category);
        //
        if (!createdCity)
            return c.text("orderMenuItem not created", 404);
        return c.json({ msg: createdCity }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createorderMenuItem = createorderMenuItem;
const updateorderMenuItem = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const City = await c.req.json();
    try {
        // search for the user
        const searchedCategory = await (0, order_menu_item_service_1.getorderMenuItemService)(id);
        if (searchedCategory == undefined)
            return c.text("orderMenuItem not found", 404);
        // get the data and update it
        const res = await (0, order_menu_item_service_1.updateorderMenuItemService)(id, City);
        // return a success message
        if (!res)
            return c.text("orderMenuItem not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateorderMenuItem = updateorderMenuItem;
const deleteorderMenuItem = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the user
        const Category = await (0, order_menu_item_service_1.getorderMenuItemService)(id);
        if (Category == undefined)
            return c.text("orderMenuItem not found", 404);
        //deleting the user
        const res = await (0, order_menu_item_service_1.deleteorderMenuItemService)(id);
        if (!res)
            return c.text("orderMenuItem not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteorderMenuItem = deleteorderMenuItem;
