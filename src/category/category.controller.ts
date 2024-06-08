

import { Context } from "hono";
import { categoryService, createcategoryService, deletecategoryService, getcategoryService, searchCategoriesService, updatecategoryService } from "./category.service";

export const listCategory = async (c: Context) => {
    try {
        //limit the number of users to be returned

        const limit = Number(c.req.query('limit'))

        const data = await categoryService(limit);
        if (data == null || data.length == 0) {
            return c.text("Category not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getCategory = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Category = await getcategoryService(id);
    if (Category == undefined) {
        return c.text("Category not found", 404);
    }
    return c.json(Category, 200);
}
export const createCategory = async (c: Context) => {
    try {
        const Category = await c.req.json();
        const createdCategory = await createcategoryService(Category);
        //
        if (!createdCategory) return c.text("Category not created", 404);
        return c.json({ msg: createdCategory }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateCategory = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Category = await c.req.json();
    try {
        // search for the user
        const searchedCategory = await getcategoryService(id);
        if (searchedCategory == undefined) return c.text("Category not found", 404);
        // get the data and update it
        const res = await updatecategoryService(id, Category);
        // return a success message
        if (!res) return c.text("Address not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteCategory = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const Category = await getcategoryService(id);
        if (Category == undefined) return c.text("Category not found", 404);
        //deleting the user
        const res = await deletecategoryService(id);
        if (!res) return c.text("Category not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
export const searchCategories = async (c: Context) => {
    try {
        const searchTerm = c.req.query('searchTerm');

        if (!searchTerm) {
            return c.json({ error: 'Search term is required' }, 400);
        }

        const categories = await searchCategoriesService(searchTerm);

        return c.json({ categories });
    } catch (error) {
        console.error('Error searching categories:', error);
        return c.json({ error: 'Error searching categories' }, 500);
    }
};