#!/usr/bin/env node
const data = require('./data.json');

const fs = require("fs");
const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");

class Main {
    constructor(data) {
        this.data = data;
    }
    
    init() {
        console.log(
            chalk.green(
                figlet.textSync("Combine CLI", {
                    font: "Letters",
                    horizontalLayout: "default",
                    verticalLayout: "default"
                })
            )
        );
    };

    askQuestions() {
        return inquirer.prompt(this.data.questions);
    };
    
    createConfigFile(options) {
        let config = {
            langs: {
                templates: options.TemplateType,
                styles: options.StylesType,
                scripts: options.ScriptsType,
            }
        };
        
        fs.mkdirSync("options", (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log("Folder has been created");
        });
        
        fs.writeFile("./options/config.json", JSON.stringify(config, null, 4), (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log("File has been created");
        });
    };
    
    generateGrid(grid) {
        if (grid == 'bootstrap-4-grid') {
            shell.exec('npm i bootstrap-4-grid -S');
        } else {
            shell.exec('npm run combine-grid');
        }
    }
    
    projectSetup(languages) {
        shell.exec(`npm run combine-generate ${languages.TemplateType} ${languages.StylesType} ${languages.ScriptsType}`);
    }
    
    success() {
        console.log(
            chalk.red.bgBlack.bold(`Done!`)
        );
    };

}

const run = async () => {

    const main = new Main(data); 

    // show script introduction
    main.init();

    // ask questions
    const answers = await main.askQuestions();

    // create the config file
    main.createConfigFile(answers);

    // // generate grid
    // main.generateGrid();

    // // Project setup
    // main.projectSetup(answers);

    // show success message
    main.success();
};

run();
