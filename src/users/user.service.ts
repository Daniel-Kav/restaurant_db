import { eq , or,sql , ilike} from "drizzle-orm";
import db from "../drizzle/db";
// import { Client } from "pg";
import { TIUser, TSUser, address, order, restaurant, restaurantOwner, user,userRelations } from "../drizzle/schema";

// export const client = new Client({
//     connectionString: process.env.Database_URL as string,   //get the database url from the environment
// })
// client.connect();

export const usersService = async (limit?: number): Promise<TSUser[] | null> => {
    if (limit) {
        return await db.query.user.findMany({
            limit: limit
        });
    }
    return await db.query.user.findMany();
}

export const getUserService = async (id: number): Promise<TIUser[] | unknown > => {
    return await db.query.user.findFirst({
        where: eq(user.id, id)
    })
}

export const createUserService = async (User: TIUser) => {
    await db.insert(user).values(User)
    return "User created successfully";
}

export const updateUserService = async (id: number, userData: TIUser) => {
    await db.update(user).set(userData).where(eq(user.id, id))
    return "User updated successfully";
}

export const deleteUserService = async (id: number) => {
    await db.delete(user).where(eq(user.id, id))
    return "User deleted successfully";
}

// export const searchUsersService = async (searchTerm: string) => {
//     const query = `
//         SELECT * FROM users
//         WHERE name ILIKE $1 OR email ILIKE $1
//     `;
//     const values = [`%${searchTerm}%`];
//     const results = await client.query(query, values);
//     return results.rows;
// };

export const searchUsersService = async (searchTerm: string): Promise<TSUser[] | null> => {
  const users = await db.select()
    .from(user)
    .where(
      or(
        ilike(user.name, `%${searchTerm}%`),
        ilike(user.email, `%${searchTerm}%`)
      )
    );
  
  return users;
};

// Service to fetch users by order ID
export const getUsersByOrderService = async (orderId: number) => {
  const users = await db
    .select()
    .from(user)
    .innerJoin(order, eq(user.id, order.userId))
    .where(eq(order.id, orderId))
    .execute();

  return users;
};

// export const getUsersByOrderService = async (orderId: number) => {
//   return await db.query.user.findMany({
//     columns: {
//       id: true,
//       name: true,
//       phone: true,
//       email: true,
//       createdAt: true,
//       updatedAt: true,
//     },
//     innerJoin: {
//       order: {
//         on: sql`${user.id} = ${order.userId}`
//       }
//     },
//     where: sql`${order.id} = ${orderId}`
//   });
// };

// Service to fetch addresses by user ID
export const getAddressesByUserService = async (userId: number) => {
  const addresses = await db
    .select()
    .from(address)
    .where(eq(address.userId, userId))
    .execute();

  return addresses;
};

// export const getAddressesByUserService = async (userId: number) => {
//   return await db.query.address.findMany({
//     columns: {
//       id: true,
//       streetAddress1: true,
//       streetAddress2: true,
//       zipCode: true,
//       deliveryInstructions: true,
//       createdAt: true,
//       updatedAt: true,
//     },
//     where: {
//       userId: userId
//     }
//   });
// };

// Service to fetch all restaurants owned by a particular user
export const getRestaurantsByOwnerService = async (userId: number) => {
  const restaurants = await db
    .select({
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      restaurantStreetAddress: restaurant.streetAddress,
      restaurantZipCode: restaurant.zipCode
    })
    .from(restaurant)
    .innerJoin(restaurantOwner, eq(restaurant.id, restaurantOwner.restaurantId))
    .where(eq(restaurantOwner.ownerId, userId))
    .execute();

  return restaurants;
};


// export const getRestaurantsByOwnerService = async (userId: number) => {
//   return await db.query.restaurant.findMany({
//     columns: {
//       id: true,
//       name: true,
//       streetAddress: true,
//       zipCode: true,
//     },
//     where: sql`${restaurantOwner.ownerId} = ${userId}`,
//     innerJoin: {
//       restaurantOwner: {
//         on: sql`${restaurant.id} = ${restaurantOwner.restaurantId}`
//       }
//     }
//   });
// };