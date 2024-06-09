"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.statusCatalogSchema = exports.stateSchema = exports.restaurantOwnerSchema = exports.restaurantSchema = exports.orderStatusSchema = exports.orderMenuItemSchema = exports.orderSchema = exports.menuItemSchema = exports.driverSchema = exports.commentSchema = exports.citySchema = exports.categorySchema = exports.addressSchema = void 0;
const zod_1 = require("zod");
// Address table schema
exports.addressSchema = zod_1.z.object({
    id: zod_1.z.number().optional(), // Auto-incremented
    streetAddress1: zod_1.z.string(),
    streetAddress2: zod_1.z.string().optional(),
    zipCode: zod_1.z.string(),
    deliveryInstructions: zod_1.z.string().optional(),
    userId: zod_1.z.number(),
    cityId: zod_1.z.number(),
    createdAt: zod_1.z.string().optional(),
    updatedAt: zod_1.z.string().optional(),
});
// Category table schema
exports.categorySchema = zod_1.z.object({
    id: zod_1.z.number().optional(), // Auto-incremented
    name: zod_1.z.string(),
});
// City table schema
exports.citySchema = zod_1.z.object({
    id: zod_1.z.number().optional(), // Auto-incremented
    name: zod_1.z.string(),
    stateId: zod_1.z.number(),
});
// Comment table schema
exports.commentSchema = zod_1.z.object({
    id: zod_1.z.number().optional(), // Auto-incremented
    orderId: zod_1.z.number(),
    userId: zod_1.z.number(),
    commentText: zod_1.z.string(),
    isComplaint: zod_1.z.boolean(),
    isPraise: zod_1.z.boolean(),
    createdAt: zod_1.z.string().optional(),
    updatedAt: zod_1.z.string().optional(),
});
// Driver table schema
exports.driverSchema = zod_1.z.object({
    id: zod_1.z.number().optional(), // Auto-incremented
    carMake: zod_1.z.string(),
    carModel: zod_1.z.string(),
    carYear: zod_1.z.number(),
    userId: zod_1.z.number(),
    online: zod_1.z.boolean(),
    delivering: zod_1.z.boolean(),
    createdAt: zod_1.z.string().optional(),
    updatedAt: zod_1.z.string().optional(),
});
// MenuItem table schema
exports.menuItemSchema = zod_1.z.object({
    id: zod_1.z.number().optional(), // Auto-incremented
    name: zod_1.z.string(),
    restaurantId: zod_1.z.number(),
    categoryId: zod_1.z.number(),
    description: zod_1.z.string(),
    ingredients: zod_1.z.string(),
    price: zod_1.z.number(),
    active: zod_1.z.boolean(),
    createdAt: zod_1.z.string().optional(),
    updatedAt: zod_1.z.string().optional(),
});
// Order table schema
exports.orderSchema = zod_1.z.object({
    id: zod_1.z.number().optional(), // Auto-incremented
    restaurantId: zod_1.z.number(),
    estimatedDeliveryTime: zod_1.z.string(),
    actualDeliveryTime: zod_1.z.string().optional(),
    deliveryAddressId: zod_1.z.number(),
    userId: zod_1.z.number(),
    driverId: zod_1.z.number().optional(),
    price: zod_1.z.number(),
    discount: zod_1.z.number(),
    finalPrice: zod_1.z.number(),
    comment: zod_1.z.string().optional(),
    createdAt: zod_1.z.string().optional(),
    updatedAt: zod_1.z.string().optional(),
});
// OrderMenuItem table schema
exports.orderMenuItemSchema = zod_1.z.object({
    id: zod_1.z.number().optional(), // Auto-incremented
    orderId: zod_1.z.number(),
    menuItemId: zod_1.z.number(),
    quantity: zod_1.z.number(),
    itemPrice: zod_1.z.number(),
    price: zod_1.z.number(),
    comment: zod_1.z.string().optional(),
});
// OrderStatus table schema
exports.orderStatusSchema = zod_1.z.object({
    id: zod_1.z.number().optional(), // Auto-incremented
    orderId: zod_1.z.number(),
    statusCatalogId: zod_1.z.number(),
    createdAt: zod_1.z.string().optional(),
});
// Restaurant table schema
exports.restaurantSchema = zod_1.z.object({
    id: zod_1.z.number().optional(), // Auto-incremented
    name: zod_1.z.string(),
    streetAddress: zod_1.z.string(),
    zipCode: zod_1.z.string(),
    cityId: zod_1.z.number(),
    createdAt: zod_1.z.string().optional(),
    updatedAt: zod_1.z.string().optional(),
});
// RestaurantOwner table schema
exports.restaurantOwnerSchema = zod_1.z.object({
    id: zod_1.z.number().optional(), // Auto-incremented
    restaurantId: zod_1.z.number(),
    ownerId: zod_1.z.number(),
});
// State table schema
exports.stateSchema = zod_1.z.object({
    id: zod_1.z.number().optional(), // Auto-incremented
    name: zod_1.z.string(),
    code: zod_1.z.string(),
});
// StatusCatalog table schema
exports.statusCatalogSchema = zod_1.z.object({
    id: zod_1.z.number().optional(), // Auto-incremented
    name: zod_1.z.string(),
});
// User table schema
exports.userSchema = zod_1.z.object({
    id: zod_1.z.number().optional(), // Auto-incremented
    name: zod_1.z.string(),
    contact_phone: zod_1.z.string(),
    phone_verified: zod_1.z.boolean(),
    email: zod_1.z.string(),
    email_verified: zod_1.z.boolean(),
    confirmation_code: zod_1.z.string().optional(),
    password: zod_1.z.string(),
    createdAt: zod_1.z.string().optional(),
    updatedAt: zod_1.z.string().optional(),
});
