const fs = require('fs');
const path = require('path');
const myRead = fs.createReadStream(path.join(__dirname, 'text.txt'),'utf-8');
let data = '';

myRead.on('data', function(chunk){
    console.log(data += chunk);
});

myRead.on('error', function(error){
    console.log('Error', error.message);
});