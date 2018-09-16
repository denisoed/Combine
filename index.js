#!/usr/bin/env node
const fs = require("fs");
const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");

const init = () => {
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

const askQuestions = () => {
    const questions = [
        {
            type: "list",
            name: "TemplateType",
            message: "What is the markup extension?",
            choices: [".html", ".pug",],
            filter: function (val) {
                return val.split(".")[1];
            }
        },
        {
            type: "list",
            name: "StylesType",
            message: "What is the styles extension?",
            choices: [".sass", ".less"],
            filter: function (val) {
                return val.split(".")[1];
            }
        },
        {
            type: "list",
            name: "ScriptsType",
            message: "What is the scripts extension?",
            choices: [".js"],
            filter: function (val) {
                return val.split(".")[1];
            }
        },
    ];
    return inquirer.prompt(questions);
};

const createConfigFile = (options) => {
    let config = {
        paths: {
            dev: 'app/dev',
            staging: 'app/staging',
            prodaction: 'app/prod'
        },
        langs: {
            templates: options.TemplateType,
            styles: options.StylesType,
            scripts: options.ScriptsType,
        }
    };
    
    fs.writeFile("./options/config.json", JSON.stringify(config, null, 4), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log("File has been created");
    });
};

const projectSetup = (languages) => {
    shell.exec(`npm run combine-generate ${languages.TemplateType} ${languages.StylesType} ${languages.ScriptsType}`);
}

const success = () => {
    console.log(
        chalk.red.bgBlack.bold(`Done!`)
    );
};

const run = async () => {
    // show script introduction
    init();

    // ask questions
    const answers = await askQuestions();

    // create the config file
    createConfigFile(answers);

    // Project setup
    projectSetup(answers);

    // show success message
    success();
};

run();
