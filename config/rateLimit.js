import { Ratelimit } from "@upstash/ratelimit";
import redis from "./redisDB";


const rateLimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.fixedWindow(4, '1 m'),
})


export default rateLimit;