import { Context } from "hono";
import { createstateService, deletestateService, getCitiesByStateService, getRestaurantsByCityService, getstateService, stateService, updatestateService } from "./state.service";

export const listState = async (c: Context) => {
    try {
        //limit the number of users to be returned

        const limit = Number(c.req.query('limit'))

        const data = await stateService(limit);
        if (data == null || data.length == 0) {
            return c.text("State not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getState = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const City = await getstateService(id);
    if (City == undefined) {
        return c.text("State not found", 404);
    }
    return c.json(City, 200);
}
export const createState = async (c: Context) => {
    try {
        const Category = await c.req.json();
        const createdCity = await createstateService(Category);
        //
        if (!createdCity) return c.text("State not created", 404);
        return c.json({ msg: createdCity }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateState = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const City = await c.req.json();
    try {
        // search for the user
        const searchedCategory = await getstateService(id);
        if (searchedCategory == undefined) return c.text("State not found", 404);
        // get the data and update it
        const res = await updatestateService(id, City);
        // return a success message
        if (!res) return c.text("State not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteState = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const Category = await getstateService(id);
        if (Category == undefined) return c.text("State not found", 404);
        //deleting the user
        const res = await deletestateService(id);
        if (!res) return c.text("State not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getCitiesByStateController = async (c: Context) => {
  try {
    const stateId = parseInt(c.req.param('id'), 10);

    if (isNaN(stateId)) {
      return c.json({ error: 'Invalid state ID' }, 400);
    }

    const cities = await getCitiesByStateService(stateId);

    if (!cities.length) {
      return c.json({ error: 'No cities found for this state' }, 404);
    }

    return c.json({ cities });
  } catch (error) {
    console.error('Error fetching cities for state:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
};

// Controller to fetch restaurants by city ID
export const getRestaurantsByCityController = async (c: Context) => {
  try {
    const cityId = parseInt(c.req.param('cityId'), 10);

    if (isNaN(cityId)) {
      return c.json({ error: 'Invalid city ID' }, 400);
    }

    const restaurants = await getRestaurantsByCityService(cityId);

    if (!restaurants.length) {
      return c.json({ error: 'No restaurants found for this city' }, 404);
    }

    return c.json({ restaurants });
  } catch (error) {
    console.error('Error fetching restaurants for city:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
};