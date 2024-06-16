
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIMenuItem, TSMenuItem, category, menuItem, restaurant } from "../drizzle/schema";

export const menuItemService = async (limit?: number): Promise<TSMenuItem[] | null>  => {
    if (limit) {
        return await db.query.menuItem.findMany({
            limit: limit
        });
    }
    return await db.query.menuItem.findMany();
}

export const getmenuItemService = async (id: number): Promise<TIMenuItem[] | unknown >  => {
    return await db.query.menuItem.findFirst({
        where: eq(menuItem.id, id)
    })
}

export const createmenuItemService = async (User: TIMenuItem): Promise<string> => {
    await db.insert(menuItem).values(User)
    return "menuItem created successfully";
}

export const updatemenuItemService = async (id: number, userData: TIMenuItem) :Promise<string>=> {
    await db.update(menuItem).set(userData).where(eq(menuItem.id, id))
    return "menuItem updated successfully";
}

export const deletemenuItemService = async (id: number): Promise<string> => {
    await db.delete(menuItem).where(eq(menuItem.id, id))
    return "menuItem deleted successfully";
}

// export type TMenuItem = {
//     id: number;
//     name: string;
//     createdAt: string;
//     updatedAt: string;
//     restaurantId: number;
//     categoryId: number;
//     description: string;
//     ingredients: string;
//     price: string;
// };

// // Service to fetch menu items by restaurant ID
// export const getMenuItemsByRestaurantService = async (restaurantId: number): Promise< TMenuItem[] > => {
//   const menuItems = await db
//     .select()
//     .from(menuItem)
//     .where(eq(menuItem.restaurantId, restaurantId))
//     .execute();

//   return menuItems;
// };

export type TMenuItem = {
    name: string;
    description: string;
    ingredients: string;
    price: string;
};

// Service to fetch menu items by restaurant ID
export const getMenuItemsByRestaurantService = async (restaurantId: number): Promise<TMenuItem[]> => {
  const menuItems: TMenuItem[] = await db
    .select({
      name: menuItem.name,
      description: menuItem.description,
      ingredients: menuItem.ingredients,
      price: menuItem.price,
    })
    .from(menuItem)
    .where(eq(menuItem.restaurantId, restaurantId))
    .execute();

  return menuItems;
};

// Service to fetch menu items by category ID
export const getMenuItemsByCategoryService = async (categoryId: number) => {
  const menuItems = await db
    .select()
    .from(menuItem)
    .where(eq(menuItem.categoryId, categoryId))
    .execute();

  return menuItems;
};

// Service to fetch menu items by category name for a specific restaurant
export const getRestaurantMenuByCategoryNameService = async (restaurantId: number, categoryName: string) => {
  const menuItems = await db.query.restaurant.findFirst({
    where: eq(restaurant.id, restaurantId),
    with: {
      menuItems: {
        where: eq(
          menuItem.categoryId,
          db
            .select({ id: category.id })
            .from(category)
            .where(eq(category.name, categoryName))
        ),
        with: {
          
          category: true,
        },
      },
    },
  });

  return menuItems;
};



