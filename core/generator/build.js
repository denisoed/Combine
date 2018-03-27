const fs = require('fs');
const path = require('path');
const ncp = require('ncp').ncp;
const combine = require('../../options/combine');
const rootPath = path.join(__dirname, '../../');

let srcPath = path.dirname(require.main.filename);

ncp.limit = 16;

let folders = {
    rootFolder:  'tmp',
    mainFolders: ['dev', 'staging']
}

class GenerateStartProject {

    constructor(folders = []) {
        this.root = folders.rootFolder;
        this.main = folders.mainFolders;
    }

    generateMainFolder() {
        fs.mkdirSync(rootPath + '/' + this.root );

        for (let i = 0; i < this.main.length; i++) {
            fs.mkdirSync(rootPath + this.root + '/' + this.main[i] );
        }
    }

    generateScripts() {
        ncp(srcPath + '/scripts/' + combine.generator.scripts, rootPath + '/tmp/dev/' + combine.generator.scripts, (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Coping script files complete!');
        });
    }

    generateStyles() {
        ncp(srcPath + '/styles/' + combine.generator.styles, rootPath + '/tmp/dev/' + combine.generator.styles, (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Coping style files complete!');
        });
    }

    generateTemplates() {
        ncp(srcPath + '/templates/' + combine.generator.templates, rootPath + '/tmp/dev/' + combine.generator.templates, (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Coping template files complete!');
        });
    }

}

let GProject = new GenerateStartProject(folders);

GProject.generateMainFolder();
GProject.generateScripts();
GProject.generateStyles();
GProject.generateTemplates();
