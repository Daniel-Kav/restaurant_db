"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurantOwnerController = exports.deleterestaurantOwner = exports.updaterestaurantOwner = exports.createrestaurantOwner = exports.getrestaurantOwner = exports.listrestaurantOwner = void 0;
const restaurant_owner_service_1 = require("./restaurant_owner.service");
const listrestaurantOwner = async (c) => {
    try {
        //limit the number of users to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, restaurant_owner_service_1.restaurantOwnerService)(limit);
        if (data == null || data.length == 0) {
            return c.text("restaurant Owner not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listrestaurantOwner = listrestaurantOwner;
const getrestaurantOwner = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const City = await (0, restaurant_owner_service_1.getrestaurantOwnerService)(id);
    if (City == undefined) {
        return c.text("restaurant Owner not found", 404);
    }
    return c.json(City, 200);
};
exports.getrestaurantOwner = getrestaurantOwner;
const createrestaurantOwner = async (c) => {
    try {
        const Category = await c.req.json();
        const createdCity = await (0, restaurant_owner_service_1.createrestaurantOwnerService)(Category);
        //
        if (!createdCity)
            return c.text("restaurantOwner not created", 404);
        return c.json({ msg: createdCity }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createrestaurantOwner = createrestaurantOwner;
const updaterestaurantOwner = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const City = await c.req.json();
    try {
        // search for the user
        const searchedCategory = await (0, restaurant_owner_service_1.getrestaurantOwnerService)(id);
        if (searchedCategory == undefined)
            return c.text("restaurant Owner not found", 404);
        // get the data and update it
        const res = await (0, restaurant_owner_service_1.updaterestaurantOwnerService)(id, City);
        // return a success message
        if (!res)
            return c.text("restaurant Owner not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updaterestaurantOwner = updaterestaurantOwner;
const deleterestaurantOwner = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the user
        const Category = await (0, restaurant_owner_service_1.getrestaurantOwnerService)(id);
        if (Category == undefined)
            return c.text("restaurant Owner not found", 404);
        //deleting the user
        const res = await (0, restaurant_owner_service_1.deleterestaurantOwnerService)(id);
        if (!res)
            return c.text("restaurantOwner not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleterestaurantOwner = deleterestaurantOwner;
// Controller to get the owner of a restaurant by restaurant ID
const getRestaurantOwnerController = async (c) => {
    try {
        const restaurantId = parseInt(c.req.param('id'), 10);
        if (isNaN(restaurantId)) {
            return c.json({ error: 'Invalid restaurant ID' }, 400);
        }
        const ownerData = await (0, restaurant_owner_service_1.getRestaurantOwnerService)(restaurantId);
        if (!ownerData.length) {
            return c.json({ error: 'Owner not found for this restaurant' }, 404);
        }
        return c.json({ owner: ownerData[0] });
    }
    catch (error) {
        console.error('Error fetching restaurant owner:', error);
        return c.json({ error: 'Internal server error' }, 500);
    }
};
exports.getRestaurantOwnerController = getRestaurantOwnerController;
