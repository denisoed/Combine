const fs = require('fs');
const path = require('path');
const ncp = require('ncp').ncp;
// const combine = require('../../options/combine');

const rootPath = path.join(__dirname, '../../');
const srcPath = path.dirname(require.main.filename);
const folders = {
    rootFolder:  'app',
    mainFolders: ['dev', 'staging']
}
const languages = {
    templates: process.argv.slice(2)[0] || 'html',
    styles: process.argv.slice(2)[1] || 'css',
    scripts: process.argv.slice(2)[2] || 'js',
}

ncp.limit = 16;

class GenerateStartProject {

    constructor(folders = [], languages) {
        this.root = folders.rootFolder;
        this.main = folders.mainFolders;
        this.languages = languages;
    }

    generateMainFolder() {
        try {
            fs.mkdirSync(rootPath + '/' + this.root);
            
            for (let i = 0; i < this.main.length; i++) {
                fs.mkdirSync(rootPath + this.root + '/' + this.main[i] );
            }
        } catch (error) {
            console.error('Basic folder structure already exists');
        }
    }
    
    generateFolderStructure() {
        let langKeys = Object.keys(this.languages);
        for (let i = 0; i < langKeys.length; i++) {
            ncp(`${srcPath}/${langKeys[i]}/${this.languages[langKeys[i]]}`, rootPath + '/app/dev/' + this.languages[langKeys[i]], (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log('Coping ' + this.languages[langKeys[i]] + ' files complete!');
            }); 
        }
    }

    generate() {
        // Create main folder
        this.generateMainFolder();

        // Paste selected languages in main folder
        this.generateFolderStructure();
    }
}

let GProject = new GenerateStartProject(folders, languages);

GProject.generate();
