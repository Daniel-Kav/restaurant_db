import "dotenv/config";
import { verify } from "hono/jwt";
import { Context, Next } from "hono";

export interface TPayload {
  sub: string;
  role: string;
  exp: number;
}

// Authentication middleware
export const verifyToken = async (token: string, secret: string) => {
  try {
    const decoded = await verify(token, secret);
    return decoded;
  } catch (error: any) {
    return null;
  }
};

// Authorization middleware
export const authMiddleware = async (c: Context, next: Next, requiredRole: string) => {
  const token = c.req.header("Authorization");
  if (!token) return c.json({ error: "Token not provided" }, 401);

  const decoded = await verifyToken(token, process.env.JWT_SECRET as string);
  if (!decoded) return c.json({ error: "Invalid token" }, 401);

  if (decoded.role !== requiredRole && decoded.role !== 'superuser') {
    return c.json({ error: "Unauthorized" }, 401);
  }

  return next();
};

export const adminRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "admin");
export const userRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "user");

// Superuser can perform both user and admin actions
export const superuserRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "superuser");