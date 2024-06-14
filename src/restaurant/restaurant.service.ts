import db from '../drizzle/db';
import { eq } from "drizzle-orm";
// import { TIProfile, TSProfile } from '../drizzle/schema';
import { TIRestaurant, TSRestaurant, restaurant, restaurantOwner, restaurantRelations, user } from '../drizzle/schema';

export const restaurantService = async ()  => {
    return await db.select().from(restaurant);
}

export const limitrestaurantsService = async (limit?: number): Promise<TSRestaurant[] | null> => {
    if (limit) {
        return await db.query.restaurant.findMany({
            limit: limit
        });
    }
    return await db.query.restaurant.findMany();
}


export const getRestaurantService = async (id: number): Promise<TIRestaurant[] | unknown > => {
    return await db.query.restaurant.findFirst({
        where: eq(restaurant.id, id)
    })
}

export const createRestaurantService = async (Restaurant: TIRestaurant) => {
    await db.insert(restaurant).values(Restaurant)
    return "restaurant created successfully";
}

export const updateRestaurantService = async (id: number, userData: TIRestaurant) => {
    await db.update(restaurant).set(userData).where(eq(restaurant.id, id))
    return "restaurant updated successfully";
}

export const deleteRestaurantService = async (id: number) => {
    await db.delete(restaurant).where(eq(restaurant.id, id))
    return "restaurant deleted successfully";
}

export const getRestaurantMenuByCategoryId = async (restaurantId: number ) => {
    return await db.query.restaurant.findFirst({
      where: eq(restaurant.id, restaurantId),
      with: {
        orders: {
            with:{
                restaurant:{
                    with:{
                        city: true,
                         menuItems: {
                            columns:{
                                active: true,
                                name: true,
                                price: true,
                                ingredients: true
                            }
                         }
                    },
                    columns: {
                        name: true,

                    },
                },
                address: {
                    columns: {
                        streetAddress1: true,
                        zipCode: true,
                        
                    }
                },
            }
        },
      },
    });
  }



