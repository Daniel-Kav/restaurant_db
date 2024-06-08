

import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {TIState, TSState, city, restaurant, state } from "../drizzle/schema";

export const stateService = async (limit?: number): Promise<TSState[] | null> => {
    if (limit) {
        return await db.query.state.findMany({
            limit: limit
        });
    }
    return await db.query.state.findMany();
}

export const getstateService = async (id: number): Promise<TIState[] | any> => {
    return await db.query.state.findFirst({
        where: eq(state.id, id)
    })
}

export const createstateService = async (User: TIState) => {
    await db.insert(state).values(User)
    return "state created successfully";
}

export const updatestateService = async (id: number, userData: TIState) => {
    await db.update(state).set(userData).where(eq(state.id, id))
    return "state updated successfully";
}

export const deletestateService = async (id: number) => {
    await db.delete(state).where(eq(state.id, id))
    return "state deleted successfully";
}

// Service to fetch cities by state ID
export const getCitiesByStateService = async (stateId: number) => {
  const cities = await db
    .select()
    .from(city)
    .where(eq(city.stateId, stateId))
    .execute();

  return cities;
};

// Service to fetch restaurants by city ID
export const getRestaurantsByCityService = async (cityId: number) => {
  const restaurants = await db
    .select()
    .from(restaurant)
    .where(eq(restaurant.cityId, cityId))
    .execute();

  return restaurants;
};
