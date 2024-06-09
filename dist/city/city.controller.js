"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurantsByCityController = exports.searchCitiesController = exports.deleteCity = exports.updateCity = exports.createCity = exports.getCity = exports.listCity = void 0;
const city_service_1 = require("./city.service");
const listCity = async (c) => {
    try {
        //limit the number of users to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, city_service_1.cityService)(limit);
        if (data == null || data.length == 0) {
            return c.text("City not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listCity = listCity;
const getCity = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const City = await (0, city_service_1.getcityService)(id);
    if (City == undefined) {
        return c.text("City not found", 404);
    }
    return c.json(City, 200);
};
exports.getCity = getCity;
const createCity = async (c) => {
    try {
        const Category = await c.req.json();
        const createdCity = await (0, city_service_1.createcityService)(Category);
        //
        if (!createdCity)
            return c.text("City not created", 404);
        return c.json({ msg: createdCity }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createCity = createCity;
const updateCity = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const City = await c.req.json();
    try {
        // search for the user
        const searchedCategory = await (0, city_service_1.getcityService)(id);
        if (searchedCategory == undefined)
            return c.text("City not found", 404);
        // get the data and update it
        const res = await (0, city_service_1.updatecityService)(id, City);
        // return a success message
        if (!res)
            return c.text("City not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateCity = updateCity;
const deleteCity = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the user
        const Category = await (0, city_service_1.getcityService)(id);
        if (Category == undefined)
            return c.text("City not found", 404);
        //deleting the user
        const res = await (0, city_service_1.deletecityService)(id);
        if (!res)
            return c.text("City not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteCity = deleteCity;
// Controller to search for a city using a search term
const searchCitiesController = async (c) => {
    try {
        const searchTerm = c.req.query('searchTerm');
        if (!searchTerm) {
            return c.json({ error: 'Missing searchTerm' }, 400);
        }
        const cities = await (0, city_service_1.searchCitiesService)(searchTerm);
        if (cities.length === 0) {
            return c.json({ message: 'No cities found' }, 404);
        }
        return c.json({ cities });
    }
    catch (error) {
        console.error('Error searching cities:', error);
        return c.json({ error: 'Internal server error' }, 500);
    }
};
exports.searchCitiesController = searchCitiesController;
const getRestaurantsByCityController = async (c) => {
    try {
        const cityId = parseInt(c.req.param('id'), 10);
        if (isNaN(cityId)) {
            return c.json({ error: 'Invalid city ID' }, 400);
        }
        const restaurants = await (0, city_service_1.getRestaurantsByCityService)(cityId);
        if (!restaurants.length) {
            return c.json({ error: 'No restaurants found for this city' }, 404);
        }
        return c.json({ restaurants });
    }
    catch (error) {
        console.error('Error fetching restaurants for city:', error);
        return c.json({ error: 'Internal server error' }, 500);
    }
};
exports.getRestaurantsByCityController = getRestaurantsByCityController;
