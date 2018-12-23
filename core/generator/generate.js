const fs = require('fs');
const path = require('path');
const ncp = require('ncp').ncp;

const rootPath = path.join(__dirname, '../../');
const srcPath = path.dirname(require.main.filename);

const config = require('../init.json');

ncp.limit = 16;

class GenerateStartProject {

    constructor() {
        this.folders = {
            rootFolder: config.paths.root,
            mainFolders: ['dev', 'staging']
        };
        this.langs = {
            templates: config.langs.templates,
            styles: config.langs.styles,
            scripts: config.langs.scripts,
        };
        this.grids = config.grids;
        this.multilang = config.multilang;
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
            ncp(srcPath + '/' + langKeys[i] + '/' + this.langs[langKeys[i]],
                rootPath + this.folders.rootFolder + '/dev/' + this.langs[langKeys[i]],
                (err) => {
                    if (err) {
                        return console.error(err);
                    }
                    console.log('📥 ' + ' - Coping ' + this.langs[langKeys[i]] + ' files complete!');
                }
            ); 
        }

        ncp(srcPath + '/staging',
            rootPath + this.folders.rootFolder + '/staging',
            (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log('📥 ' + ' - Coping staging files complete!');
            }
        );
        
    }
    
    addGridSystem() {
        if (this.grids != 'Nothing') {
            ncp(srcPath + '/grids/' + this.grids + '/_grid.'+ this.langs.styles,
                rootPath + '/' + this.folders.rootFolder + '/dev/' + this.langs.styles + '/_grid.' + this.langs.styles,
                (err) => {
                    if (err) {
                        return console.error(err);
                    }
                    console.log('📥 ' + ' - Coping grid file complete!');
                }
            );   
        }
    }

    addMultilang() {
        if (this.multilang === 'Yes') {
            ncp(srcPath + '/multilang/',
                rootPath + '/' + this.folders.rootFolder + '/dev',
                (err) => {
                    if (err) {
                        return console.error(err);
                    }
                    console.log('📥 ' + ' - Coping multilang files complete!');
                }
            );   
        }
    }

    generate() {
        // Create main folder
        this.createMainFolder();

        // Paste selected languages in main folder
        this.copyInitialFiles();

        // Paste selected grid system
        this.addGridSystem();

        // Paste Multilang
        this.addMultilang();
    }
}

let GProject = new GenerateStartProject();

GProject.generate();
