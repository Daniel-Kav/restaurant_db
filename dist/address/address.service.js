"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchAddresService = exports.client = exports.deleteAdresService = exports.updateAdresService = exports.createAdresService = exports.getAdresService = exports.adresService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const pg_1 = require("pg");
const adresService = async (limit) => {
    if (limit) {
        return await db_1.default.query.address.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.address.findMany();
};
exports.adresService = adresService;
const getAdresService = async (id) => {
    return await db_1.default.query.address.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.address.id, id)
    });
};
exports.getAdresService = getAdresService;
const createAdresService = async (User) => {
    await db_1.default.insert(schema_1.address).values(User);
    return "Adres created successfully";
};
exports.createAdresService = createAdresService;
const updateAdresService = async (id, userData) => {
    await db_1.default.update(schema_1.address).set(userData).where((0, drizzle_orm_1.eq)(schema_1.address.id, id));
    return "Adres updated successfully";
};
exports.updateAdresService = updateAdresService;
const deleteAdresService = async (id) => {
    await db_1.default.delete(schema_1.address).where((0, drizzle_orm_1.eq)(schema_1.address.id, id));
    return "Adres deleted successfully";
};
exports.deleteAdresService = deleteAdresService;
// search 
exports.client = new pg_1.Client({
    connectionString: process.env.Database_URL, //get the database url from the environment
});
exports.client.connect();
const searchAddresService = async (searchTerm) => {
    const query = `
        SELECT * FROM address
        WHERE street_address_1 ILIKE $1 
          OR street_address_2 ILIKE $1 
          OR zip_code ILIKE $1 
          OR delivery_instructions ILIKE $1
    `;
    const values = [`%${searchTerm}%`];
    const results = await exports.client.query(query, values);
    return results.rows;
};
exports.searchAddresService = searchAddresService;
