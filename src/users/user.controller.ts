import { Context } from "hono";
import { usersService, getUserService, createUserService, updateUserService, deleteUserService, searchUsersService, getUsersByOrderService, getAddressesByUserService, getRestaurantsByOwnerService } from "./user.service";

export const listUsers = async (c: Context) => {
    try {
        //limit the number of users to be returned

        const limit = Number(c.req.query('limit'))

        const data = await usersService(limit);
        if (data == null || data.length == 0) {
            return c.text("User not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getUser = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await getUserService(id);
    if (user == undefined) {
        return c.text("User not found", 404);
    }
    return c.json(user, 200);
}
export const createUser = async (c: Context) => {
    try {
        const user = await c.req.json();
        const createdUser = await createUserService(user);
        //
        if (!createdUser) return c.text("User not created", 404);
        return c.json({ msg: createdUser }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateUser = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await c.req.json();
    try {
        // search for the user
        const searchedUser = await getUserService(id);
        if (searchedUser == undefined) return c.text("User not found", 404);
        // get the data and update it
        const res = await updateUserService(id, user);
        // return a success message
        if (!res) return c.text("User not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteUser = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const user = await getUserService(id);
        if (user == undefined) return c.text("User not found", 404);
        //deleting the user
        const res = await deleteUserService(id);
        if (!res) return c.text("User not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const searchUsers = async (c: Context) => {
    try {
        const searchTerm = c.req.query('searchTerm');

        if (!searchTerm) {
            return c.json({ error: 'Search term is required' }, 400);
        }

        const users = await searchUsersService(searchTerm);

        return c.json({ users });
    } catch (error) {
        console.error('Error searching users:', error);
        return c.json({ error: 'Error searching users' }, 500);
    }
};

export const getUsersByOrderController = async (c: Context) => {
  try {
    const orderId = parseInt(c.req.param('id'), 10);

    if (isNaN(orderId)) {
      return c.json({ error: 'Invalid order ID' }, 400);
    }

    const users = await getUsersByOrderService(orderId);

    if (!users.length) {
      return c.json({ error: 'No users found for this order' }, 404);
    }

    return c.json({ users });
  } catch (error) {
    console.error('Error fetching users for order:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
};

export const getAddressesByUserController = async (c: Context) => {
  try {
    const userId = parseInt(c.req.param('id'), 10);

    if (isNaN(userId)) {
      return c.json({ error: 'Invalid user ID' }, 400);
    }

    const addresses = await getAddressesByUserService(userId);

    if (!addresses.length) {
      return c.json({ error: 'No addresses found for this user' }, 404);
    }

    return c.json({ addresses });
  } catch (error) {
    console.error('Error fetching addresses for user:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
};

// Controller to get all restaurants owned by a particular user
export const getRestaurantsByOwnerController = async (c: Context) => {
  try {
    const userId = parseInt(c.req.param('id'), 10);

    if (isNaN(userId)) {
      return c.json({ error: 'Invalid user ID' }, 400);
    }

    const restaurants = await getRestaurantsByOwnerService(userId);

    if (!restaurants.length) {
      return c.json({ error: 'No restaurants found for this user' }, 404);
    }

    return c.json({ restaurants });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
};