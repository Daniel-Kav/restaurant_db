"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderStatusController = exports.deleteorderStatus = exports.updateorderStatus = exports.createorderStatus = exports.getorderStatus = exports.listorderStatus = void 0;
const order_status_service_1 = require("./order_status.service");
const listorderStatus = async (c) => {
    try {
        //limit the number of users to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, order_status_service_1.orderStatusService)(limit);
        if (data == null || data.length == 0) {
            return c.text("orderStatus not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listorderStatus = listorderStatus;
const getorderStatus = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const City = await (0, order_status_service_1.getorderStatusService)(id);
    if (City == undefined) {
        return c.text("orderStatus not found", 404);
    }
    return c.json(City, 200);
};
exports.getorderStatus = getorderStatus;
const createorderStatus = async (c) => {
    try {
        const Category = await c.req.json();
        const createdCity = await (0, order_status_service_1.createorderStatusService)(Category);
        //
        if (!createdCity)
            return c.text("orderStatus not created", 404);
        return c.json({ msg: createdCity }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createorderStatus = createorderStatus;
const updateorderStatus = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const City = await c.req.json();
    try {
        // search for the user
        const searchedCategory = await (0, order_status_service_1.getorderStatusService)(id);
        if (searchedCategory == undefined)
            return c.text("orderStatus not found", 404);
        // get the data and update it
        const res = await (0, order_status_service_1.updateorderStatusService)(id, City);
        // return a success message
        if (!res)
            return c.text("orderStatus not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateorderStatus = updateorderStatus;
const deleteorderStatus = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the user
        const Category = await (0, order_status_service_1.getorderStatusService)(id);
        if (Category == undefined)
            return c.text("orderStatus not found", 404);
        //deleting the user
        const res = await (0, order_status_service_1.deleteorderStatusService)(id);
        if (!res)
            return c.text("orderStatus not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteorderStatus = deleteorderStatus;
// Controller to get the status of a particular order
const getOrderStatusController = async (c) => {
    try {
        const orderId = parseInt(c.req.param('id'), 10);
        if (isNaN(orderId)) {
            return c.json({ error: 'Invalid order ID' }, 400);
        }
        const orderStatus = await (0, order_status_service_1.getOrderStatusService)(orderId);
        if (!orderStatus.length) {
            return c.json({ error: 'Order status not found' }, 404);
        }
        return c.json({ orderStatus });
    }
    catch (error) {
        console.error('Error fetching order status:', error);
        return c.json({ error: 'Internal server error' }, 500);
    }
};
exports.getOrderStatusController = getOrderStatusController;
