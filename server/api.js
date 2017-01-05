const channels = new Map();

function registerConnection(ws, agentType){
    channels.set(ws, agentType);
}

function unregisterConnection(ws){
    channels.delete(ws);
}

function broadcastMessage(type, text, agentType){
    for (let [key, val] of channels.entries()) 
        if (!agentType || val === agentType)
            key.send(JSON.stringify({call: "broadcastMessage", args: [type, text]}));
}

module.exports = {
    registerConnection,
    unregisterConnection,
    broadcastMessage
}