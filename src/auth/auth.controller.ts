import "dotenv/config";
import { Context } from "hono";
import { createAuthUserService, getEmailByUserId, userLoginService } from "./auth.service";
import bycrpt from "bcrypt";
import { sign } from "hono/jwt";
import { sendWelcomeEmail } from "../mailer";


export const registerUser = async (c: Context) => {
    try {
        const user = await c.req.json();
        const pass = user.password;
        const hashedPassword = await bycrpt.hash(pass, 10);
        user.password = hashedPassword;

        // Create the user
        const createdUser = await createAuthUserService(user);
        if (!createdUser) return c.text("User not registered", 404);

        // Fetch the recipient's email based on userId
        const email = await getEmailByUserId(user.userId);
        if (!email) {
            return c.json({ error: 'Email not found for the given user ID' }, 404);
        }

        // Send the welcome email
        try {
            await sendWelcomeEmail(email, user.username);
        } catch (error) {
            console.error("Error sending welcome email:", error);
            return c.json({ error: "User registered but failed to send welcome email" }, 500);
        }

        return c.json({ msg: createdUser }, 201);

    } catch (error: any) {
        console.error("Error during registration:", error);
        return c.json({ error: error?.message }, 400);
    }
};


export const loginUser = async (c: Context) => {

    try {
        const user = await c.req.json();
        //check user exist
        const userExist = await userLoginService(user);
        if (userExist === null) return c.json({ error: "User not found" }, 404);  // not found         
        const userMatch = await bycrpt.compare(user.password, userExist?.password as string);
        if (!userMatch) {
            return c.json({ error: "Invalid credentials" }, 401);  // unauthorized
        } else {
            // create a payload
            const payload = {
                sub: userExist?.username,
                role: userExist?.role,
                exp: Math.floor(Date.now() / 1000) + (60 * 1800)  // 30 hour  => SESSION EXPIRATION
            }
            let secret = process.env.JWT_SECRET as string;  // secret key
            const token = await sign(payload, secret);   // create a JWT token
            let user = userExist?.user;
            let role = userExist?.role;
            return c.json({ token, user: { role, ...user } }, 200);  // return token and user details
        }
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }

}

