import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import * as schema from "./schema";
import ws from "ws";

// Configure Neon to use WebSocket in Node.js environments
if (typeof window === "undefined") {
  neonConfig.webSocketConstructor = ws;
}

// Create connection pool
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Create drizzle instance
export const db = drizzle(pool, { schema });

export * from "./schema";
