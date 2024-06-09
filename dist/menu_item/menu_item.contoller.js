"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurantMenuByCategoryNameController = exports.getMenuItemsByCategoryController = exports.getMenuItemsByRestaurantController = exports.deletemenuItem = exports.updatemenuItem = exports.createmenuItem = exports.getmenuItem = exports.listmenuItem = void 0;
const menu_item_service_1 = require("./menu_item.service");
const listmenuItem = async (c) => {
    try {
        //limit the number of users to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, menu_item_service_1.menuItemService)(limit);
        if (data == null || data.length == 0) {
            return c.text("State not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listmenuItem = listmenuItem;
const getmenuItem = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const City = await (0, menu_item_service_1.getmenuItemService)(id);
    if (City == undefined) {
        return c.text("menuItem not found", 404);
    }
    return c.json(City, 200);
};
exports.getmenuItem = getmenuItem;
const createmenuItem = async (c) => {
    try {
        const Category = await c.req.json();
        const createdCity = await (0, menu_item_service_1.createmenuItemService)(Category);
        //
        if (!createdCity)
            return c.text("menuItem not created", 404);
        return c.json({ msg: createdCity }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createmenuItem = createmenuItem;
const updatemenuItem = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const City = await c.req.json();
    try {
        // search for the user
        const searchedCategory = await (0, menu_item_service_1.getmenuItemService)(id);
        if (searchedCategory == undefined)
            return c.text("menuItem not found", 404);
        // get the data and update it
        const res = await (0, menu_item_service_1.updatemenuItemService)(id, City);
        // return a success message
        if (!res)
            return c.text("menuItem not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updatemenuItem = updatemenuItem;
const deletemenuItem = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the user
        const Category = await (0, menu_item_service_1.getmenuItemService)(id);
        if (Category == undefined)
            return c.text("menuItem not found", 404);
        //deleting the user
        const res = await (0, menu_item_service_1.deletemenuItemService)(id);
        if (!res)
            return c.text("menuItem not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deletemenuItem = deletemenuItem;
// Controller to get menu items by restaurant ID
const getMenuItemsByRestaurantController = async (c) => {
    try {
        const restaurantId = parseInt(c.req.param('id'), 10);
        if (isNaN(restaurantId)) {
            return c.json({ error: 'Invalid restaurant ID' }, 400);
        }
        const menuItems = await (0, menu_item_service_1.getMenuItemsByRestaurantService)(restaurantId);
        if (!menuItems.length) {
            return c.json({ error: 'Menu items not found for this restaurant' }, 404);
        }
        return c.json({ menuItems });
    }
    catch (error) {
        console.error('Error fetching menu items for restaurant:', error);
        return c.json({ error: 'Internal server error' }, 500);
    }
};
exports.getMenuItemsByRestaurantController = getMenuItemsByRestaurantController;
// Controller to get menu items by category ID
const getMenuItemsByCategoryController = async (c) => {
    try {
        const categoryId = parseInt(c.req.param('id'), 10);
        if (isNaN(categoryId)) {
            return c.json({ error: 'Invalid category ID' }, 400);
        }
        const menuItems = await (0, menu_item_service_1.getMenuItemsByCategoryService)(categoryId);
        if (!menuItems.length) {
            return c.json({ error: 'Menu items not found for this category' }, 404);
        }
        return c.json({ menuItems });
    }
    catch (error) {
        console.error('Error fetching menu items for category:', error);
        return c.json({ error: 'Internal server error' }, 500);
    }
};
exports.getMenuItemsByCategoryController = getMenuItemsByCategoryController;
// Controller to get menu items by category name for a specific restaurant
const getRestaurantMenuByCategoryNameController = async (c) => {
    try {
        const restaurantId = parseInt(c.req.param('restaurantId'), 10);
        const categoryName = c.req.query('categoryName');
        if (isNaN(restaurantId)) {
            return c.json({ error: 'Invalid restaurant ID' }, 400);
        }
        if (!categoryName) {
            return c.json({ error: 'Missing categoryName' }, 400);
        }
        const menuItems = await (0, menu_item_service_1.getRestaurantMenuByCategoryNameService)(restaurantId, categoryName);
        if (!menuItems) {
            return c.json({ message: 'No menu items found for the specified category in this restaurant' }, 404);
        }
        return c.json({ menuItems });
    }
    catch (error) {
        console.error('Error getting menu items:', error);
        return c.json({ error: 'Internal server error' }, 500);
    }
};
exports.getRestaurantMenuByCategoryNameController = getRestaurantMenuByCategoryNameController;
