

import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {TIOrder, TSOrder, order } from "../drizzle/schema";

export const orderService = async (limit?: number): Promise<TSOrder[] | null> => {
    if (limit) {
        return await db.query.order.findMany({
            limit: limit
        });
    }
    return await db.query.order.findMany();
}

export const getorderService = async (id: number): Promise<TIOrder[] | any> => {
    return await db.query.order.findFirst({
        where: eq(order.id, id)
    })
}

export const createorderService = async (User: TIOrder) => {
    await db.insert(order).values(User)
    return "order created successfully";
}

export const updateorderyService = async (id: number, userData: TIOrder) => {
    await db.update(order).set(userData).where(eq(order.id, id))
    return "order updated successfully";
}

export const deleteorderService = async (id: number) => {
    await db.delete(order).where(eq(order.id, id))
    return "order deleted successfully";
}


// Service to fetch orders by user ID
export const getOrdersByUserService = async (userId: number) => {
  const orders = await db
    .select()
    .from(order)
    .where(eq(order.userId, userId))
    .execute();

  return orders;
};
