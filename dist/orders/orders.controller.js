"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersByUserController = exports.deleteOrder = exports.updateOrder = exports.createOrder = exports.getOrder = exports.listOrder = void 0;
const orders_service_1 = require("./orders.service");
const listOrder = async (c) => {
    try {
        //limit the number of users to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, orders_service_1.orderService)(limit);
        if (data == null || data.length == 0) {
            return c.text("Order not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listOrder = listOrder;
const getOrder = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const City = await (0, orders_service_1.getorderService)(id);
    if (City == undefined) {
        return c.text("Order not found", 404);
    }
    return c.json(City, 200);
};
exports.getOrder = getOrder;
const createOrder = async (c) => {
    try {
        const Category = await c.req.json();
        const createdCity = await (0, orders_service_1.createorderService)(Category);
        //
        if (!createdCity)
            return c.text("Order not created", 404);
        return c.json({ msg: createdCity }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createOrder = createOrder;
const updateOrder = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const City = await c.req.json();
    try {
        // search for the user
        const searchedCategory = await (0, orders_service_1.getorderService)(id);
        if (searchedCategory == undefined)
            return c.text("Order not found", 404);
        // get the data and update it
        const res = await (0, orders_service_1.updateorderyService)(id, City);
        // return a success message
        if (!res)
            return c.text("Order not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateOrder = updateOrder;
const deleteOrder = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the user
        const Category = await (0, orders_service_1.getorderService)(id);
        if (Category == undefined)
            return c.text("Order not found", 404);
        //deleting the user
        const res = await (0, orders_service_1.deleteorderService)(id);
        if (!res)
            return c.text("Order not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteOrder = deleteOrder;
const getOrdersByUserController = async (c) => {
    try {
        const userId = parseInt(c.req.param('id'), 10);
        if (isNaN(userId)) {
            return c.json({ error: 'Invalid user ID' }, 400);
        }
        const orders = await (0, orders_service_1.getOrdersByUserService)(userId);
        if (!orders.length) {
            return c.json({ error: 'No orders found for this user' }, 400);
        }
        return c.json({ orders });
    }
    catch (error) {
        console.error('Error fetching orders for user:', error);
        return c.json({ error: 'Internal server error fetching order' }, 500);
    }
};
exports.getOrdersByUserController = getOrdersByUserController;
