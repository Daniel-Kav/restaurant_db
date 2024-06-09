"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurantsByCityController = exports.getCitiesByStateController = exports.deleteState = exports.updateState = exports.createState = exports.getState = exports.listState = void 0;
const state_service_1 = require("./state.service");
const listState = async (c) => {
    try {
        //limit the number of users to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, state_service_1.stateService)(limit);
        if (data == null || data.length == 0) {
            return c.text("State not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listState = listState;
const getState = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const City = await (0, state_service_1.getstateService)(id);
    if (City == undefined) {
        return c.text("State not found", 404);
    }
    return c.json(City, 200);
};
exports.getState = getState;
const createState = async (c) => {
    try {
        const Category = await c.req.json();
        const createdCity = await (0, state_service_1.createstateService)(Category);
        //
        if (!createdCity)
            return c.text("State not created", 404);
        return c.json({ msg: createdCity }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createState = createState;
const updateState = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const City = await c.req.json();
    try {
        // search for the user
        const searchedCategory = await (0, state_service_1.getstateService)(id);
        if (searchedCategory == undefined)
            return c.text("State not found", 404);
        // get the data and update it
        const res = await (0, state_service_1.updatestateService)(id, City);
        // return a success message
        if (!res)
            return c.text("State not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateState = updateState;
const deleteState = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the user
        const Category = await (0, state_service_1.getstateService)(id);
        if (Category == undefined)
            return c.text("State not found", 404);
        //deleting the user
        const res = await (0, state_service_1.deletestateService)(id);
        if (!res)
            return c.text("State not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteState = deleteState;
const getCitiesByStateController = async (c) => {
    try {
        const stateId = parseInt(c.req.param('id'), 10);
        if (isNaN(stateId)) {
            return c.json({ error: 'Invalid state ID' }, 400);
        }
        const cities = await (0, state_service_1.getCitiesByStateService)(stateId);
        if (!cities.length) {
            return c.json({ error: 'No cities found for this state' }, 404);
        }
        return c.json({ cities });
    }
    catch (error) {
        console.error('Error fetching cities for state:', error);
        return c.json({ error: 'Internal server error' }, 500);
    }
};
exports.getCitiesByStateController = getCitiesByStateController;
// Controller to fetch restaurants by city ID
const getRestaurantsByCityController = async (c) => {
    try {
        const cityId = parseInt(c.req.param('cityId'), 10);
        if (isNaN(cityId)) {
            return c.json({ error: 'Invalid city ID' }, 400);
        }
        const restaurants = await (0, state_service_1.getRestaurantsByCityService)(cityId);
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
