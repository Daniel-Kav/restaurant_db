import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import "dotenv/config"
import { logger } from 'hono/logger'
import { csrf } from 'hono/csrf'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { HTTPException } from 'hono/http-exception'
import { rateLimiter } from "hono-rate-limiter";
import { jwt } from 'hono/jwt';

import { userRouter } from './users/user.router'
import { restaurantRouter } from './restaurant/restaurant.router'
import {  statusCatalogRouter } from './statusCatalog/statuscatalog.router'
import { orderRouter } from './orders/orders.router'
import { stateRouter } from './state/state.router'
import { AddressRouter } from './address/address.router'
// import { categoryRouter } from './category/category.router'
import { cityRouter } from './city/city.router'
import { categoryRouter } from './category/category.router'
import { commentsRouter } from './comments/comments.router'
import { driversRouter } from './driver/driver.router'
import { menuItemRouter } from './menu_item/menu_item.router'
import { orderMenuItemRouter } from './order_menu_item/order_menu_item.router'
import { orderStatusRouter } from './order_status/order_status.router'
import { restaurantOwnerRouter } from './restaurant_owner/restaurant_owner.router'
import { authRouter } from './auth/auth.router'




const app =  new Hono()
// rate limiter
const limiter = rateLimiter({
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: 10, // Limit each IP to 100 requests per `window`
  standardHeaders: "draft-6", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  keyGenerator: (c) => "<unique_key>", // Method to generate custom identifiers for clients.
  // store: ... , // Redis, MemoryStore, etc. See below.
});

// Default route
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Documentation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }

        .container {
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            text-align: center;
            color: #333;
        }

        h2 {
            color: #666;
        }

        p {
            line-height: 1.6;
        }

        .endpoint {
            margin: 20px 0;
        }

        .endpoint h3 {
            margin-bottom: 10px;
            color: #333;
        }

        .endpoint p {
            background: #f9f9f9;
            padding: 10px;
            border: 1px solid #ddd;
        }

        footer {
            text-align: center;
            padding: 20px 0;
            background: #333;
            color: #fff;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Welcome to the API Documentation</h1>
        <p>This API provides a variety of endpoints to interact with our application. Below is a list of available
            endpoints and their descriptions.</p>

        <div class="endpoint">
            <h2>Authentication</h2>
            <h3>POST /auth/login</h3>
            <p>Authenticates a user and returns a JWT token.</p>
        </div>

        <div class="endpoint">
            <h2>Users</h2>
            <h3>GET /users</h3>
            <p>Fetches a list of users.</p>
            <h3>POST /users</h3>
            <p>Creates a new user.</p>
        </div>

        <div class="endpoint">
            <h2>Categories</h2>
            <h3>GET /categories</h3>
            <p>Fetches a list of categories.</p>
            <h3>POST /categories</h3>
            <p>Creates a new category.</p>
        </div>

        <div class="endpoint">
            <h2>Restaurants</h2>
            <h3>GET /restaurants</h3>
            <p>Fetches a list of restaurants.</p>
            <h3>POST /restaurants</h3>
            <p>Creates a new restaurant.</p>
        </div>

        <div class="endpoint">
            <h2>Orders</h2>
            <h3>GET /orders</h3>
            <p>Fetches a list of orders.</p>
            <h3>POST /orders</h3>
            <p>Creates a new order.</p>
        </div>

        <div class="endpoint">
            <h2>Addresses</h2>
            <h3>GET /addresses</h3>
            <p>Fetches a list of addresses.</p>
            <h3>POST /addresses</h3>
            <p>Creates a new address.</p>
        </div>

        <div class="endpoint">
            <h2>Drivers</h2>
            <h3>GET /drivers</h3>
            <p>Fetches a list of drivers.</p>
            <h3>POST /drivers</h3>
            <p>Creates a new driver.</p>
        </div>

        <div class="endpoint">
            <h2>Menu Items</h2>
            <h3>GET /menu_items</h3>
            <p>Fetches a list of menu items.</p>
            <h3>POST /menu_items</h3>
            <p>Creates a new menu item.</p>
        </div>

        <div class="endpoint">
            <h2>Comments</h2>
            <h3>GET /comments</h3>
            <p>Fetches a list of comments.</p>
            <h3>POST /comments</h3>
            <p>Creates a new comment.</p>
        </div>

        <footer>
            <p>API Documentation &copy; 2024</p>
            <p>Server is running on port: ${process.env.PORT}</p>
            <p>Designed by Daniel Kavatha</p>
        </footer>
    </div>
</body>

</html>
  `);
});



// inbuilt middlewares
app.use(logger())  //logs request and response to the console
app.use(csrf()) //prevents CSRF attacks by checking request headers.
app.use(trimTrailingSlash()) //removes trailing slashes from the request URL
//3rd party middlewares

app.use(limiter);// Apply the rate limiting middleware to all requests.

// JWT Middleware for authentication
app.use('/api/*', jwt({
  secret: process.env.JWT_SECRET as string,
}));

// default route
app.get('/success', (c) => {
  return c.text('The server is working !!')
})

// my custom  routes
app.route("/", userRouter)   // /users
app.route("/", categoryRouter) // /cities
app.route("/", restaurantRouter) //restaurants
app.route("/", statusCatalogRouter) //catalogs
app.route("/", orderRouter) //orders
app.route("/", cityRouter) //categories
app.route("/", stateRouter) //states
app.route("/", AddressRouter) //address
app.route("/", commentsRouter) //comments
app.route("/", driversRouter) //drivers
app.route("/", menuItemRouter) //menuItemRouter
app.route("/", orderMenuItemRouter) //orderMenuItemRouter
app.route("/", orderStatusRouter) //orderStatusRouter
app.route("/", restaurantOwnerRouter) //restaurantOwnerRouter
app.route("/auth",  authRouter); // Authentication routes



// Default route for unmatched paths
app.all('*', (c) => {
  return c.text('you are not where you are supposed to be !!!')
})

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT)
})
console.log(`Server is running on port ${process.env.PORT}`)