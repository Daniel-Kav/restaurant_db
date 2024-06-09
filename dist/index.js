"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
require("dotenv/config");
const logger_1 = require("hono/logger");
const csrf_1 = require("hono/csrf");
const trailing_slash_1 = require("hono/trailing-slash");
const hono_rate_limiter_1 = require("hono-rate-limiter");
const jwt_1 = require("hono/jwt");
const user_router_1 = require("./users/user.router");
const restaurant_router_1 = require("./restaurant/restaurant.router");
const statuscatalog_router_1 = require("./statusCatalog/statuscatalog.router");
const orders_router_1 = require("./orders/orders.router");
const state_router_1 = require("./state/state.router");
const address_router_1 = require("./address/address.router");
// import { categoryRouter } from './category/category.router'
const city_router_1 = require("./city/city.router");
const category_router_1 = require("./category/category.router");
const comments_router_1 = require("./comments/comments.router");
const driver_router_1 = require("./driver/driver.router");
const menu_item_router_1 = require("./menu_item/menu_item.router");
const order_menu_item_router_1 = require("./order_menu_item/order_menu_item.router");
const order_status_router_1 = require("./order_status/order_status.router");
const restaurant_owner_router_1 = require("./restaurant_owner/restaurant_owner.router");
const app = new hono_1.Hono().basePath('/api');
// rate limiter
const limiter = (0, hono_rate_limiter_1.rateLimiter)({
    windowMs: 1 * 60 * 1000, // 1 minute
    limit: 100, // Limit each IP to 100 requests per `window`
    standardHeaders: "draft-6", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    keyGenerator: (c) => "<unique_key>", // Method to generate custom identifiers for clients.
    // store: ... , // Redis, MemoryStore, etc. See below.
});
// inbuilt middlewares
app.use((0, logger_1.logger)()); //logs request and response to the console
app.use((0, csrf_1.csrf)()); //prevents CSRF attacks by checking request headers.
app.use((0, trailing_slash_1.trimTrailingSlash)()); //removes trailing slashes from the request URL
//3rd party middlewares
app.use(limiter); // Apply the rate limiting middleware to all requests.
// JWT Middleware for authentication
app.use('/api/*', (0, jwt_1.jwt)({
    secret: process.env.JWT_SECRET,
}));
// default route
app.get('/success', (c) => {
    return c.text('The server is working !!');
});
// my custom  routes
app.route("/", user_router_1.userRouter); // /users
app.route("/", category_router_1.categoryRouter); // /cities
app.route("/", restaurant_router_1.restaurantRouter); //restaurants
app.route("/", statuscatalog_router_1.statusCatalogRouter); //catalogs
app.route("/", orders_router_1.orderRouter); //orders
app.route("/", city_router_1.cityRouter); //categories
app.route("/", state_router_1.stateRouter); //states
app.route("/", address_router_1.AddressRouter); //address
app.route("/", comments_router_1.commentsRouter); //comments
app.route("/", driver_router_1.driversRouter); //drivers
app.route("/", menu_item_router_1.menuItemRouter); //menuItemRouter
app.route("/", order_menu_item_router_1.orderMenuItemRouter); //orderMenuItemRouter
app.route("/", order_status_router_1.orderStatusRouter); //orderStatusRouter
app.route("/", restaurant_owner_router_1.restaurantOwnerRouter); //restaurantOwnerRouter
//rest
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: Number(process.env.PORT)
});
console.log(`Server is running on port ${process.env.PORT}`);
