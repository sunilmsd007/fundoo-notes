import { sendSuccessMail } from './rabbit.util';
import logger from '../config/logger';

var amqp = require('amqplib/callback_api');

export const sender=(data) => {
    amqp.connect('amqp://localhost', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }
    
            var queue = 'register';
            var msg = data;
    
            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(msg));
    
            logger.info(`[x] Sent ${msg}`);

        });
    
    });
}

const receiver=() => {
    amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'register';

        channel.assertQueue(queue, {
            durable: false
        });

        logger.info(`[*] Waiting for messages in ${queue}. To exit press CTRL+C`);

        channel.consume(queue, function(msg) {
            logger.info(`[x] Received ${msg.content.toString()}` );
            let registeredData = JSON.parse(msg.content.toString());
            sendSuccessMail(registeredData.email, registeredData.firstname, registeredData.lastname);
        }, {
            noAck: true
        });
    });
});
}

receiver();
