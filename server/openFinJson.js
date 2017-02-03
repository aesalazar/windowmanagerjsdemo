const packageJson = require("../package.json");

function createJson(host){
    const json = {
        "devtools_port": 9090,
        "startup_app": {
            "name": packageJson.electronBuilder.productName,
            "url": "http://" + host + "/",
            "uuid": packageJson.name,
            "icon": "http://" + host + "/images/eikos-logo-multi.ico",
            "autoShow": true,
            "defaultTop": 100,
            "defaultLeft": 100,
            "defaultWidth": 800,
            "defaultHeight": 600
        },
        "runtime": {
            "arguments": "",
            "version": "stable"
        },
        "shortcut": {
            "company": packageJson.company,
            "description": packageJson.description,
            "icon": "http://" + host + "/images/eikos-logo-multi.ico",
            "name": packageJson.electronBuilder.productName
        }
    };
    return json;
}

module.exports = createJson;