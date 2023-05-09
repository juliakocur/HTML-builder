const fs = require('fs');
const path = require('path');
const filesCopy = path.join(__dirname, 'files-copy');
const files = path.join(__dirname, 'files');


fs.rm(filesCopy, {recursive:true} ,(err)=>{

    fs.mkdir(filesCopy, {recursive:true} ,(err) => {
        if (err) throw err;
    })

    function create(){
    fs.readdir (files, (error, dirEntryList) => {
   
        if (!error) {
            dirEntryList.forEach((dirEntry) => {
                    fs.copyFile(path.join(__dirname, 'files', dirEntry), path.join(__dirname, 'files-copy', dirEntry), (err) => {
                        if(err) throw err;
                    })
            })
        } else {
            console.log(error)
        }
    })
    }
create();
})