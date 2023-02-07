import { createClient } from 'redis';
export const client = createClient();
import logger from '../config/logger';

const redis = async () => {
    try{
        await client.connect();
        logger.info("Client connection established...");
    }catch (error) {
        logger.error(error);
    }
};

export default redis;