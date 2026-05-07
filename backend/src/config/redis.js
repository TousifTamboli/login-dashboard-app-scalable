import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://redis:6379",
});

redisClient.on("error", (err) => console.log("Redis Error:", err));

await redisClient.connect();

export default redisClient;