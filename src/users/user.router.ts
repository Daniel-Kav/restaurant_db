import { Hono } from "hono";
import { listUsers, getUser, createUser, updateUser, deleteUser, searchUsers, getUsersByOrderController, getAddressesByUserController, getRestaurantsByOwnerController } from "./user.controller"
import { zValidator } from "@hono/zod-validator";
import { userSchema } from "../validators";
import { adminOrUserRoleAuth, adminRoleAuth, superuserRoleAuth, userRoleAuth } from "../middleware/bearAuth";
// import { adminRoleAuth } from "../middleware/bearAuth";
export const userRouter = new Hono();

//get all users      
userRouter.get("/users", adminOrUserRoleAuth, listUsers);
//get a single user   
userRouter.get("/users/:id",adminOrUserRoleAuth , getUser)
// create a user 
userRouter.post("/users", zValidator('json', userSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),superuserRoleAuth,createUser)
//update a user
userRouter.put("/users/:id", superuserRoleAuth, updateUser)

userRouter.delete("/users/:id",adminRoleAuth , deleteUser)
// search
// userRouter.get("/users/search", searchUsers)

userRouter.get("/search/users",adminRoleAuth, searchUsers)

userRouter.get('/users/order/:id', adminRoleAuth,getUsersByOrderController);
userRouter.get('/users/:id/addresses',adminRoleAuth, getAddressesByUserController);
userRouter.get('restaurantOwner/:id/restaurants', adminRoleAuth ,getRestaurantsByOwnerController);