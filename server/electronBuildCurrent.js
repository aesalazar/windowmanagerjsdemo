//Automatically builds election for the current platform to the output folder
const electronBuilder = require('./electronBuilder');

electronBuilder()
    .then(e =>console.log(`Completed build of file '${e.filePath}'`))
    .catch(error => console.error(error));