

import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIRestaurantOwner, TSRestaurantOwner, restaurantOwner } from "../drizzle/schema";

export const restaurantOwnerService = async (limit?: number): Promise<TSRestaurantOwner[] | null> => {
    if (limit) {
        return await db.query.restaurantOwner.findMany({
            limit: limit
        });
    }
    return await db.query.restaurantOwner.findMany();
}

export const getrestaurantOwnerService = async (id: number): Promise<TIRestaurantOwner[] | any> => {
    return await db.query.restaurantOwner.findFirst({
        where: eq(restaurantOwner.id, id)
    })
}

export const createrestaurantOwnerService = async (User: TIRestaurantOwner) => {
    await db.insert(restaurantOwner).values(User)
    return "restaurantOwner created successfully";
}

export const updaterestaurantOwnerService = async (id: number, userData: TIRestaurantOwner) => {
    await db.update(restaurantOwner).set(userData).where(eq(restaurantOwner.id, id))
    return "restaurantOwner updated successfully";
}

export const deleterestaurantOwnerService = async (id: number) => {
    await db.delete(restaurantOwner).where(eq(restaurantOwner.id, id))
    return "restaurantOwner deleted successfully";
}
