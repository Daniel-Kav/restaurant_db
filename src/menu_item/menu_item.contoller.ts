import { Context } from "hono";
import { createmenuItemService, deletemenuItemService, getMenuItemsByCategoryService, getMenuItemsByRestaurantService, getRestaurantMenuByCategoryNameService, getmenuItemService, menuItemService, updatemenuItemService } from "./menu_item.service";
import { menuItem } from "../drizzle/schema";
import db from "../drizzle/db";
import { eq } from "drizzle-orm";

export const listmenuItem = async (c: Context) => {
    try {
        //limit the number of users to be returned

        const limit = Number(c.req.query('limit'))

        const data = await menuItemService(limit);
        if (data == null || data.length == 0) {
            return c.text("State not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getmenuItem = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const City = await getmenuItemService(id);
    if (City == undefined) {
        return c.text("menuItem not found", 404);
    }
    return c.json(City, 200);
}
export const createmenuItem = async (c: Context) => {
    try {
        const Category = await c.req.json();
        const createdCity = await createmenuItemService(Category);
        //
        if (!createdCity) return c.text("menuItem not created", 404);
        return c.json({ msg: createdCity }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updatemenuItem = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const City = await c.req.json();
    try {
        // search for the user
        const searchedCategory = await getmenuItemService(id);
        if (searchedCategory == undefined) return c.text("menuItem not found", 404);
        // get the data and update it
        const res = await updatemenuItemService(id, City);
        // return a success message
        if (!res) return c.text("menuItem not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deletemenuItem = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const Category = await getmenuItemService(id);
        if (Category == undefined) return c.text("menuItem not found", 404);
        //deleting the user
        const res = await deletemenuItemService(id);
        if (!res) return c.text("menuItem not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

// Controller to get menu items by restaurant ID
export const getMenuItemsByRestaurantController = async (c: Context) => {
  try {
    const restaurantId = parseInt(c.req.param('id'), 10);

    if (isNaN(restaurantId)) {
      return c.json({ error: 'Invalid restaurant ID' }, 400);
    }

    const menuItems = await getMenuItemsByRestaurantService(restaurantId);

    if (!menuItems.length) {
      return c.json({ error: 'Menu items not found for this restaurant' }, 404);
    }

    return c.json({ menuItems });
  } catch (error) {
    console.error('Error fetching menu items for restaurant:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
};

// Controller to get menu items by category ID
export const getMenuItemsByCategoryController = async (c: Context) => {
  try {
    const categoryId = parseInt(c.req.param('id'), 10);

    if (isNaN(categoryId)) {
      return c.json({ error: 'Invalid category ID' }, 400);
    }

    const menuItems = await getMenuItemsByCategoryService(categoryId);

    if (!menuItems.length) {
      return c.json({ error: 'Menu items not found for this category' }, 404);
    }

    return c.json({ menuItems });
  } catch (error) {
    console.error('Error fetching menu items for category:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
};

// Controller to get menu items by category name for a specific restaurant
export const getRestaurantMenuByCategoryNameController = async (c: Context) => {
  try {
    const restaurantId = parseInt(c.req.param('restaurantId'), 10);
    const categoryName = c.req.query('categoryName');

    if (isNaN(restaurantId)) {
      return c.json({ error: 'Invalid restaurant ID' }, 400);
    }

    if (!categoryName) {
      return c.json({ error: 'Missing categoryName' }, 400);
    }

    const menuItems = await getRestaurantMenuByCategoryNameService(restaurantId, categoryName);

    if (!menuItems) {
      return c.json({ message: 'No menu items found for the specified category in this restaurant' }, 404);
    }

    return c.json({ menuItems });
  } catch (error) {
    console.error('Error getting menu items:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
};


