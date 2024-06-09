"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchAddress = exports.deleteAddress = exports.updateAddress = exports.createAddress = exports.getAddress = exports.listAddress = void 0;
const address_service_1 = require("./address.service");
const listAddress = async (c) => {
    try {
        //limit the number of users to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, address_service_1.adresService)(limit);
        if (data == null || data.length == 0) {
            return c.text("address not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listAddress = listAddress;
const getAddress = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const Address = await (0, address_service_1.getAdresService)(id);
    if (Address == undefined) {
        return c.text("address not found", 404);
    }
    return c.json(Address, 200);
};
exports.getAddress = getAddress;
const createAddress = async (c) => {
    try {
        const Address = await c.req.json();
        const createdAddress = await (0, address_service_1.createAdresService)(Address);
        //
        if (!createdAddress)
            return c.text("User not created", 404);
        return c.json({ msg: createdAddress }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createAddress = createAddress;
const updateAddress = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const Address = await c.req.json();
    try {
        // search for the user
        const searchedAddress = await (0, address_service_1.getAdresService)(id);
        if (searchedAddress == undefined)
            return c.text("Address not found", 404);
        // get the data and update it
        const res = await (0, address_service_1.updateAdresService)(id, Address);
        // return a success message
        if (!res)
            return c.text("Address not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateAddress = updateAddress;
const deleteAddress = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the user
        const user = await (0, address_service_1.getAdresService)(id);
        if (user == undefined)
            return c.text("Address not found", 404);
        //deleting the user
        const res = await (0, address_service_1.deleteAdresService)(id);
        if (!res)
            return c.text("Address not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteAddress = deleteAddress;
// search adresses 
const searchAddress = async (c) => {
    try {
        const searchTerm = c.req.query('searchTerm');
        if (!searchTerm) {
            return c.json({ error: 'Search term is required' }, 400);
        }
        const users = await (0, address_service_1.searchAddresService)(searchTerm);
        return c.json({ users });
    }
    catch (error) {
        console.error('Error searching address:', error);
        return c.json({ error: 'Error searching address' }, 500);
    }
};
exports.searchAddress = searchAddress;
