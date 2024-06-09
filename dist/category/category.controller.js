"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCategories = exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategory = exports.listCategory = void 0;
const category_service_1 = require("./category.service");
const listCategory = async (c) => {
    try {
        //limit the number of users to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, category_service_1.categoryService)(limit);
        if (data == null || data.length == 0) {
            return c.text("Category not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listCategory = listCategory;
const getCategory = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const Category = await (0, category_service_1.getcategoryService)(id);
    if (Category == undefined) {
        return c.text("Category not found", 404);
    }
    return c.json(Category, 200);
};
exports.getCategory = getCategory;
const createCategory = async (c) => {
    try {
        const Category = await c.req.json();
        const createdCategory = await (0, category_service_1.createcategoryService)(Category);
        //
        if (!createdCategory)
            return c.text("Category not created", 404);
        return c.json({ msg: createdCategory }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createCategory = createCategory;
const updateCategory = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const Category = await c.req.json();
    try {
        // search for the user
        const searchedCategory = await (0, category_service_1.getcategoryService)(id);
        if (searchedCategory == undefined)
            return c.text("Category not found", 404);
        // get the data and update it
        const res = await (0, category_service_1.updatecategoryService)(id, Category);
        // return a success message
        if (!res)
            return c.text("Address not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the user
        const Category = await (0, category_service_1.getcategoryService)(id);
        if (Category == undefined)
            return c.text("Category not found", 404);
        //deleting the user
        const res = await (0, category_service_1.deletecategoryService)(id);
        if (!res)
            return c.text("Category not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteCategory = deleteCategory;
const searchCategories = async (c) => {
    try {
        const searchTerm = c.req.query('searchTerm');
        if (!searchTerm) {
            return c.json({ error: 'Search term is required' }, 400);
        }
        const categories = await (0, category_service_1.searchCategoriesService)(searchTerm);
        return c.json({ categories });
    }
    catch (error) {
        console.error('Error searching categories:', error);
        return c.json({ error: 'Error searching categories' }, 500);
    }
};
exports.searchCategories = searchCategories;
