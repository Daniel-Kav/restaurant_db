import { Hono } from "hono";
import { listUsers, getUser, createUser, updateUser, deleteUser, searchUsers, getUsersByOrderController, getAddressesByUserController } from "./user.controller"
import { zValidator } from "@hono/zod-validator";
import { userSchema } from "../validators";
export const userRouter = new Hono();

//get all users      
userRouter.get("/users", listUsers);
//get a single user   
userRouter.get("/users/:id", getUser)
// create a user 
userRouter.post("/users", zValidator('json', userSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createUser)
//update a user
userRouter.put("/users/:id", updateUser)

userRouter.delete("/users/:id", deleteUser)
// search
// userRouter.get("/users/search", searchUsers)

userRouter.get("/search/users", searchUsers)

userRouter.get('/users/order/:id', getUsersByOrderController);
userRouter.get('/users/:id/addresses', getAddressesByUserController);