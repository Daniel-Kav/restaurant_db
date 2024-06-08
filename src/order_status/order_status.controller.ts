import { Context } from "hono";
import { createorderStatusService, deleteorderStatusService, getOrderStatusService, getorderStatusService, orderStatusService, updateorderStatusService } from "./order_status.service";

export const listorderStatus = async (c: Context) => {
    try {
        //limit the number of users to be returned

        const limit = Number(c.req.query('limit'))

        const data = await orderStatusService(limit);
        if (data == null || data.length == 0) {
            return c.text("orderStatus not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getorderStatus = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const City = await getorderStatusService(id);
    if (City == undefined) {
        return c.text("orderStatus not found", 404);
    }
    return c.json(City, 200);
}
export const createorderStatus = async (c: Context) => {
    try {
        const Category = await c.req.json();
        const createdCity = await createorderStatusService(Category);
        //
        if (!createdCity) return c.text("orderStatus not created", 404);
        return c.json({ msg: createdCity }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateorderStatus = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const City = await c.req.json();
    try {
        // search for the user
        const searchedCategory = await getorderStatusService(id);
        if (searchedCategory == undefined) return c.text("orderStatus not found", 404);
        // get the data and update it
        const res = await updateorderStatusService(id, City);
        // return a success message
        if (!res) return c.text("orderStatus not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteorderStatus = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const Category = await getorderStatusService(id);
        if (Category == undefined) return c.text("orderStatus not found", 404);
        //deleting the user
        const res = await deleteorderStatusService(id);
        if (!res) return c.text("orderStatus not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

// Controller to get the status of a particular order
export const getOrderStatusController = async (c: Context) => {
  try {
    const orderId = parseInt(c.req.param('id'), 10);

    if (isNaN(orderId)) {
      return c.json({ error: 'Invalid order ID' }, 400);
    }

    const orderStatus = await getOrderStatusService(orderId);

    if (!orderStatus.length) {
      return c.json({ error: 'Order status not found' }, 404);
    }

    return c.json({ orderStatus });
  } catch (error) {
    console.error('Error fetching order status:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
};