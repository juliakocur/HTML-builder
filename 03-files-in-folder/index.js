const fs = require('fs');
const path = require('path');

fs.readdir (path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (error, dirEntryList) => {
    if (!error) {
        dirEntryList.forEach((dirEntry) => {
            if (dirEntry.isFile()) {

                fs.stat (path.join(__dirname, 'secret-folder', dirEntry.name), (err, stats) => {
                    if(err) throw error;

                    let size = Math.ceil(stats.size/1024);
                    let name = dirEntry.name.split('.')[0];
                    let extention = dirEntry.name.split('.')[1];

                    console.log(`${name} - ${extention} - ${size}kb`);
                }) 
            }
        })
    } else {
        console.log(error)
    }
    }
)