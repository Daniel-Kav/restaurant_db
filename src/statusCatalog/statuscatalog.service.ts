

import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {TSStatusCatalog, statusCatalog } from "../drizzle/schema";

export const statusCatalogService = async (limit?: number): Promise<TSStatusCatalog[] | null> => {
    if (limit) {
        return await db.query.state.findMany({
            limit: limit
        });
    }
    return await db.query.statusCatalog.findMany();
}

export const getstatusCatalogService = async (id: number): Promise<TSStatusCatalog[] | any > => {
    return await db.query.statusCatalog.findFirst({
        where: eq(statusCatalog.id, id)
    })
}

export const createstatusCatalogService = async (User: TSStatusCatalog) => {
    await db.insert(statusCatalog).values(User)
    return "statusCatalog created successfully";
}

export const updatestatusCatalogService = async (id: number, userData: TSStatusCatalog) => {
    await db.update(statusCatalog).set(userData).where(eq(statusCatalog.id, id))
    return "statusCatalog updated successfully";
}

export const deletestatusCatalogService = async (id: number) => {
    await db.delete(statusCatalog).where(eq(statusCatalog.id, id))
    return "statusCatalog deleted successfully";
}
