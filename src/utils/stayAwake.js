
import fetch from "node-fetch"; 


const APP_URL = process.env.APP_URL || "https://newbackend-eigk.onrender.com";


export function startStayAwake() {
  setInterval(async () => {
    try {
      const res = await fetch(APP_URL);
      if (res.ok) {
        console.log(`[StayAwake] Ping success at ${new Date().toISOString()}`);
      } else {
        console.error(`[StayAwake] Ping failed: ${res.status}`);
      }
    } catch (err) {
      console.error(`[StayAwake] Error pinging: ${err.message}`);
    }
  }, 240000);
}
