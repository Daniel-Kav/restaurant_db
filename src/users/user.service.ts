import { eq , or, ilike} from "drizzle-orm";
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

export const getUserService = async (id: number): Promise<TIUser[] | any > => {
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

// Service to fetch addresses by user ID
export const getAddressesByUserService = async (userId: number) => {
  const addresses = await db
    .select()
    .from(address)
    .where(eq(address.userId, userId))
    .execute();

  return addresses;
};

// Service to fetch all restaurants owned by a particular user
export const getRestaurantsByOwnerService = async (userId: number) => {
  const restaurants = await db
    .select()
    .from(restaurant)
    .innerJoin(restaurantOwner, eq(restaurant.id, restaurantOwner.restaurantId))
    .where(eq(restaurantOwner.ownerId, userId))
    .execute();

  return restaurants;
};