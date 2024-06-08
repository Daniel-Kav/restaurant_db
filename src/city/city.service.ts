

import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {TICity, TSCity, city, restaurant } from "../drizzle/schema";

export const cityService = async (limit?: number): Promise<TSCity[] | null> => {
    if (limit) {
        return await db.query.city.findMany({
            limit: limit
        });
    }
    return await db.query.city.findMany();
}

export const getcityService = async (id: number) : Promise<TICity[] | any>=> {
    return await db.query.city.findFirst({
        where: eq(city.id, id)
    })
}

export const createcityService = async (User: TICity) => {
    await db.insert(city).values(User)
    return "city created successfully";
}

export const updatecityService = async (id: number, userData: TICity) => {
    await db.update(city).set(userData).where(eq(city.id, id))
    return "city updated successfully";
}

export const deletecityService = async (id: number) => {
    await db.delete(city).where(eq(city.id, id))
    return "city deleted successfully";
}

// Service to fetch restaurants by city ID
export const getRestaurantsByCityService = async (cityId: number) => {
  const restaurants = await db
    .select()
    .from(restaurant)
    .where(eq(restaurant.cityId, cityId))
    .execute();

  return restaurants;
};
