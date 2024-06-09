import { Context } from "hono";
import { cityService, createcityService, deletecityService, getRestaurantsByCityService, getcityService, searchCitiesService, updatecityService } from "./city.service";

export const listCity = async (c: Context) => {
    try {
        //limit the number of users to be returned

        const limit = Number(c.req.query('limit'))

        const data = await cityService(limit);
        if (data == null || data.length == 0) {
            return c.text("City not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getCity = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const City = await getcityService(id);
    if (City == undefined) {
        return c.text("City not found", 404);
    }
    return c.json(City, 200);
}
export const createCity = async (c: Context) => {
    try {
        const Category = await c.req.json();
        const createdCity = await createcityService(Category);
        //
        if (!createdCity) return c.text("City not created", 404);
        return c.json({ msg: createdCity }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateCity = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const City = await c.req.json();
    try {
        // search for the user
        const searchedCategory = await getcityService(id);
        if (searchedCategory == undefined) return c.text("City not found", 404);
        // get the data and update it
        const res = await updatecityService(id, City);
        // return a success message
        if (!res) return c.text("City not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteCity = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const Category = await getcityService(id);
        if (Category == undefined) return c.text("City not found", 404);
        //deleting the user
        const res = await deletecityService(id);
        if (!res) return c.text("City not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

// Controller to search for a city using a search term
export const searchCitiesController = async (c: Context) => {
  try {
    const searchTerm = c.req.query('searchTerm');

    if (!searchTerm) {
      return c.json({ error: 'Missing searchTerm' }, 400);
    }

    const cities = await searchCitiesService(searchTerm);

    if (cities.length === 0) {
      return c.json({ message: 'No cities found' }, 404);
    }

    return c.json({ cities });
  } catch (error) {
    console.error('Error searching cities:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
};


export const getRestaurantsByCityController = async (c: Context) => {
  try {
    const cityId = parseInt(c.req.param('id'), 10);

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