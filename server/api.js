const channels = new Map();

function registerConnection(ws, agentType){
    channels.set(ws, agentType);
}

function unregisterConnection(ws){
    channels.delete(ws);
}

function broadcastMessage(ws, type, text, agentType){
    for (let [key, val] of channels) 
        if (!agentType || val === agentType)
            key.send(JSON.stringify({call: "broadcastMessage", args: [type, text]}));
}

module.exports = {
    registerConnection,
    unregisterConnection,
    broadcastMessage
}