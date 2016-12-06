const channels = new Set();

function registerConnection(ws){
    channels.add(ws);
}

function unregisterConnection(ws){
    channels.delete(ws);
}

function broadcastMessage(type, text){
    for (let ws of channels) 
        ws.send(JSON.stringify({call: "broadcastMessage", args: [type, text]}));
}

module.exports = {
    registerConnection,
    unregisterConnection,
    broadcastMessage
}