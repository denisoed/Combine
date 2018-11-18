const fs = require('fs');
const path = require('path');
const ncp = require('ncp').ncp;

const rootPath = path.join(__dirname, '../../');
const srcPath = path.dirname(require.main.filename);

ncp.limit = 16;

class GenerateStartProject {

    constructor() {
        this.folders = {
            rootFolder: 'app',
            mainFolders: ['dev', 'staging']
        };
        this.langs = {
            templates: process.argv.slice(2)[0] || 'html',
            styles: process.argv.slice(2)[1] || 'css',
            scripts: process.argv.slice(2)[2] || 'js',
        };
        this.grids = process.argv.slice(2)[3] || 'bootstrap4';
    }

    createMainFolder() {
        try {
            fs.mkdirSync(rootPath + '/' + this.folders.rootFolder);
            
            for (let i = 0; i < this.folders.mainFolders.length; i++) {
                fs.mkdirSync(rootPath + this.folders.rootFolder + '/' + this.folders.mainFolders[i]);
            }
        } catch (error) {
            console.error('Basic folder structure already exists');
            process.exit();
        }
    }
    
    copyInitialFiles() {
        let langKeys = Object.keys(this.langs);
        for (let i = 0; i < langKeys.length; i++) {
            ncp(`${srcPath}/${langKeys[i]}/${this.langs[langKeys[i]]}`, rootPath + '/app/dev/' + this.langs[langKeys[i]], (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log('📥 ' + ' - Coping ' + this.langs[langKeys[i]] + ' files complete!');
            }); 
        }

        ncp(`${srcPath}/staging`, rootPath + '/app/staging', function (err) {
            if (err) {
                return console.error(err);
            }
            console.log('📥 ' + ' - Coping staging files complete!');
        });
        
    }
    
    setGridSystem() {
        ncp(`${srcPath}/grids/${this.grids}/_grid.${this.langs.styles}`,
            `${rootPath}/app/dev/${this.langs.styles}/_grid.${this.langs.styles}`,
            function (err) {
            if (err) {
                return console.error(err);
            }
            console.log('📥 ' + ' - Coping grid file complete!');
        });   
    }

    generate() {
        // Create main folder
        this.createMainFolder();

        // Paste selected languages in main folder
        this.copyInitialFiles();

        // Paste selected grid system
        this.setGridSystem();
    }
}

let GProject = new GenerateStartProject();

GProject.generate();
