import { Context } from "hono";
import { createorderService, deleteorderService, getOrdersByUserService, getorderService, orderService, updateorderyService } from "./orders.service";

export const listOrder = async (c: Context) => {
    try {
        //limit the number of users to be returned

        const limit = Number(c.req.query('limit'))

        const data = await orderService(limit);
        if (data == null || data.length == 0) {
            return c.text("Order not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getOrder = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const City = await getorderService(id);
    if (City == undefined) {
        return c.text("Order not found", 404);
    }
    return c.json(City, 200);
}
export const createOrder = async (c: Context) => {
    try {
        const Category = await c.req.json();
        const createdCity = await createorderService(Category);
        //
        if (!createdCity) return c.text("Order not created", 404);
        return c.json({ msg: createdCity }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateOrder = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const City = await c.req.json();
    try {
        // search for the user
        const searchedCategory = await getorderService(id);
        if (searchedCategory == undefined) return c.text("Order not found", 404);
        // get the data and update it
        const res = await updateorderyService(id, City);
        // return a success message
        if (!res) return c.text("Order not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteOrder = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const Category = await getorderService(id);
        if (Category == undefined) return c.text("Order not found", 404);
        //deleting the user
        const res = await deleteorderService(id);
        if (!res) return c.text("Order not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getOrdersByUserController = async (c: Context) => {
  try {
    const userId = parseInt(c.req.param('id'), 10);

    if (isNaN(userId)) {
      return c.json({ error: 'Invalid user ID' }, 400);
    }

    const orders = await getOrdersByUserService(userId);

    if (!orders.length) {
      return c.json({ error: 'No orders found for this user' }, 400);
    }

    return c.json({ orders });
  } catch (error) {
    console.error('Error fetching orders for user:', error);
    return c.json({ error: 'Internal server error fetching order' }, 500);
  }
};