import { z } from 'zod';

export const loginUserSchema = z.object({
    username: z.string(),
    password: z.string()
})

export const registerUserSchema = z.object({
    userId: z.number(),
    username: z.string(),
    password: z.string(),
    role: z.string().optional(),
})

// Address table schema
export const addressSchema = z.object({
  id: z.number().optional(), // Auto-incremented
  streetAddress1: z.string(),
  streetAddress2: z.string().optional(),
  zipCode: z.string(),
  deliveryInstructions: z.string().optional(),
  userId: z.number(),
  cityId: z.number(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// Category table schema
export const categorySchema = z.object({
  id: z.number().optional(), // Auto-incremented
  name: z.string(),
});

// City table schema
export const citySchema = z.object({
  id: z.number().optional(), // Auto-incremented
  name: z.string(),
  stateId: z.number(),
});

// Comment table schema
export const commentSchema = z.object({
  id: z.number().optional(), // Auto-incremented
  orderId: z.number(),
  userId: z.number(),
  commentText: z.string(),
  isComplaint: z.boolean(),
  isPraise: z.boolean(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// Driver table schema
export const driverSchema = z.object({
  id: z.number().optional(), // Auto-incremented
  carMake: z.string(),
  carModel: z.string(),
  carYear: z.number(),
  userId: z.number(),
  online: z.boolean(),
  delivering: z.boolean(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// MenuItem table schema
export const menuItemSchema = z.object({
  id: z.number().optional(), // Auto-incremented
  name: z.string(),
  restaurantId: z.number(),
  categoryId: z.number(),
  description: z.string(),
  ingredients: z.string(),
  price: z.number(),
  active: z.boolean(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// Order table schema
export const orderSchema = z.object({
  id: z.number().optional(), // Auto-incremented
  restaurantId: z.number(),
  estimatedDeliveryTime: z.string(),
  actualDeliveryTime: z.string().optional(),
  deliveryAddressId: z.number(),
  userId: z.number(),
  driverId: z.number().optional(),
  price: z.number(),
  discount: z.number(),
  finalPrice: z.number(),
  comment: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// OrderMenuItem table schema
export const orderMenuItemSchema = z.object({
  id: z.number().optional(), // Auto-incremented
  orderId: z.number(),
  menuItemId: z.number(),
  quantity: z.number(),
  itemPrice: z.number(),
  price: z.number(),
  comment: z.string().optional(),
});

// OrderStatus table schema
export const orderStatusSchema = z.object({
  id: z.number().optional(), // Auto-incremented
  orderId: z.number(),
  statusCatalogId: z.number(),
  createdAt: z.string().optional(),
});

// Restaurant table schema
export const restaurantSchema = z.object({
  id: z.number().optional(), // Auto-incremented
  name: z.string(),
  streetAddress: z.string(),
  zipCode: z.string(),
  cityId: z.number(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// RestaurantOwner table schema
export const restaurantOwnerSchema = z.object({
  id: z.number().optional(), // Auto-incremented
  restaurantId: z.number(),
  ownerId: z.number(),
});

// State table schema
export const stateSchema = z.object({
  id: z.number().optional(), // Auto-incremented
  name: z.string(),
  code: z.string(),
});

// StatusCatalog table schema
export const statusCatalogSchema = z.object({
  id: z.number().optional(), // Auto-incremented
  name: z.string(),
});

// User table schema
export const userSchema = z.object({
  id: z.number().optional(), // Auto-incremented
  name: z.string(),
  contact_phone: z.string(),
  phone_verified: z.boolean(),
  email: z.string(),
  email_verified: z.boolean(),
  confirmation_code: z.string().optional(),
  password: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
