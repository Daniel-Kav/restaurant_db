import { eq , or ,ilike} from "drizzle-orm";
import db from "../drizzle/db";
import { TICategory, TSAddress, TSCategory, category } from "../drizzle/schema";

export const categoryService = async (limit?: number): Promise<TSCategory[] | any> => {
    if (limit) {
        return await db.query.category.findMany({
            limit: limit
        });
    }
    return await db.query.category.findMany();
}

export const getcategoryService = async (id: number): Promise<TICategory[] | any> => {
    return await db.query.category.findFirst({
        where: eq(category.id, id)
    })
}

export const createcategoryService = async (User: TICategory) => {
    await db.insert(category).values(User)
    return "category created successfully";
}

export const updatecategoryService = async (id: number, userData: TICategory) => {
    await db.update(category).set(userData).where(eq(category.id, id))
    return "category updated successfully";
}

export const deletecategoryService = async (id: number) => {
    await db.delete(category).where(eq(category.id, id))
    return "category deleted successfully";
}
export const searchCategoriesService = async (searchTerm: string): Promise<TSCategory[] | null> => {
  const categories = await db.select()
    .from(category)
    .where(
      or(
        ilike(category.name, `%${searchTerm}%`)
      )
    );
  
  return categories;
};