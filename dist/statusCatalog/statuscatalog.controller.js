"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletestatusCatalog = exports.updatestatusCatalog = exports.createstatusCatalog = exports.getstatusCatalog = exports.liststatusCatalog = void 0;
const statuscatalog_service_1 = require("./statuscatalog.service");
const liststatusCatalog = async (c) => {
    try {
        //limit the number of users to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, statuscatalog_service_1.statusCatalogService)(limit);
        if (data == null || data.length == 0) {
            return c.text("statusCatalog not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.liststatusCatalog = liststatusCatalog;
const getstatusCatalog = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const City = await (0, statuscatalog_service_1.getstatusCatalogService)(id);
    if (City == undefined) {
        return c.text("statusCatalog not found", 404);
    }
    return c.json(City, 200);
};
exports.getstatusCatalog = getstatusCatalog;
const createstatusCatalog = async (c) => {
    try {
        const Category = await c.req.json();
        const createdCity = await (0, statuscatalog_service_1.createstatusCatalogService)(Category);
        //
        if (!createdCity)
            return c.text("statusCatalog not created", 404);
        return c.json({ msg: createdCity }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createstatusCatalog = createstatusCatalog;
const updatestatusCatalog = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const City = await c.req.json();
    try {
        // search for the user
        const searchedCategory = await (0, statuscatalog_service_1.getstatusCatalogService)(id);
        if (searchedCategory == undefined)
            return c.text("statusCatalog not found", 404);
        // get the data and update it
        const res = await (0, statuscatalog_service_1.updatestatusCatalogService)(id, City);
        // return a success message
        if (!res)
            return c.text("statusCatalog not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updatestatusCatalog = updatestatusCatalog;
const deletestatusCatalog = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the user
        const Category = await (0, statuscatalog_service_1.getstatusCatalogService)(id);
        if (Category == undefined)
            return c.text("statusCatalog not found", 404);
        //deleting the user
        const res = await (0, statuscatalog_service_1.deletestatusCatalogService)(id);
        if (!res)
            return c.text("statusCatalog not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deletestatusCatalog = deletestatusCatalog;
