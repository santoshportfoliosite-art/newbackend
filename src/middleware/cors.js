import { env } from "../config/env.js";


function toArray(val) {
  if (val == null) return [];
  if (Array.isArray(val)) return val.map(String).map(s => s.trim()).filter(Boolean);

  const t = typeof val;


  if (t === "object") {
    try {
      return Object.values(val).map(String).map(s => s.trim()).filter(Boolean);
    } catch {
      return [];
    }
  }


  let s = String(val).trim();
  if (!s) return [];

  
  if (s.startsWith("[") && s.endsWith("]")) {
    try {
      const parsed = JSON.parse(s);
      if (Array.isArray(parsed)) {
        return parsed.map(String).map(x => x.trim()).filter(Boolean);
      }
    } catch {
   
    }
  }

 
  return s.split(",").map(x => x.trim()).filter(Boolean);
}


const allowList = Array.from(
  new Set([
    ...(toArray(env.CLIENT_ORIGIN).length ? toArray(env.CLIENT_ORIGIN) : [env.CLIENT_ORIGIN].filter(Boolean)),
    ...toArray(env.CORS_ALLOWED_ORIGINS),
    ...toArray(env.CLIENT_ORIGINS), 
  ])
).filter(Boolean);


export const corsOptions = {
  origin(origin, cb) {
    
    if (!origin || allowList.includes(origin)) return cb(null, true);
    return cb(new Error(`CORS blocked for ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Set-Cookie"],
};
