

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

export const getstateService = async (id: number): Promise<TIState[] | unknown > => {
    return await db.query.state.findFirst({
        where: eq(state.id, id)
    })
}

export const createstateService = async (User: TIState): Promise < string > => {
    await db.insert(state).values(User)
    return "state created successfully";
}

export const updatestateService = async (id: number, userData: TIState): Promise < string > => {
    await db.update(state).set(userData).where(eq(state.id, id))
    return "state updated successfully";
}

export const deletestateService = async (id: number): Promise < string > => {
    await db.delete(state).where(eq(state.id, id))
    return "state deleted successfully";
}

// Define a type for the city data returned by the service
export interface City {
  name: string;
}
// Service to fetch cities by state ID

export const getCitiesByStateService = async (stateId: number): Promise<City[]> => {
  const cities = await db
    .select({
      name: city.name, // Select only the name field
    })
    .from(city)
    .where(eq(city.stateId, stateId))
    .execute();

  return cities;
};


// Define a type or interface for the  restaurant data
export interface Restaurant {
  name: string;
  zipCode: string;
  streetAddress: string;
}

// Service function to fetch restaurants by city ID
export const getRestaurantsByCityService = async (cityId: number): Promise<Restaurant[]> => {
  return await db
    .select({
      name: restaurant.name,
      zipCode: restaurant.zipCode,
      streetAddress: restaurant.streetAddress,
    })
    .from(restaurant)
    .where(eq(restaurant.cityId, cityId))
    .execute();
};

