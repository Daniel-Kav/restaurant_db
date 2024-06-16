

import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIOrderStatus, TSOrderStatus, order, orderStatus, statusCatalog } from "../drizzle/schema";

export const orderStatusService = async (limit?: number): Promise<TSOrderStatus[] | null>  => {
    if (limit) {
        return await db.query.orderStatus.findMany({
            limit: limit
        });
    }
    return await db.query.orderStatus.findMany();
}

export const getorderStatusService = async (id: number): Promise<TIOrderStatus[] | any> => {
    return await db.query.orderStatus.findFirst({
        where: eq(orderStatus.id, id)
    })
}

export const createorderStatusService = async (User: TIOrderStatus): Promise< string > => {
    await db.insert(orderStatus).values(User)
    return "orderStatus created successfully";
}

export const updateorderStatusService = async (id: number, userData: TIOrderStatus) : Promise< string > => {
    await db.update(orderStatus).set(userData).where(eq(orderStatus.id, id))
    return "orderStatus updated successfully";
}

export const deleteorderStatusService = async (id: number): Promise < string > => {
    await db.delete(orderStatus).where(eq(orderStatus.id, id))
    return "orderStatus deleted successfully";
}


type OrderStatus = {
    id: number;
    createdAt: string;
    orderId: number;
    statusCatalogId: number;
};

// Service to fetch the status of a particular order by order ID
export const getOrderStatusService = async (orderId: number) : Promise<OrderStatus[]> => {
  const orderStatusData = await db
    .select()
    .from(orderStatus)
    .where(eq(orderStatus.orderId, orderId))
    .execute();

  return orderStatusData;
};

// export const getOrderStatusService = async (orderId: number) =>{
//     return await db.query.orderStatus.findFirst({
//         columns:{

//         },
//         with: {
//             statusCatalog:{
//                 columns: {
//                     name: true,
//                 }
//             }
//         },
//     })
// }


