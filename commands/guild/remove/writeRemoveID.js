const fs = require('fs');

function updateConfigFile(channelID) {
    const fileName = 'config.json';

    // Read the existing content of the file
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        try {
            // Parse the JSON data into an object
            const config = JSON.parse(data);

            // Update only the 'goodbye_id' property in the JSON object
            config.goodbye_id = channelID; // Update the 'goodbye_id' property

            // Write the updated JSON object back to the file
            fs.writeFile(fileName, JSON.stringify(config, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    return;
                }
                console.log('goodbye_id updated in config.json successfully.');
            });
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });
}

module.exports = { updateConfigFile };
