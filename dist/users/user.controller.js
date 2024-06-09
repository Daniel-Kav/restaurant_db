"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurantsByOwnerController = exports.getAddressesByUserController = exports.getUsersByOrderController = exports.searchUsers = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.listUsers = void 0;
const user_service_1 = require("./user.service");
const listUsers = async (c) => {
    try {
        //limit the number of users to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, user_service_1.usersService)(limit);
        if (data == null || data.length == 0) {
            return c.text("User not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listUsers = listUsers;
const getUser = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const user = await (0, user_service_1.getUserService)(id);
    if (user == undefined) {
        return c.text("User not found", 404);
    }
    return c.json(user, 200);
};
exports.getUser = getUser;
const createUser = async (c) => {
    try {
        const user = await c.req.json();
        const createdUser = await (0, user_service_1.createUserService)(user);
        //
        if (!createdUser)
            return c.text("User not created", 404);
        return c.json({ msg: createdUser }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createUser = createUser;
const updateUser = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const user = await c.req.json();
    try {
        // search for the user
        const searchedUser = await (0, user_service_1.getUserService)(id);
        if (searchedUser == undefined)
            return c.text("User not found", 404);
        // get the data and update it
        const res = await (0, user_service_1.updateUserService)(id, user);
        // return a success message
        if (!res)
            return c.text("User not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the user
        const user = await (0, user_service_1.getUserService)(id);
        if (user == undefined)
            return c.text("User not found", 404);
        //deleting the user
        const res = await (0, user_service_1.deleteUserService)(id);
        if (!res)
            return c.text("User not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteUser = deleteUser;
const searchUsers = async (c) => {
    try {
        const searchTerm = c.req.query('searchTerm');
        if (!searchTerm) {
            return c.json({ error: 'Search term is required' }, 400);
        }
        const users = await (0, user_service_1.searchUsersService)(searchTerm);
        return c.json({ users });
    }
    catch (error) {
        console.error('Error searching users:', error);
        return c.json({ error: 'Error searching users' }, 500);
    }
};
exports.searchUsers = searchUsers;
const getUsersByOrderController = async (c) => {
    try {
        const orderId = parseInt(c.req.param('id'), 10);
        if (isNaN(orderId)) {
            return c.json({ error: 'Invalid order ID' }, 400);
        }
        const users = await (0, user_service_1.getUsersByOrderService)(orderId);
        if (!users.length) {
            return c.json({ error: 'No users found for this order' }, 404);
        }
        return c.json({ users });
    }
    catch (error) {
        console.error('Error fetching users for order:', error);
        return c.json({ error: 'Internal server error' }, 500);
    }
};
exports.getUsersByOrderController = getUsersByOrderController;
const getAddressesByUserController = async (c) => {
    try {
        const userId = parseInt(c.req.param('id'), 10);
        if (isNaN(userId)) {
            return c.json({ error: 'Invalid user ID' }, 400);
        }
        const addresses = await (0, user_service_1.getAddressesByUserService)(userId);
        if (!addresses.length) {
            return c.json({ error: 'No addresses found for this user' }, 404);
        }
        return c.json({ addresses });
    }
    catch (error) {
        console.error('Error fetching addresses for user:', error);
        return c.json({ error: 'Internal server error' }, 500);
    }
};
exports.getAddressesByUserController = getAddressesByUserController;
// Controller to get all restaurants owned by a particular user
const getRestaurantsByOwnerController = async (c) => {
    try {
        const userId = parseInt(c.req.param('id'), 10);
        if (isNaN(userId)) {
            return c.json({ error: 'Invalid user ID' }, 400);
        }
        const restaurants = await (0, user_service_1.getRestaurantsByOwnerService)(userId);
        if (!restaurants.length) {
            return c.json({ error: 'No restaurants found for this user' }, 404);
        }
        return c.json({ restaurants });
    }
    catch (error) {
        console.error('Error fetching restaurants:', error);
        return c.json({ error: 'Internal server error' }, 500);
    }
};
exports.getRestaurantsByOwnerController = getRestaurantsByOwnerController;
