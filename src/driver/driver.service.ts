
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIDriver, TSDriver, driver, order,TSOrder } from "../drizzle/schema";

interface DriverOrderInfo {
    driver: TSDriver;
    orders: TSOrder[];
}
export const driverService = async (limit?: number): Promise<TSDriver[] | null>  => {
    if (limit) {
        return await db.query.driver.findMany({
            limit: limit
        });
    }
    return await db.query.driver.findMany();
}

export const getdriverService = async (id: number) : Promise<TIDriver[] | unknown > => {
    return await db.query.driver.findFirst({
        where: eq(driver.id, id)
    })
}

export const createdriverService = async (User: TIDriver):Promise<string> => {
    await db.insert(driver).values(User)
    return "driver created successfully";
}

export const updatedriverService = async (id: number, driverData: TIDriver): Promise<string> => {
    await db.update(driver).set(driverData).where(eq(driver.id, id))
    return "driver updated successfully";
}

export const deletedriverService = async (id: number): Promise<string> => {
    await db.delete(driver).where(eq(driver.id, id))
    return "driver deleted successfully";
}

export const getDriverByOrderService = async (orderId: number) => {
  const driverInfo = await db
    .select(
        
    )
    .from(driver)
    .innerJoin(order, eq(order.driverId, driver.id))
    .where(eq(order.id, orderId))
    .execute();

  return driverInfo || null;
};
