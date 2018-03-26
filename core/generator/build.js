const fs = require('fs');
const path = require('path');
const files = require('./files');
const rootPath = path.join(__dirname, '../../');

let folders = {
    rootFolder:  'tmp',
    mainFolders:  {
        'dev': [
            files.listFiles.script.options.extension,
            files.listFiles.style.options.extension,
            files.listFiles.template.options.extension
        ], 
        'staging': ['fonts', 'img']
    }  
}

let extension = {
    script: files.listFiles.script.options.extension,
    style: files.listFiles.style.options.extension,
    template: files.listFiles.template.options.extension
}

let allFiles = {
    script: files.listFiles.script.list,
    style: files.listFiles.style.list,
    template: files.listFiles.template.list
}

class GenerateStartProject {

    constructor(extension = {}, folders = {}, files = {}) {
        this.root = folders.rootFolder;
        this.extension = extension;
        this.main = folders.mainFolders;
        this.files = files;
    }

    generateMainFolder() {

        fs.mkdirSync(rootPath + '/' + this.root );

        for (let i = 0; i < Object.keys(this.main).length; i++) {
            fs.mkdirSync(rootPath + this.root + '/' + Object.keys(this.main)[i] );
        }

        for (let i = 0; i < this.main.dev.length; i++) {
            fs.mkdirSync(rootPath + this.root + '/' + Object.keys(this.main)[0] + '/' + this.main.dev[i]);
        }

        for (let i = 0; i < this.main.staging.length; i++) {
            fs.mkdirSync(rootPath + this.root + '/' + Object.keys(this.main)[1] + '/' + this.main.staging[i]);
        }

    }

    generateScript() {
    
        let scriptPath = rootPath + '/' + this.root + '/' + Object.keys(this.main)[0] + '/' + this.extension.script;
    
        for (let i = 0; i < this.files.script.length; i++) {
            let content = this.files.script[i].content;
            let stream = fs.createWriteStream(
                scriptPath + '/' + this.files.script[i].name + '.' + 
                this.extension.script
            );
            stream.once('open', function(fd) {
                stream.write(content);
                stream.end();
            });   
        }
    }

}

let GProject = new GenerateStartProject(extension, folders, allFiles);

GProject.generateMainFolder();
GProject.generateScript();