

import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIRestaurantOwner, TSRestaurantOwner, restaurantOwner, user } from "../drizzle/schema";

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

export const createrestaurantOwnerService = async (User: TIRestaurantOwner): Promise< string > => {
    await db.insert(restaurantOwner).values(User)
    return "restaurantOwner created successfully";
}

export const updaterestaurantOwnerService = async (id: number, userData: TIRestaurantOwner): Promise< string > => {
    await db.update(restaurantOwner).set(userData).where(eq(restaurantOwner.id, id))
    return "restaurantOwner updated successfully";
}

export const deleterestaurantOwnerService = async (id: number): Promise< string > => {
    await db.delete(restaurantOwner).where(eq(restaurantOwner.id, id))
    return "restaurantOwner deleted successfully";
}

// Service to fetch the owner of a restaurant by restaurant ID
// export type RestaurantOwnerServiceResult = {
//     ownerId: number;
//     restaurantId: number;
//     ownerName: string;
//     ownerEmail: string;
// }[];

// // Service to fetch restaurant owner information by restaurant ID
// export const getRestaurantOwnerService = async (restaurantId: number): Promise<RestaurantOwnerServiceResult> => {
//   const ownerData = await db
//     .select({
//       ownerId: restaurantOwner.ownerId,
//       restaurantId: restaurantOwner.restaurantId,
//       ownerName: user.name,
//       ownerEmail: user.email,
//     })
//     .from(restaurantOwner)
//     .innerJoin(user, eq(restaurantOwner.ownerId, user.id))
//     .where(eq(restaurantOwner.restaurantId, restaurantId))
//     .execute();

//   return ownerData;
// };

// Updated type for the result
export type RestaurantOwnerServiceResult = {
    ownerName: string;
    ownerEmail: string;
    phone: string; // Assuming phone is of type string
}[];

// Service to fetch restaurant owner information by restaurant ID
export const getRestaurantOwnerService = async (restaurantId: number): Promise<RestaurantOwnerServiceResult> => {
  const ownerData = await db
    .select({
      ownerName: user.name,
      ownerEmail: user.email,
      phone: user.phone, // Include phone field from user table
    })
    .from(restaurantOwner)
    .innerJoin(user, eq(restaurantOwner.ownerId, user.id))
    .where(eq(restaurantOwner.restaurantId, restaurantId))
    .execute();

  return ownerData;
};

