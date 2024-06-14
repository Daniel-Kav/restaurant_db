import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIAddress, TSAddress, address, user } from "../drizzle/schema";
import { Client } from "pg";

export const adresService = async (limit?: number): Promise<TSAddress[] | null > => {
    if (limit) {
        return await db.query.address.findMany({
            limit: limit
        });
    }
    return await db.query.address.findMany();
}

export const getAdresService = async (id: number): Promise<TIAddress[] | any > => {
    return await db.query.address.findFirst({
        where: eq(address.id, id)
    })
}

export const createAdresService = async (User: TIAddress) => {
    await db.insert(address).values(User)
    return "Adres created successfully";
}

export const updateAdresService = async (id: number, userData: TIAddress) => {
    await db.update(address).set(userData).where(eq(address.id, id))
    return "Adres updated successfully";
}

export const deleteAdresService = async (id: number) => {
    await db.delete(address).where(eq(address.id, id))
    return "Adres deleted successfully";
}
// search 
export const client = new Client({
    connectionString: process.env.Database_URL as string,   //get the database url from the environment
})
client.connect();
export const searchAddresService = async (searchTerm: string) => {
    const query = `
        SELECT * FROM address
        WHERE street_address_1 ILIKE $1 
          OR street_address_2 ILIKE $1 
          OR zip_code ILIKE $1 
          OR delivery_instructions ILIKE $1
    `;
    const values = [`%${searchTerm}%`];
    const results = await client.query(query, values);
    return results.rows;
};



