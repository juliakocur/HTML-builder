const fs = require('fs');
const path = require('path');
const {stdin, stdout, exit} = process;


stdout.write('Please, enter text\n');

const newFile = fs.createWriteStream(path.join(__dirname, 'news.txt'));


stdin.on('data', (data) => {
    let x = data.toString().trim();
    if (x === 'exit') {
        process.exit();
    } else {
        newFile.write(data);
    }
})

process.on('exit', () => stdout.write('Good luck!'))

process.on('SIGINT', () => {
    exit();
    stdout.write('Good luck!');
})



