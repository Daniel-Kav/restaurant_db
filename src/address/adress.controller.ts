import { Context } from "hono";
import { adresService, createAdresService, deleteAdresService, getAdresService,  searchAddresService, updateAdresService } from "./address.service";

export const listAddress = async (c: Context) => {
    try {
        //limit the number of users to be returned

        const limit = Number(c.req.query('limit'))

        const data = await adresService(limit);
        if (data == null || data.length == 0) {
            return c.text("address not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getAddress = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Address = await getAdresService(id);
    if (Address == undefined) {
        return c.text("address not found", 404);
    }
    return c.json(Address, 200);
}
export const createAddress = async (c: Context) => {
    try {
        const Address = await c.req.json();
        const createdAddress = await createAdresService(Address);
        //
        if (!createdAddress) return c.text("User not created", 404);
        return c.json({ msg: createdAddress }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateAddress = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Address = await c.req.json();
    try {
        // search for the user
        const searchedAddress = await getAdresService(id);
        if (searchedAddress == undefined) return c.text("Address not found", 404);
        // get the data and update it
        const res = await updateAdresService(id, Address);
        // return a success message
        if (!res) return c.text("Address not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteAddress = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const user = await getAdresService(id);
        if (user == undefined) return c.text("Address not found", 404);
        //deleting the user
        const res = await deleteAdresService(id);
        if (!res) return c.text("Address not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

// search adresses 
export const searchAddress = async (c: Context) => {
    try {
        const searchTerm = c.req.query('searchTerm');

        if (!searchTerm) {
            return c.json({ error: 'Search term is required' }, 400);
        }

        const users = await searchAddresService(searchTerm);

        return c.json({ users });
    } catch (error) {
        console.error('Error searching address:', error);
        return c.json({ error: 'Error searching address' }, 500);
    }
};

