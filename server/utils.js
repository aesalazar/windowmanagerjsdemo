function parseQueryString(url) {
    let params;
    try {
        if (!url || url.length === 0) 
            throw "Null or empty query string cannot be parsed.";

        queryString = url.substring((url.indexOf('?') || 0) + 1);

        // Split into key/value pairs
        const queries = queryString.split("&amp;");

        // Convert the array of strings into an object
        params = {};
        for (let i = 0, l = queries.length; i < l; i++ ) {
            const temp = queries[i].split('=');
            params[temp[0]] = temp[1];
        }
    } catch (ex){
        console.error("Could not parse query string '%s'", url);
        console.error(ex);
    }
    
    return params;
}

module.exports = {
    parseQueryString
};