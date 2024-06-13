

import { eq , sql} from "drizzle-orm";
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

export const getorderService = async (id: number): Promise<TIOrder[] | unknown > => {
    return await db.query.order.findFirst({
        where: eq(order.id, id)
    })
}

export const createorderService = async (User: TIOrder): Promise< string > => {
    await db.insert(order).values(User)
    return "order created successfully";
}

export const updateorderyService = async (id: number, userData: TIOrder) :Promise<string> => {
    await db.update(order).set(userData).where(eq(order.id, id))
    return "order updated successfully";
}

export const deleteorderService = async (id: number) : Promise <string> => {
    await db.delete(order).where(eq(order.id, id))
    return "order deleted successfully";
}


// Service to fetch orders by user ID
export const getOrdersByUserService = async (userId: number):Promise <TSOrder[] > => {
  const orders = await db
    .select()
    .from(order)
    .where(eq(order.userId, userId))
    .execute();

  return orders;
};

export const getDiscountedOrdersService = async () : Promise <TSOrder[] | null >=> {
  const discountedOrders = await db
    .select()
    .from(order)
    .where(sql`${order.discount} > 0`)
    .execute();
  return discountedOrders;
};
