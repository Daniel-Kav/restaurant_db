"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRelations = exports.user = exports.statusCatalog = exports.state = exports.restaurantOwner = exports.restaurantRelations = exports.restaurant = exports.orderStatusRelations = exports.orderStatus = exports.orderMenuItemRelations = exports.orderMenuItem = exports.orderRelations = exports.order = exports.menuItemRelations = exports.menuItem = exports.driverRelations = exports.driver = exports.commentRelations = exports.comment = exports.cityRelations = exports.city = exports.category = exports.addressRelations = exports.address = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
//adress table
exports.address = (0, pg_core_1.pgTable)("address", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    streetAddress1: (0, pg_core_1.varchar)("street_address_1", { length: 255 }).notNull(),
    streetAddress2: (0, pg_core_1.varchar)("street_address_2", { length: 255 }),
    zipCode: (0, pg_core_1.varchar)("zip_code", { length: 16 }).notNull(),
    deliveryInstructions: (0, pg_core_1.varchar)("delivery_instructions", { length: 255 }),
    userId: (0, pg_core_1.integer)("user_id")
        .notNull()
        .references(() => exports.user.id, { onDelete: "cascade" }),
    cityId: (0, pg_core_1.integer)("city_id")
        .notNull()
        .references(() => exports.city.id),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: "string" }).notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { mode: "string" }).notNull().defaultNow(),
});
//adress relations  
exports.addressRelations = (0, drizzle_orm_1.relations)(exports.address, ({ one }) => ({
    user: one(exports.user, {
        fields: [exports.address.userId],
        references: [exports.user.id],
    }),
    city: one(exports.city, {
        fields: [exports.address.cityId],
        references: [exports.city.id],
    }),
}));
//category table
exports.category = (0, pg_core_1.pgTable)("category", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull().unique(),
});
//city table
exports.city = (0, pg_core_1.pgTable)("city", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    stateId: (0, pg_core_1.integer)("state_id")
        .notNull()
        .references(() => exports.state.id, { onDelete: "cascade" }),
}, (table) => {
    return {
        cityAk1: (0, pg_core_1.unique)("city_ak_1").on(table.name, table.stateId),
    };
});
//city relations
exports.cityRelations = (0, drizzle_orm_1.relations)(exports.city, ({ one }) => ({
    state: one(exports.state, {
        fields: [exports.city.stateId],
        references: [exports.state.id],
    }),
}));
//comments Table
exports.comment = (0, pg_core_1.pgTable)("comment", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    orderId: (0, pg_core_1.integer)("order_id")
        .notNull()
        .references(() => exports.order.id, { onDelete: "cascade" }),
    userId: (0, pg_core_1.integer)("user_id")
        .notNull()
        .references(() => exports.user.id, { onDelete: "cascade" }),
    commentText: (0, pg_core_1.text)("comment_text").notNull(),
    isComplaint: (0, pg_core_1.boolean)("is_complaint").notNull(),
    isPraise: (0, pg_core_1.boolean)("is_praise").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: "string" }).notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { mode: "string" }).notNull().defaultNow(),
});
// comments relations
exports.commentRelations = (0, drizzle_orm_1.relations)(exports.comment, ({ one }) => ({
    user: one(exports.user, {
        fields: [exports.comment.userId],
        references: [exports.user.id],
    }),
    order: one(exports.order, {
        fields: [exports.comment.orderId],
        references: [exports.order.id],
    }),
}));
//driver table
exports.driver = (0, pg_core_1.pgTable)("driver", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    carMake: (0, pg_core_1.varchar)("car_make", { length: 255 }).notNull(),
    carModel: (0, pg_core_1.varchar)("car_model", { length: 255 }).notNull(),
    carYear: (0, pg_core_1.integer)("car_year").notNull(),
    userId: (0, pg_core_1.integer)("user_id")
        .notNull()
        .references(() => exports.user.id, { onDelete: "cascade" }),
    online: (0, pg_core_1.boolean)("online").notNull(),
    delivering: (0, pg_core_1.boolean)("delivering").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: "string" })
        .notNull()
        .defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { mode: "string" })
        .notNull()
        .defaultNow(),
});
//driver relations
exports.driverRelations = (0, drizzle_orm_1.relations)(exports.driver, ({ one }) => ({
    user: one(exports.user, {
        fields: [exports.driver.userId],
        references: [exports.user.id],
    }),
}));
//menu-item  table
exports.menuItem = (0, pg_core_1.pgTable)("menu_item", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    restaurantId: (0, pg_core_1.integer)("restaurant_id")
        .notNull()
        .references(() => exports.restaurant.id, { onDelete: "cascade" }),
    categoryId: (0, pg_core_1.integer)("category_id")
        .notNull()
        .references(() => exports.category.id, { onDelete: "cascade" }),
    description: (0, pg_core_1.text)("description").notNull(),
    ingredients: (0, pg_core_1.text)("ingredients").notNull(),
    price: (0, pg_core_1.numeric)("price", { precision: 12, scale: 2 }).notNull(),
    active: (0, pg_core_1.boolean)("active").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: "string" }).notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { mode: "string" }).notNull().defaultNow(),
});
// menu item relationships
exports.menuItemRelations = (0, drizzle_orm_1.relations)(exports.menuItem, ({ one }) => ({
    restaurant: one(exports.restaurant, {
        fields: [exports.menuItem.restaurantId],
        references: [exports.restaurant.id],
    }),
    category: one(exports.category, {
        fields: [exports.menuItem.categoryId],
        references: [exports.category.id],
    }),
}));
// making the orders table 
exports.order = (0, pg_core_1.pgTable)("orders", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    restaurantId: (0, pg_core_1.integer)("restaurant_id")
        .notNull()
        .references(() => exports.restaurant.id, { onDelete: "cascade" }),
    estimatedDeliveryTime: (0, pg_core_1.timestamp)("estimated_delivery_time", {
        mode: "string",
    }).notNull(),
    actualDeliveryTime: (0, pg_core_1.timestamp)("actual_delivery_time", { mode: "string" }),
    deliveryAddressId: (0, pg_core_1.integer)("delivery_address_id")
        .notNull()
        .references(() => exports.address.id),
    userId: (0, pg_core_1.integer)("user_id")
        .notNull()
        .references(() => exports.user.id),
    driverId: (0, pg_core_1.integer)("driver_id").references(() => exports.driver.id, { onDelete: "cascade" }),
    price: (0, pg_core_1.numeric)("price", { precision: 12, scale: 2 }).notNull(),
    discount: (0, pg_core_1.numeric)("discount", { precision: 12, scale: 2 }).notNull(),
    finalPrice: (0, pg_core_1.numeric)("final_price", { precision: 12, scale: 2 }).notNull(),
    comment: (0, pg_core_1.text)("comment"),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: "string" }).notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { mode: "string" }).notNull().defaultNow(),
});
//order relations
exports.orderRelations = (0, drizzle_orm_1.relations)(exports.order, ({ one, many }) => ({
    restaurant: one(exports.restaurant, {
        fields: [exports.order.restaurantId],
        references: [exports.restaurant.id],
    }),
    user: one(exports.user, {
        fields: [exports.order.userId],
        references: [exports.user.id],
    }),
    driver: one(exports.driver, {
        fields: [exports.order.driverId],
        references: [exports.driver.id],
    }),
    address: one(exports.address, {
        fields: [exports.order.deliveryAddressId],
        references: [exports.address.id],
    }),
    orderStatuses: many(exports.orderStatus),
}));
//order menu items table
exports.orderMenuItem = (0, pg_core_1.pgTable)("order_menu_item", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    orderId: (0, pg_core_1.integer)("order_id")
        .notNull()
        .references(() => exports.order.id, { onDelete: "cascade" }),
    menuItemId: (0, pg_core_1.integer)("menu_item_id").notNull().references(() => exports.menuItem.id, { onDelete: "cascade" }),
    quantity: (0, pg_core_1.integer)("quantity").notNull(),
    itemPrice: (0, pg_core_1.numeric)("item_price", { precision: 12, scale: 2 }).notNull(),
    price: (0, pg_core_1.numeric)("price", { precision: 12, scale: 2 }).notNull(),
    comment: (0, pg_core_1.text)("comment"),
});
exports.orderMenuItemRelations = (0, drizzle_orm_1.relations)(exports.orderMenuItem, ({ one }) => ({
    order: one(exports.order, {
        fields: [exports.orderMenuItem.orderId],
        references: [exports.order.id],
    }),
    menuItem: one(exports.menuItem, {
        fields: [exports.orderMenuItem.menuItemId],
        references: [exports.menuItem.id],
    }),
}));
//ordersstatus table
exports.orderStatus = (0, pg_core_1.pgTable)("order_status", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    orderId: (0, pg_core_1.integer)("order_id")
        .notNull()
        .references(() => exports.order.id, { onDelete: "cascade" }),
    statusCatalogId: (0, pg_core_1.integer)("status_catalog_id")
        .notNull()
        .references(() => exports.statusCatalog.id, { onDelete: "cascade" }),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: "string" }).notNull().defaultNow(),
});
exports.orderStatusRelations = (0, drizzle_orm_1.relations)(exports.orderStatus, ({ one }) => ({
    order: one(exports.order, {
        fields: [exports.orderStatus.orderId],
        references: [exports.order.id],
    }),
    statusCatalog: one(exports.statusCatalog, {
        fields: [exports.orderStatus.statusCatalogId],
        references: [exports.statusCatalog.id],
    }),
}));
//restaurants table 
exports.restaurant = (0, pg_core_1.pgTable)("restaurant", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    streetAddress: (0, pg_core_1.varchar)("street_address", { length: 255 }).notNull(),
    zipCode: (0, pg_core_1.varchar)("zip_code", { length: 16 }).notNull(),
    cityId: (0, pg_core_1.integer)("city_id")
        .notNull()
        .references(() => exports.city.id, { onDelete: "cascade" }),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: "string" })
        .notNull()
        .defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { mode: "string" })
        .notNull()
        .defaultNow(),
}, (table) => ({
    nameIndex: (0, pg_core_1.index)().on(table.name),
}));
exports.restaurantRelations = (0, drizzle_orm_1.relations)(exports.restaurant, ({ one, many }) => ({
    city: one(exports.city, {
        fields: [exports.restaurant.cityId],
        references: [exports.city.id],
    }),
    menuItems: many(exports.menuItem),
    orders: many(exports.order),
}));
//restaurants owner table
exports.restaurantOwner = (0, pg_core_1.pgTable)("restaurant_owner", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    restaurantId: (0, pg_core_1.integer)("restaurant_id")
        .notNull()
        .references(() => exports.restaurant.id, { onDelete: "cascade" }),
    ownerId: (0, pg_core_1.integer)("owner_id")
        .notNull()
        .references(() => exports.user.id, { onDelete: "cascade" }),
}, (table) => {
    return {
        unqiueOwner: (0, pg_core_1.unique)().on(table.restaurantId, table.ownerId)
    };
});
//state table
exports.state = (0, pg_core_1.pgTable)("state", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull().unique(),
    code: (0, pg_core_1.varchar)("code", { length: 4 }).notNull().unique(),
});
//status catalog table
exports.statusCatalog = (0, pg_core_1.pgTable)("status_catalog", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull().unique(),
});
//user table
exports.user = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    phone: (0, pg_core_1.varchar)("contact_phone", { length: 255 }).notNull().unique(),
    phoneVerified: (0, pg_core_1.boolean)("phone_verified").notNull(),
    email: (0, pg_core_1.varchar)("email", { length: 255 }).notNull().unique(),
    emailVerified: (0, pg_core_1.boolean)("email_verified").notNull(),
    confirmationCode: (0, pg_core_1.varchar)("confirmation_code", { length: 255 }),
    password: (0, pg_core_1.varchar)("password", { length: 255 }).notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: "string" }).notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { mode: "string" }).notNull().defaultNow(),
});
exports.userRelations = (0, drizzle_orm_1.relations)(exports.user, ({ many }) => ({
    addresses: many(exports.address),
    orders: many(exports.order)
}));
