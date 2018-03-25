const fs = require('fs');
const path = require('path');
const files = require('./files');
const rootPath = path.join(__dirname, '../../');

class GenerateStartFiles {

    constructor( app = '', folders = [] ) {
        this.app = app;
        this.folders = folders;
    }

    generateMainFolder() {

        fs.mkdirSync(rootPath + '/' + this.app );

        for (let i = 0; i < this.folders.length; i++) {
            fs.mkdirSync(rootPath + this.app + '/' + this.folders[i] );
        }

    }
}

let GFilis = new GenerateStartFiles('tmp', ['dev', 'staging']);

GFilis.generateMainFolder();

// function generateJs(listJs) {

//     fs.mkdirSync(rootPath + '/tmp');

//     for (let i = 0; i < listJs.list.length; i++) {
//         let stream = fs.createWriteStream(
//             listJs.list[i].name + '.' + 
//             listJs.options.extension
//         );
//         stream.once('open', function(fd) {
//             stream.write(listJs.list[i].content);
//             stream.end();
//         });
        
//     }
// }

// generateJs(files.listFiles.js);