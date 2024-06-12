import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { addressSchema } from "../validators";
import { createAddress, deleteAddress, getAddress, listAddress, searchAddress, updateAddress } from "./adress.controller";
import { adminOrUserRoleAuth, adminRoleAuth, superuserRoleAuth } from "../middleware/bearAuth";
export const AddressRouter = new Hono();

//get all address      
AddressRouter.get("/address",adminRoleAuth ,  listAddress);
//get a single address   
AddressRouter.get("/address/:id", adminOrUserRoleAuth ,getAddress)
// create a address 
AddressRouter.post("/address", zValidator('json', addressSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),  adminOrUserRoleAuth ,createAddress)
//update aaddress
AddressRouter.put("address/:id", adminOrUserRoleAuth ,updateAddress)

AddressRouter.delete("/address/:id", adminOrUserRoleAuth ,deleteAddress)

AddressRouter.get("/search/address", adminRoleAuth ,searchAddress)


