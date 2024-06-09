"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurant = exports.updateRestaurant = exports.createRestaurant = exports.getRestaurants = exports.listRestaurants = void 0;
const restaurant_service_1 = require("./restaurant.service");
const listRestaurants = async (c) => {
    try {
        const restaurants = await (0, restaurant_service_1.restaurantService)();
        if (restaurants == null || restaurants.length == 0) {
            return c.text("restaurants not found", 404);
        }
        return c.json(restaurants, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listRestaurants = listRestaurants;
const getRestaurants = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const user = await (0, restaurant_service_1.getRestaurantService)(id);
    if (user == undefined) {
        return c.text("restaurant not found", 404);
    }
    return c.json(user, 200);
};
exports.getRestaurants = getRestaurants;
// export const  getRestaurants = async (c: Context) => {
//     try {
//         //limit the number of restuarants to be returned
//         const limit = Number(c.req.query('limit'))
//         const data = await limitrestaurantsService(limit);
//         if (data == null || data.length == 0) {
//             return c.text("User not found", 404)
//         }
//         return c.json(data, 200);
//     } catch (error: any) {
//         return c.json({ error: error?.message }, 400)
//     }
// }
const createRestaurant = async (c) => {
    try {
        const restaurant = await c.req.json();
        const createdRestaurant = await (0, restaurant_service_1.createRestaurantService)(restaurant);
        //
        if (!createdRestaurant)
            return c.text("restaurant not created", 404);
        return c.json({ msg: createdRestaurant }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createRestaurant = createRestaurant;
//updating restaurant
const updateRestaurant = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const Restaurant = await c.req.json();
    try {
        // search for the user
        const searchedRestaurant = await (0, restaurant_service_1.getRestaurantService)(id);
        if (searchedRestaurant == undefined)
            return c.text("restaurant not found", 404);
        // get the data and update it
        const res = await (0, restaurant_service_1.updateRestaurantService)(id, Restaurant);
        // return a success message
        if (!res)
            return c.text("restaurant not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateRestaurant = updateRestaurant;
//deleting a restaurant
const deleteRestaurant = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the restaurant
        const Restaurant = await (0, restaurant_service_1.getRestaurantService)(id);
        if (Restaurant == undefined)
            return c.text("Restaurant not found", 404);
        //deleting the restaurant
        const res = await (0, restaurant_service_1.deleteRestaurantService)(id);
        if (!res)
            return c.text("Restaurant not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteRestaurant = deleteRestaurant;
