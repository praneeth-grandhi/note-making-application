import ratelimit from "../config/upstash.js";

const rateLimiter = async(req, res, next) => {
    try{
        const { success } = await ratelimit.limit("my-limit-key");
        if(!success){
            return res.status(429).json({ message: "Too many requests, please try again later :(" });
        }
        next();
    }catch(err){
        console.log("Rate limiting error", err);
        next(err); // Proceed even if there's an error with rate limiting
    }
}

export default rateLimiter;