const fs = require('fs');

// Function to write channel ID to a file
function writeFile(channelID) {
    const fileName = 'channelID.txt';
    const data = `Channel ID: ${channelID}`;

    fs.writeFile(fileName, data, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('Channel ID written to file successfully.');
    });
}

module.exports = { writeFile };
