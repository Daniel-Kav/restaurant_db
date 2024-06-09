import { Context } from "hono";
import { createrestaurantOwnerService, deleterestaurantOwnerService, getRestaurantOwnerService, getrestaurantOwnerService, restaurantOwnerService, updaterestaurantOwnerService } from "./restaurant_owner.service";

export const listrestaurantOwner = async (c: Context) => {
    try {
        //limit the number of users to be returned

        const limit = Number(c.req.query('limit'))

        const data = await restaurantOwnerService(limit);
        if (data == null || data.length == 0) {
            return c.text("restaurant Owner not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getrestaurantOwner = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const City = await getrestaurantOwnerService(id);
    if (City == undefined) {
        return c.text("restaurant Owner not found", 404);
    }
    return c.json(City, 200);
}
export const createrestaurantOwner = async (c: Context) => {
    try {
        const Category = await c.req.json();
        const createdCity = await createrestaurantOwnerService(Category);
        //
        if (!createdCity) return c.text("restaurantOwner not created", 404);
        return c.json({ msg: createdCity }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updaterestaurantOwner = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const City = await c.req.json();
    try {
        // search for the user
        const searchedCategory = await getrestaurantOwnerService(id);
        if (searchedCategory == undefined) return c.text("restaurant Owner not found", 404);
        // get the data and update it
        const res = await updaterestaurantOwnerService(id, City);
        // return a success message
        if (!res) return c.text("restaurant Owner not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleterestaurantOwner = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const Category = await getrestaurantOwnerService(id);
        if (Category == undefined) return c.text("restaurant Owner not found", 404);
        //deleting the user
        const res = await deleterestaurantOwnerService(id);
        if (!res) return c.text("restaurantOwner not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

// Controller to get the owner of a restaurant by restaurant ID
export const getRestaurantOwnerController = async (c: Context) => {
  try {
    const restaurantId = parseInt(c.req.param('id'), 10);

    if (isNaN(restaurantId)) {
      return c.json({ error: 'Invalid restaurant ID' }, 400);
    }

    const ownerData = await getRestaurantOwnerService(restaurantId);

    if (!ownerData.length) {
      return c.json({ error: 'Owner not found for this restaurant' }, 404);
    }

    return c.json({ owner: ownerData[0] });
  } catch (error) {
    console.error('Error fetching restaurant owner:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
};