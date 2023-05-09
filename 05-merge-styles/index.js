const fs = require('fs');
const path = require('path');
const streamWrite = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir (path.join(__dirname, 'styles'), {withFileTypes: true}, (error, dirEntryList) => {
    if (!error) {
        dirEntryList.forEach((dirEntry) => {
            if (dirEntry.name.split('.')[1] === 'css') {
                let streamRead = fs.createReadStream(path.join(__dirname, 'styles', dirEntry.name),'utf-8');
                streamRead.pipe(streamWrite);
            }
        })
    } else {
        console.log(error);
    }
})

