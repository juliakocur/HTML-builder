const fs = require('fs');
const path = require('path');

// create folder and files
fs.mkdir(path.join(__dirname, 'project-dist'), {recursive:true}, (err) => {
    if (err) throw err
});
fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), {recursive:true}, (err) => {
    if (err) throw err
});


// create and copy assets
fs.readdir (path.join(__dirname, 'assets'), (error, dirEntryList) => {
    if (!error) {
        dirEntryList.forEach((dirEntry) => {
            let assetsCopy = path.join(__dirname, 'project-dist', 'assets', dirEntry);
            fs.mkdir(assetsCopy, {recursive: true}, (err) => {
                if (err) throw err;
            })

            fs.readdir(path.join(__dirname, 'assets', dirEntry), {withFiles: true}, (err, files) => {
                if (!error) {
                    files.forEach((file) => {
                        fs.copyFile(path.join(__dirname, 'assets', dirEntry, file), path.join(__dirname, 'project-dist', 'assets', dirEntry, file), (err) => {
                            if (err) throw err
                        })
                    })
                } else {
                    console.log(error)
                }
            })
        })
    } else {
        console.log(error)
    }
})


// create styles
const styleWrite = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

fs.readdir (path.join(__dirname, 'styles'), {withFileTypes: true}, (error, dirEntryList) => {
    if (!error) {
        dirEntryList.forEach((dirEntry) => {
                let styleRead = fs.createReadStream(path.join(__dirname, 'styles', dirEntry.name),'utf-8');
                styleRead.pipe(styleWrite);
        })
    } else {
        console.log(error);
    }
})


fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
    if (err) throw err;
    let fileContent = data; 
    
   
    fs.readdir(path.join(__dirname, 'components'), (err, dirEntryList) => {
      if (err) throw err;
      let i = 0;
      dirEntryList.forEach((dirEntry) => { 

      
        fs.readFile(path.join(__dirname, 'components', dirEntry), 'utf-8', (err, data) => {
          if (err) throw err;
          let dirEntryName = dirEntry.split('.');
          
          fileContent = fileContent.replace(`{{${dirEntryName[0]}}}`, data);
          i++;
          
          if(i === dirEntryList.length) {
          fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), fileContent, (err) => {
            if (err) throw err;
          })
          
        }
        }
        )
    })
  })
})

