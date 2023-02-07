import { client } from "../config/redis";
import logger from '../config/logger';

export const checkRedis = async(req,res,next) => {
    const value = await client.get('getAllData');
    if(value!==null){
        res.status(200).json({
            code:200,
            data:JSON.parse(value),
            message: 'All the notes fetched successfully from Redis'
        });
        logger.info("All the notes fetched successfully from Redis")
    }else{
        next();
    }
}