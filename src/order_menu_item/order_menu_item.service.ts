

import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIMenuItem, TIOrderMenuItem, TSOrderMenuItem, orderMenuItem } from "../drizzle/schema";

export const orderMenuItemService = async (limit?: number): Promise<TSOrderMenuItem[] | null>  => {
    if (limit) {
        return await db.query.orderMenuItem.findMany({
            limit: limit
        });
    }
    return await db.query.orderMenuItem.findMany();
}

export const getorderMenuItemService = async (id: number): Promise<TIOrderMenuItem[] | any>  => {
    return await db.query.orderMenuItem.findFirst({
        where: eq(orderMenuItem.id, id)
    })
}

export const createorderMenuItemService = async (User: TIOrderMenuItem) => {
    await db.insert(orderMenuItem).values(User)
    return "orderMenuItem created successfully";
}

export const updateorderMenuItemService = async (id: number, userData: TIOrderMenuItem) => {
    await db.update(orderMenuItem).set(userData).where(eq(orderMenuItem.id, id))
    return "orderMenuItem updated successfully";
}

export const deleteorderMenuItemService = async (id: number) => {
    await db.delete(orderMenuItem).where(eq(orderMenuItem.id, id))
    return "orderMenuItem deleted successfully";
}
