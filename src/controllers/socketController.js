'use strict';

//const telemetry_router = 
const router = require("express").Router();
const DEVICE_ENDPOINT = '/telemetry'

const kafka = require('../connectors/kafka_connector');
const io = require('../services/socket');


io.on("connection", (socket) => {

    //receive message
    socket.on("telemetry_topic", (arg) => {
        const topic = arg.toString();

        if(topic){
            console.log(`connection: ${topic}`)
            consume(topic).catch(console.error)
        }
    });

    const consume = async (topic) => {
        const consumer = kafka.consumer({ groupId: `test-group_${topic}` })
        await consumer.connect()
        await consumer.subscribe({ topic: topic, fromBeginning: false })
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log({
                    partition,
                    offset: message.offset,
                    value: message.value.toString(),
                });
                io.sockets.emit("telemetry_topic_message", message.value.toString());
            },
        })
    };
});


io.on("disconnect", () => {
    console.log('disconnect')
});
io.on("identity", (userId) => {
    console.log('identity')
});
io.on("subscribe", (test) => {
    console.log('subscribe')
});
io.on("unsubscribe", (test) => {
    console.log('unsubscribe')
});